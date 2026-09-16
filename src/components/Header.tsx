import React from 'react';
import { Sparkles, FileText, CheckCircle2, RotateCcw, LayoutTemplate } from 'lucide-react';
import { SAMPLE_TEMPLATES } from '../data/sampleTemplates';
import { AppTemplate } from '../types';

interface HeaderProps {
  appName: string;
  onAppNameChange: (name: string) => void;
  appDescription: string;
  onAppDescriptionChange: (desc: string) => void;
  answeredCount: number;
  totalQuestions: number;
  onSelectTemplate: (template: AppTemplate) => void;
  onReset: () => void;
  onOpenSpec: () => void;
  isAiLoading: boolean;
  onTriggerAiSuggestAll: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  appName,
  onAppNameChange,
  appDescription,
  onAppDescriptionChange,
  answeredCount,
  totalQuestions,
  onSelectTemplate,
  onReset,
  onOpenSpec,
  isAiLoading,
  onTriggerAiSuggestAll,
}) => {
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <header id="header-container" className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">SpecCraft</h1>
                <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                  AI Studio Build PRD
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Chuyên gia phân tích 10 câu hỏi quan trọng &amp; tạo bản đặc tả kỹ thuật chuẩn xác
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              id="btn-trigger-ai-all"
              onClick={onTriggerAiSuggestAll}
              disabled={isAiLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-indigo-200 text-indigo-700 bg-indigo-50/60 hover:bg-indigo-100 transition-colors disabled:opacity-50"
              title="Dùng Gemini AI gợi ý tự động câu trả lời cho cả 10 câu hỏi dựa trên mô tả"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isAiLoading ? 'animate-spin' : 'text-indigo-600'}`} />
              {isAiLoading ? 'Đang phân tích...' : 'AI Gợi Ý 10 Câu'}
            </button>

            <button
              id="btn-reset-form"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-colors"
              title="Làm mới toàn bộ câu trả lời"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Làm mới
            </button>

            <button
              id="btn-open-spec-modal"
              onClick={onOpenSpec}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              Xuất Prompt AI Studio ({answeredCount}/{totalQuestions})
            </button>
          </div>
        </div>

        {/* App concept input area */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-4">
            <label htmlFor="app-name-input" className="block text-xs font-medium text-slate-700 mb-1">
              Tên ứng dụng dự kiến
            </label>
            <input
              id="app-name-input"
              type="text"
              value={appName}
              onChange={(e) => onAppNameChange(e.target.value)}
              placeholder="VD: TaskFlow, ShopEase, ClinicBook..."
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
            />
          </div>

          <div className="md:col-span-8">
            <label htmlFor="app-desc-input" className="block text-xs font-medium text-slate-700 mb-1">
              Mô tả ngắn gọn ý tưởng web app của bạn <span className="text-slate-400 font-normal">([MÔ TẢ APP])</span>
            </label>
            <div className="flex gap-2">
              <input
                id="app-desc-input"
                type="text"
                value={appDescription}
                onChange={(e) => onAppDescriptionChange(e.target.value)}
                placeholder="VD: Tôi muốn làm một web app quản lý chi tiêu cá nhân và ngân sách tháng..."
                className="flex-1 text-sm px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Quick sample templates selector */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-600">
          <span className="shrink-0 flex items-center gap-1 font-medium text-slate-500">
            <LayoutTemplate className="w-3.5 h-3.5" />
            Mẫu nhanh:
          </span>
          {SAMPLE_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              id={`btn-sample-tmpl-${tmpl.id}`}
              onClick={() => onSelectTemplate(tmpl)}
              className="shrink-0 px-2.5 py-1 rounded-md border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-colors text-slate-700 text-xs font-medium"
            >
              {tmpl.name}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-3.5 h-3.5 ${progressPercent === 100 ? 'text-emerald-500' : 'text-slate-400'}`} />
            <span>Tiến độ phân tích yêu cầu: <strong className="text-slate-800">{answeredCount}/{totalQuestions} câu</strong> ({progressPercent}%)</span>
          </div>
          <div className="w-36 sm:w-48 bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-slate-900 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
