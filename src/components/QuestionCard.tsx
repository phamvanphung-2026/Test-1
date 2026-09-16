import React from 'react';
import {
  Users,
  Sparkles,
  Database,
  Palette,
  ShieldCheck,
  GitMerge,
  Laptop,
  Cpu,
  Layers,
  CheckCircle2,
  Plus,
  Wand2,
  Check
} from 'lucide-react';
import { QuestionItem } from '../types';

interface QuestionCardProps {
  item: QuestionItem;
  value: string;
  onChange: (value: string) => void;
  onAiSuggestSingle?: (questionId: string) => void;
  isAiLoading?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Users: <Users className="w-4 h-4 text-sky-600" />,
  Sparkles: <Sparkles className="w-4 h-4 text-amber-600" />,
  Database: <Database className="w-4 h-4 text-emerald-600" />,
  Palette: <Palette className="w-4 h-4 text-purple-600" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-rose-600" />,
  GitMerge: <GitMerge className="w-4 h-4 text-indigo-600" />,
  Laptop: <Laptop className="w-4 h-4 text-blue-600" />,
  Cpu: <Cpu className="w-4 h-4 text-teal-600" />,
  Layers: <Layers className="w-4 h-4 text-orange-600" />,
  CheckCircle2: <CheckCircle2 className="w-4 h-4 text-emerald-600" />
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  item,
  value,
  onChange,
  onAiSuggestSingle,
  isAiLoading
}) => {
  const isAnswered = Boolean(value && value.trim().length > 5);

  const handleAddQuickOption = (option: string) => {
    if (!value || value.trim() === '') {
      onChange(option);
    } else if (!value.includes(option)) {
      onChange(`${value.trim()}; ${option}`);
    }
  };

  return (
    <div
      id={`question-card-${item.id}`}
      className={`rounded-xl border transition-all duration-200 bg-white p-5 ${
        isAnswered
          ? 'border-slate-300 shadow-xs'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center border border-slate-200">
            {item.number < 10 ? `0${item.number}` : item.number}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200">
            {ICON_MAP[item.iconName] || <Sparkles className="w-3.5 h-3.5" />}
            {item.pillar}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isAnswered ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <Check className="w-3 h-3 text-emerald-600" />
              Đã trả lời
            </span>
          ) : (
            <span className="text-xs text-slate-400 font-medium">Chưa điền</span>
          )}

          {onAiSuggestSingle && (
            <button
              type="button"
              onClick={() => onAiSuggestSingle(item.id)}
              disabled={isAiLoading}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded border border-indigo-100 transition-colors disabled:opacity-50"
              title="Gợi ý câu trả lời từ AI"
            >
              <Wand2 className="w-3 h-3" />
              Gợi ý
            </button>
          )}
        </div>
      </div>

      {/* Question Details */}
      <h3 className="text-base font-semibold text-slate-900 leading-snug mb-1">
        {item.title}
      </h3>
      <p className="text-sm font-medium text-slate-800 mb-1.5">
        {item.question}
      </p>
      <p className="text-xs text-slate-500 mb-3 leading-relaxed">
        {item.subtitle}
      </p>

      {/* Quick Select Chips */}
      <div className="mb-3">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
          Gợi ý nhanh (chạm để chọn thêm):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {item.quickOptions.map((opt, idx) => {
            const isSelected = value.includes(opt);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddQuickOption(opt)}
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-all text-left ${
                  isSelected
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {!isSelected && <Plus className="w-3 h-3 opacity-60 shrink-0" />}
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Text Area */}
      <div className="relative">
        <textarea
          id={`input-${item.id}`}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={item.placeholder}
          className="w-full text-sm p-3 rounded-lg border border-slate-200 bg-slate-50/40 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-y"
        />
        <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
          <span>Khuyên dùng mô tả cụ thể để AI dựng chính xác</span>
          <span>{value.length} ký tự</span>
        </div>
      </div>
    </div>
  );
};
