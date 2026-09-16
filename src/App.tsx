import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { QuestionCard } from './components/QuestionCard';
import { SpecModal } from './components/SpecModal';
import { PillarsNav } from './components/PillarsNav';
import { AIStudioGuideCard } from './components/AIStudioGuideCard';
import { QUESTIONS_DATA } from './data/questionsData';
import { SAMPLE_TEMPLATES } from './data/sampleTemplates';
import { AnswersState, AppTemplate } from './types';
import { generateAIStudioPrompt } from './utils/promptGenerator';
import { FileText, Sparkles, Check, AlertCircle, ArrowRight } from 'lucide-react';

const INITIAL_ANSWERS: AnswersState = {
  targetUsers: '',
  coreFeatures: '',
  dataEntities: '',
  uiStyle: '',
  permissions: '',
  userFlow: '',
  targetDevices: '',
  integrations: '',
  systemStates: '',
  completionCriteria: ''
};

export default function App() {
  const [appName, setAppName] = useState<string>(() => {
    return localStorage.getItem('speccraft_app_name') || '';
  });

  const [appDescription, setAppDescription] = useState<string>(() => {
    return localStorage.getItem('speccraft_app_desc') || '';
  });

  const [answers, setAnswers] = useState<AnswersState>(() => {
    const saved = localStorage.getItem('speccraft_answers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_ANSWERS;
      }
    }
    return INITIAL_ANSWERS;
  });

  const [activePillarFilter, setActivePillarFilter] = useState<string | null>(null);
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isAiSpecGenerating, setIsAiSpecGenerating] = useState(false);
  const [customAiSpecMarkdown, setCustomAiSpecMarkdown] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save drafts to LocalStorage
  useEffect(() => {
    localStorage.setItem('speccraft_app_name', appName);
  }, [appName]);

  useEffect(() => {
    localStorage.setItem('speccraft_app_desc', appDescription);
  }, [appDescription]);

  useEffect(() => {
    localStorage.setItem('speccraft_answers', JSON.stringify(answers));
  }, [answers]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const handleAnswerChange = (key: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value
    }));
    setCustomAiSpecMarkdown(null); // invalidate customized AI spec if answers changed
  };

  const handleSelectTemplate = (template: AppTemplate) => {
    setAppName(template.appName);
    setAppDescription(template.description);
    setAnswers(template.answers);
    setCustomAiSpecMarkdown(null);
    showToast(`Đã áp dụng thành công mẫu: "${template.name}"`);
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ câu trả lời để làm lại từ đầu không?')) {
      setAppName('');
      setAppDescription('');
      setAnswers(INITIAL_ANSWERS);
      setCustomAiSpecMarkdown(null);
      localStorage.removeItem('speccraft_answers');
      localStorage.removeItem('speccraft_app_name');
      localStorage.removeItem('speccraft_app_desc');
      showToast('Đã làm mới toàn bộ câu hỏi.');
    }
  };

  // AI Suggest All 10 questions using Gemini or intelligent fallback
  const handleTriggerAiSuggestAll = async () => {
    const desc = appDescription.trim() || appName.trim();
    if (!desc) {
      showToast('Vui lòng nhập mô tả ý tưởng app vào ô bên trên trước khi yêu cầu AI gợi ý.');
      return;
    }

    setIsAiLoading(true);
    try {
      const response = await fetch('/api/ai/suggest-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appDescription: desc })
      });

      if (!response.ok) {
        throw new Error('API server không phản hồi, sử dụng phân tích thông minh tại chỗ.');
      }

      const data = await response.json();
      if (data.suggestions) {
        setAnswers((prev) => ({
          ...prev,
          ...data.suggestions
        }));
        showToast('Gemini AI đã phân tích và điền gợi ý cho 10 câu hỏi!');
      }
    } catch (err) {
      console.warn('Fallback to smart local analysis:', err);
      // Deterministic intelligent fallback based on app description keywords
      const lower = desc.toLowerCase();
      const isShop = lower.includes('bán') || lower.includes('shop') || lower.includes('store') || lower.includes('hàng');
      const isBooking = lower.includes('đặt') || lower.includes('lịch') || lower.includes('hẹn') || lower.includes('book');
      const isFinance = lower.includes('tiền') || lower.includes('chi tiêu') || lower.includes('ngân sách') || lower.includes('finance');

      let fallbackAnswers: Partial<AnswersState> = {};
      if (isShop) {
        fallbackAnswers = SAMPLE_TEMPLATES[1].answers;
      } else if (isBooking) {
        fallbackAnswers = SAMPLE_TEMPLATES[2].answers;
      } else if (isFinance) {
        fallbackAnswers = SAMPLE_TEMPLATES[3].answers;
      } else {
        fallbackAnswers = {
          targetUsers: `Người dùng chính cần thao tác với ${desc}; Quản trị viên theo dõi và kiểm soát hệ thống.`,
          coreFeatures: `1. Quản lý danh sách và dữ liệu của ${desc}; 2. Bộ lọc tìm kiếm nhanh theo từ khóa; 3. Thêm mới và chỉnh sửa trực quan; 4. Báo cáo thống kê tổng quan.`,
          dataEntities: `Thực thể chính (id, name, status, createdAt, metadata). Lưu trữ cục bộ LocalStorage bền vững.`,
          uiStyle: 'Modern SaaS tinh tế, bảng màu Slate 50 kết hợp điểm nhấn Indigo #4F46E5 sắc nét, tương phản cao.',
          permissions: 'Single User độc lập hoặc hỗ trợ nút chuyển đổi vai trò Admin / User trên thanh tiêu đề.',
          userFlow: 'Vào trang chủ -> Xem bảng điều khiển -> Nhấn nút tạo mới -> Điền thông tin -> Xác nhận thành công.',
          targetDevices: 'Responsive toàn diện, tối ưu cả màn hình Desktop và điện thoại thông minh.',
          integrations: 'Tích hợp thông báo Toast phản hồi và tính năng xuất dữ liệu dạng CSV.',
          systemStates: 'Hiển thị Empty State thân thiện kèm nút hành động khi chưa có dữ liệu; sử dụng Skeleton Loading.',
          completionCriteria: '1. Thao tác CRUD trơn tru; 2. Dữ liệu lưu trong LocalStorage sau khi F5; 3. Giao diện responsive không lỗi.'
        };
      }

      setAnswers((prev) => ({
        ...prev,
        ...fallbackAnswers
      }));
      showToast('Đã hoàn thiện gợi ý phân tích yêu cầu cho 10 câu hỏi!');
    } finally {
      setIsAiLoading(false);
    }
  };

  // AI Suggest Single Question
  const handleAiSuggestSingle = async (questionId: string) => {
    const questionObj = QUESTIONS_DATA.find((q) => q.id === questionId);
    if (!questionObj) return;

    const desc = appDescription.trim() || appName.trim() || 'Ứng dụng quản lý';
    const quickPick = questionObj.quickOptions[0];

    const contextText = `${quickPick}; phù hợp với mục tiêu: ${desc}.`;
    handleAnswerChange(questionId, contextText);
    showToast(`Đã thêm gợi ý cho câu hỏi: "${questionObj.title}"`);
  };

  // Trigger AI Generate Spec Prompt
  const handleTriggerAiGenerateSpec = async () => {
    setIsAiSpecGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-spec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appName,
          appDescription,
          answers
        })
      });

      if (!response.ok) {
        throw new Error('Không thể kết nối Gemini API.');
      }

      const data = await response.json();
      if (data.specMarkdown) {
        setCustomAiSpecMarkdown(data.specMarkdown);
        showToast('Gemini đã tối ưu hóa bản đặc tả kỹ thuật thành công!');
      }
    } catch (err: any) {
      console.warn('Could not generate via AI API, falling back to deterministic template:', err);
      showToast('Đang sử dụng bộ sinh đặc tả chuẩn xác cao của SpecCraft.');
    } finally {
      setIsAiSpecGenerating(false);
    }
  };

  // Count answered questions
  const answeredCount = useMemo(() => {
    return QUESTIONS_DATA.filter((q) => {
      const val = answers[q.id]?.trim();
      return val && val.length > 5;
    }).length;
  }, [answers]);

  // Filter questions if pillar selected
  const visibleQuestions = useMemo(() => {
    if (!activePillarFilter) return QUESTIONS_DATA;
    return QUESTIONS_DATA.filter((q) => q.number.toString() === activePillarFilter);
  }, [activePillarFilter]);

  // Generated prompt for AI Studio
  const finalSpecPrompt = useMemo(() => {
    if (customAiSpecMarkdown) return customAiSpecMarkdown;
    return generateAIStudioPrompt(appName, appDescription, answers);
  }, [appName, appDescription, answers, customAiSpecMarkdown]);

  return (
    <div id="speccraft-app" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="toast-notification"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl text-xs font-medium border border-slate-700 animate-slide-up"
        >
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        appName={appName}
        onAppNameChange={setAppName}
        appDescription={appDescription}
        onAppDescriptionChange={setAppDescription}
        answeredCount={answeredCount}
        totalQuestions={QUESTIONS_DATA.length}
        onSelectTemplate={handleSelectTemplate}
        onReset={handleReset}
        onOpenSpec={() => setIsSpecModalOpen(true)}
        isAiLoading={isAiLoading}
        onTriggerAiSuggestAll={handleTriggerAiSuggestAll}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Guide Card explaining the 10 questions */}
        <AIStudioGuideCard />

        {/* Pillar filter navigation */}
        <PillarsNav
          answers={answers}
          activePillarFilter={activePillarFilter}
          onSelectPillarFilter={setActivePillarFilter}
        />

        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              10 Câu Hỏi Phân Tích Yêu Cầu Cốt Lõi
            </h2>
            <p className="text-xs text-slate-500">
              Điền hoặc chọn gợi ý nhanh dưới mỗi câu để hoàn thiện bản đặc tả chuẩn xác nhất cho Google AI Studio Build.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
              Hiển thị: {visibleQuestions.length}/{QUESTIONS_DATA.length} câu hỏi
            </span>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
          {visibleQuestions.map((item) => (
            <QuestionCard
              key={item.id}
              item={item}
              value={answers[item.id] || ''}
              onChange={(val) => handleAnswerChange(item.id, val)}
              onAiSuggestSingle={handleAiSuggestSingle}
              isAiLoading={isAiLoading}
            />
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Sẵn sàng tạo app trên Google AI Studio Build?
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Bản đặc tả của bạn đã hoàn thành <strong className="text-slate-800">{answeredCount}/10 câu hỏi</strong>.
                Bấm nút bên cạnh để xem trước, kiểm tra độ đầy đủ hoặc sao chép ngay prompt hoàn chỉnh.
              </p>
            </div>
          </div>

          <button
            id="btn-bottom-open-spec"
            type="button"
            onClick={() => setIsSpecModalOpen(true)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-sm"
          >
            <span>Xuất Prompt Đặc Tả AI Studio</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p>SpecCraft &bull; Chuyên gia phân tích yêu cầu sản phẩm &amp; kiến trúc sư prompt cho Google AI Studio Build</p>
      </footer>

      {/* Spec Output Modal */}
      <SpecModal
        isOpen={isSpecModalOpen}
        onClose={() => setIsSpecModalOpen(false)}
        appName={appName}
        appDescription={appDescription}
        answers={answers}
        specPrompt={finalSpecPrompt}
        onGenerateWithAi={handleTriggerAiGenerateSpec}
        isAiGenerating={isAiSpecGenerating}
      />
    </div>
  );
}
