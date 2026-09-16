import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// AI Suggest Answers for the 10 questions
app.post("/api/ai/suggest-answers", async (req, res) => {
  try {
    const { appDescription } = req.body;
    if (!appDescription || typeof appDescription !== "string") {
      res.status(400).json({ error: "Mô tả ứng dụng là bắt buộc." });
      return;
    }

    const ai = getAIClient();
    if (!ai) {
      res.status(503).json({
        error: "GEMINI_API_KEY chưa được cấu hình. Sử dụng bộ gợi ý dựng sẵn.",
      });
      return;
    }

    const prompt = `Bạn là chuyên gia phân tích yêu cầu sản phẩm (Senior Product Analyst & Technical Architect).
Người dùng muốn xây dựng ứng dụng web với mô tả sau:
"${appDescription}"

Hãy gợi ý câu trả lời rõ ràng, chi tiết, khả thi cho 10 câu hỏi cốt lõi để chuẩn bị tạo app trên Google AI Studio Build:
1. targetUsers: Đối tượng người dùng mục tiêu (vai trò chính & phụ).
2. coreFeatures: 3-5 tính năng sống còn không thể thiếu (MVP).
3. dataEntities: Mô hình dữ liệu & thực thể chính (các trường dữ liệu quan trọng) và giải pháp lưu trữ.
4. uiStyle: Phong cách giao diện (màu sắc, aesthetic, phong cách hiển thị).
5. permissions: Phân quyền & vai trò (Admin, User, Guest, vv.).
6. userFlow: Quy trình sử dụng chính (Happy path từng bước từ lúc vào đến khi hoàn thành mục tiêu).
7. targetDevices: Thiết bị ưu tiên (Mobile-first, Desktop dashboard, hay Responsive).
8. integrations: Tương tác phụ hoặc tích hợp cần thiết (AI, export, notification, vv.).
9. systemStates: Xử lý trạng thái rỗng (empty state), loading, và thông báo lỗi.
10. completionCriteria: Tiêu chí hoàn thành (Acceptance Criteria / Definition of Done).

Trả về định dạng JSON thuần (không kèm markdown block hoặc chỉ JSON object):
{
  "targetUsers": "...",
  "coreFeatures": "...",
  "dataEntities": "...",
  "uiStyle": "...",
  "permissions": "...",
  "userFlow": "...",
  "targetDevices": "...",
  "integrations": "...",
  "systemStates": "...",
  "completionCriteria": "..."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const text = response.text || "{}";
    let parsedData = {};
    try {
      parsedData = JSON.parse(text);
    } catch {
      // Clean possible wrapper if any
      const cleaned = text.replace(/```json\n?|```/g, "").trim();
      parsedData = JSON.parse(cleaned);
    }

    res.json({ success: true, suggestions: parsedData });
  } catch (error: any) {
    console.error("Error suggesting answers:", error);
    res.status(500).json({ error: error.message || "Không thể tạo gợi ý từ AI." });
  }
});

// AI Generate Final Specification Prompt for AI Studio Build
app.post("/api/ai/generate-spec", async (req, res) => {
  try {
    const { appName, appDescription, answers } = req.body;
    const ai = getAIClient();

    if (!ai) {
      res.status(503).json({
        error: "GEMINI_API_KEY chưa được cấu hình.",
      });
      return;
    }

    const prompt = `Bạn là một Lead Architect chuyên thiết kế prompt đặc tả phần mềm cho Google AI Studio Build.
Dưới đây là thông tin ứng dụng mà người dùng muốn xây dựng:
- Tên app / Khái niệm: ${appName || "Chưa đặt tên"}
- Mô tả tổng quan: ${appDescription || "N/A"}

Câu trả lời cho 10 câu hỏi phân tích yêu cầu:
1. Người dùng mục tiêu: ${answers?.targetUsers || "Người dùng đại chúng"}
2. Tính năng cốt lõi (MVP): ${answers?.coreFeatures || "Quản lý cơ bản"}
3. Dữ liệu & Lưu trữ: ${answers?.dataEntities || "Client-side state / LocalStorage"}
4. Giao diện & Phong cách: ${answers?.uiStyle || "Clean, Modern, Slate/Indigo palette"}
5. Phân quyền & Vai trò: ${answers?.permissions || "Người dùng đơn lẻ"}
6. Quy trình sử dụng (User Flow): ${answers?.userFlow || "Vào app -> xem danh sách -> tạo mới -> tương tác"}
7. Thiết bị ưu tiên: ${answers?.targetDevices || "Responsive Web"}
8. Tích hợp phụ trợ: ${answers?.integrations || "Không yêu cầu phức tạp"}
9. Trạng thái hệ thống: ${answers?.systemStates || "Empty state thân thiện, loading skeletons"}
10. Tiêu chí hoàn thành (Acceptance Criteria): ${answers?.completionCriteria || "Đầy đủ CRUD, mượt mà, không lỗi"}

Hãy tổng hợp thành MỘT BẢN ĐẶC TẢ SẢN PHẨM HOÀN CHỈNH (PRD) BẰNG TIẾNG VIỆT, được tối ưu hóa đặc biệt để người dùng có thể DÁN TRỰC TIẾP VÀO GOOGLE AI STUDIO BUILD ĐỂ TẠO APP.

Bản đặc tả phải tuân thủ cấu trúc chuẩn sau:
# [TÊN ỨNG DỤNG]: Bản Đặc Tả Kỹ Thuật & Yêu Cầu Phát Triển Cho AI Studio Build

## 1. TỔNG QUAN & MỤC TIÊU SẢN PHẨM
- Mục tiêu chính, bài toán giải quyết, phạm vi MVP.

## 2. NGƯỜI DÙNG & PHÂN QUYỀN (ROLES & PERMISSIONS)
- Các nhóm người dùng và ma trận quyền hạn rõ ràng.

## 3. CHỨC NĂNG CỐT LÕI (CORE FUNCTIONALITIES)
- Liệt kê chi tiết từng tính năng với mô tả tương tác và logic xử lý.

## 4. MÔ HÌNH DỮ LIỆU & QUẢN LÝ TRẠNG THÁI (DATA SCHEMA & STATE)
- Các thực thể dữ liệu (Entities, Attributes, Types).
- Cơ chế lưu trữ (State management, Persistent storage).

## 5. THIẾT KẾ GIAO DIỆN & TRẢI NGHIỆM (UI/UX DESIGN SYSTEM)
- Tone màu chủ đạo (Tailwind classes), typography, layout, empty states, loading indicators.
- Bố cục responsive cho thiết bị ưu tiên.

## 6. QUY TRÌNH NGƯỜI DÙNG CHÍNH (CRITICAL USER JOURNEY)
- Từng bước thao tác thực tế của người dùng từ đầu đến cuối.

## 7. TIÊU CHÍ HOÀN THÀNH & KIỂM THỬ (DEFINITION OF DONE)
- Bộ checklist nghiệm thu chi tiết, rõ ràng để AI Studio coder hoàn thiện chính xác 100%.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        temperature: 0.5,
      },
    });

    res.json({ success: true, specMarkdown: response.text });
  } catch (error: any) {
    console.error("Error generating spec:", error);
    res.status(500).json({ error: error.message || "Không thể tổng hợp bản đặc tả từ AI." });
  }
});

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
