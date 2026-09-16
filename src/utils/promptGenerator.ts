import { AnswersState } from '../types';

export function generateAIStudioPrompt(
  appName: string,
  appDescription: string,
  answers: AnswersState
): string {
  const cleanName = appName.trim() || 'Ứng Dụng Web';
  const cleanDesc = appDescription.trim() || 'Một ứng dụng web hiện đại, trực quan và tối ưu.';

  return `# YÊU CẦU XÂY DỰNG ỨNG DỤNG CHO GOOGLE AI STUDIO BUILD: ${cleanName.toUpperCase()}

Hãy xây dựng một ứng dụng web hoàn chỉnh, có thể hoạt động trực tiếp trong trình duyệt, đáp ứng đầy đủ bản đặc tả yêu cầu chi tiết dưới đây:

---

## 1. TỔNG QUAN VÀ MỤC TIÊU SẢN PHẨM
- **Tên ứng dụng**: ${cleanName}
- **Mô tả cốt lõi**: ${cleanDesc}
- **Mục tiêu sản phẩm**: Cung cấp một giải pháp phần mềm web hoàn chỉnh, mượt mà, không lỗi giao diện hay logic, người dùng có thể thao tác ngay lập tức mà không cần bất kỳ bước thiết lập phức tạp nào.

---

## 2. ĐỐI TƯỢNG NGƯỜI DÙNG & PHÂN QUYỀN (ROLES & PERMISSIONS)
- **Người dùng mục tiêu**:
${answers.targetUsers ? `  ${answers.targetUsers}` : '  Người dùng đại chúng và quản trị viên hệ thống.'}
- **Mô hình phân quyền**:
${answers.permissions ? `  ${answers.permissions}` : '  Hỗ trợ vai trò người dùng rõ ràng hoặc nút chuyển đổi vai trò (Role Switcher) trên thanh tiêu đề để kiểm thử dễ dàng các quyền hạn khác nhau.'}

---

## 3. TÍNH NĂNG CỐT LÕI (CORE MVP FEATURES)
${answers.coreFeatures ? answers.coreFeatures : 'Cung cấp đầy đủ các tính năng tạo mới, xem, cập nhật, xóa (CRUD), tìm kiếm nhanh và lọc thông tin theo trạng thái.'}

---

## 4. MÔ HÌNH DỮ LIỆU & LƯU TRỮ (DATA SCHEMA & PERSISTENCE)
- **Cấu trúc dữ liệu & Thực thể chính**:
${answers.dataEntities ? `  ${answers.dataEntities}` : '  Quản lý dữ liệu qua các thực thể TypeScript rõ ràng, có id duy nhất, timestamp và các thuộc tính nghiệp vụ tương ứng.'}
- **Cơ chế lưu trữ**:
  Lưu trữ dữ liệu bền bỉ (sử dụng LocalStorage hoặc client-side persistence) kết hợp với bộ dữ liệu mẫu (mock initial data) phong phú, thực tế ngay khi mở ứng dụng lần đầu. Dữ liệu không bị mất khi làm mới (F5) trang.

---

## 5. THIẾT KẾ GIAO DIỆN & TRẢI NGHIỆM (UI/UX SPECIFICATION)
- **Phong cách thị giác & Bảng màu**:
${answers.uiStyle ? `  ${answers.uiStyle}` : '  Phong cách Modern Clean, độ tương phản cao, nền sáng thanh lịch kết hợp điểm nhấn màu thương hiệu sắc nét.'}
- **Nguyên tắc thiết kế UI nghiêm ngặt**:
  - Tuyệt đối không dùng gradient tím-xanh rẻ tiền, không đổ bóng hào quang lòe loẹt.
  - Sử dụng Tailwind CSS chuẩn mực, padding đối xứng (padding ngang nút bấm = 2x padding dọc).
  - Sử dụng icon vector chuẩn từ thư viện \`lucide-react\`.
  - Hiệu ứng chuyển động mượt mà bằng thư viện \`motion/react\`.
- **Xử lý trạng thái (Empty & Loading states)**:
${answers.systemStates ? `  ${answers.systemStates}` : '  Cung cấp Empty State có minh họa và nút hành động (CTA) khi chưa có dữ liệu; sử dụng Skeleton Loading tinh tế.'}

---

## 6. QUY TRÌNH NGƯỜI DÙNG CHÍNH (CRITICAL USER JOURNEY)
${answers.userFlow ? answers.userFlow : 'Người dùng truy cập màn hình chính -> Xem tổng quan dữ liệu -> Bấm nút thêm mới hoặc tương tác với danh mục -> Xác nhận cập nhật với phản hồi Toast trực quan.'}

---

## 7. THIẾT BỊ ƯU TIÊN & TƯƠNG THÍCH (RESPONSIVENESS)
- **Thiết bị ưu tiên**:
${answers.targetDevices ? `  ${answers.targetDevices}` : '  Thiết kế Responsive mượt mà từ Mobile (màn hình hẹp 375px) tới Desktop (màn hình rộng 1440px+). Điểm chạm ngón tay tối thiểu 44px trên mobile.'}
- **Tiện ích tích hợp**:
${answers.integrations ? `  ${answers.integrations}` : '  Tích hợp thông báo Toast phản hồi thao tác, xuất dữ liệu và các thao tác tiện ích.'}

---

## 8. TIÊU CHÍ HOÀN THÀNH & NGHIỆM THU (ACCEPTANCE CRITERIA)
${answers.completionCriteria ? answers.completionCriteria : '- Tất cả các nút bấm và form đều có xử lý sự kiện đầy đủ, không để nút trống hoặc handler rỗng.\n- Không có lỗi JavaScript runtime hay cảnh báo console.\n- Dữ liệu thêm mới hiển thị tức thì trên giao diện và lưu trữ cục bộ thành công.'}

---
*Lưu ý cho AI Studio: Hãy triển khai ứng dụng dưới dạng cấu trúc component module hóa sạch sẽ, sử dụng TypeScript chặt chẽ, hiển thị trực quan và trau chuốt từng chi tiết tương tác.*`;
}
