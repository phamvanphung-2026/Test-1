import React, { useState } from 'react';
import Markdown from 'react-markdown';
import {
  X,
  Copy,
  Check,
  Download,
  FileCode2,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { AnswersState } from '../types';
import { QUESTIONS_DATA } from '../data/questionsData';

interface SpecModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
  appDescription: string;
  answers: AnswersState;
  specPrompt: string;
  onGenerateWithAi?: () => void;
  isAiGenerating?: boolean;
}

export const SpecModal: React.FC<SpecModalProps> = ({
  isOpen,
  onClose,
  appName,
  appDescription,
  answers,
  specPrompt,
  onGenerateWithAi,
  isAiGenerating
}) => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'preview' | 'audit'>('prompt');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(specPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = specPrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadMd = () => {
    const element = document.createElement('a');
    const file = new Blob([specPrompt], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    const fileName = `${(appName || 'web-app-spec').toLowerCase().replace(/\s+/g, '-')}-spec.md`;
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Pillars check
  const pillarStatusList = QUESTIONS_DATA.map((q) => {
    const answer = answers[q.id]?.trim() || '';
    const isCompleted = answer.length > 10;
    return {
      pillar: q.pillar,
      title: q.title,
      isCompleted,
      length: answer.length,
      samplePreview: answer ? (answer.length > 50 ? answer.slice(0, 50) + '...' : answer) : 'Chưa có thông tin'
    };
  });

  const completedCount = pillarStatusList.filter((p) => p.isCompleted).length;
  const scorePercent = Math.round((completedCount / pillarStatusList.length) * 100);

  const wordCount = specPrompt.trim().split(/\s+/).length;
  const charCount = specPrompt.length;

  return (
    <div
      id="spec-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-xs transition-opacity"
    >
      <div
        id="spec-modal-content"
        className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <FileCode2 className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-none">
                Bản Đặc Tả Ứng Dụng (AI Studio Build Prompt)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Ứng dụng: <strong className="text-slate-800">{appName || 'Chưa đặt tên'}</strong> &bull; Độ hoàn thiện:{' '}
                <span className={scorePercent >= 80 ? 'text-emerald-600 font-semibold' : 'text-amber-600 font-semibold'}>
                  {scorePercent}% ({completedCount}/10 mục)
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onGenerateWithAi && (
              <button
                type="button"
                onClick={onGenerateWithAi}
                disabled={isAiGenerating}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors disabled:opacity-50"
                title="Dùng Gemini tinh chỉnh nâng cao bản đặc tả"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isAiGenerating ? 'Đang viết lại...' : 'AI Tinh Chỉnh Nâng Cao'}
              </button>
            )}

            <button
              id="btn-close-modal"
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex space-x-1">
            <button
              id="tab-btn-prompt"
              type="button"
              onClick={() => setActiveTab('prompt')}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'prompt'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <FileCode2 className="w-4 h-4" />
              Prompt AI Studio (Sẵn sàng dán)
            </button>
            <button
              id="tab-btn-preview"
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'preview'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Xem Trước PRD Trực Quan
            </button>
            <button
              id="tab-btn-audit"
              type="button"
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'audit'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Kiểm Tra 8 Trụ Cột ({completedCount}/10)
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500">
            <span>{wordCount} từ</span>
            <span>&bull;</span>
            <span>{charCount} ký tự</span>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {activeTab === 'prompt' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-800">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Hướng dẫn sử dụng:</strong> Hãy bấm <strong>"Sao chép Prompt"</strong> bên dưới, sau đó mở{' '}
                  <span className="font-semibold underline">Google AI Studio Build</span> và dán trực tiếp vào ô chat để AI lập tức sinh toàn bộ ứng dụng web hoàn chỉnh theo chuẩn kiến trúc này!
                </div>
              </div>

              <div className="relative">
                <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-800 max-h-[55vh]">
                  {specPrompt}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs max-h-[60vh] overflow-y-auto">
              <div className="markdown-body prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed space-y-4">
                <Markdown>{specPrompt}</Markdown>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Độ sẵn sàng của bản đặc tả cho AI Studio
                    </h3>
                    <p className="text-xs text-slate-500">
                      Bản đặc tả càng chi tiết ở 8 trụ cột thì ứng dụng sinh ra càng chính xác và ít lỗi.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-slate-900">{scorePercent}%</span>
                    <span className="text-xs block text-slate-500">Điểm sẵn sàng</span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full transition-all duration-300 ${
                      scorePercent >= 80 ? 'bg-emerald-500' : scorePercent >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${scorePercent}%` }}
                  />
                </div>
              </div>

              {/* Checklist grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pillarStatusList.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
                      item.isCompleted ? 'bg-white border-slate-200' : 'bg-rose-50/30 border-rose-200'
                    }`}
                  >
                    {item.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800">{item.pillar}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                            item.isCompleted ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {item.isCompleted ? 'Đầy đủ' : 'Cần bổ sung'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">{item.samplePreview}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            {copied && (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium animate-fade-in">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Đã sao chép vào bộ nhớ tạm! Bạn có thể dán ngay vào AI Studio Build.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              id="btn-download-md"
              type="button"
              onClick={handleDownloadMd}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Tải file .MD
            </button>

            <button
              id="btn-copy-prompt"
              type="button"
              onClick={handleCopy}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition-all shadow-sm ${
                copied
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 text-amber-400" />}
              {copied ? 'Đã Sao Chép!' : 'Sao Chép Prompt Cho AI Studio'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
