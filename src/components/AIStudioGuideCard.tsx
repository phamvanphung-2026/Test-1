import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Terminal, Zap, Shield, ArrowRight } from 'lucide-react';

export const AIStudioGuideCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-5 mb-8 shadow-sm border border-slate-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">
                Tại sao 10 câu hỏi này quyết định chất lượng app trong AI Studio Build?
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                Chuyên gia PRD
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Google AI Studio Build hoạt động hiệu quả nhất khi nhận được một prompt đặc tả rõ ràng về: <strong>Người dùng, Chức năng MVP, Mô hình dữ liệu, Giao diện thẩm mỹ, Phân quyền, Luồng thao tác, Thiết bị ưu tiên</strong> và <strong>Tiêu chí hoàn thành</strong>.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors shrink-0"
        >
          {isOpen ? 'Thu gọn' : 'Xem chi tiết 8 trụ cột'}
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
            <span className="font-bold text-amber-400 block mb-1">1. Người dùng & Phân quyền</span>
            <p className="text-slate-300 text-[11px]">
              Tránh tình trạng AI tạo app chung chung. Xác định rõ ai là Admin, ai là Member hoặc Guest.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
            <span className="font-bold text-amber-400 block mb-1">2. MVP & Dữ liệu</span>
            <p className="text-slate-300 text-[11px]">
              Xác định đúng 3-5 tính năng sống còn, cấu trúc thực thể TypeScript và cơ chế lưu trữ (LocalStorage).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
            <span className="font-bold text-amber-400 block mb-1">3. Thẩm mỹ & Trạng thái</span>
            <p className="text-slate-300 text-[11px]">
              Loại bỏ thiết kế AI cliché (tím-xanh). Yêu cầu bảng màu cụ thể, Empty States và Skeleton loading.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
            <span className="font-bold text-amber-400 block mb-1">4. Quy trình & Nghiệm thu</span>
            <p className="text-slate-300 text-[11px]">
              Từng bước thao tác rõ ràng (Happy Path) và bộ tiêu chí kiểm thử đảm bảo app chạy không lỗi.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
