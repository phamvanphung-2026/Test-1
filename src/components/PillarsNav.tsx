import React from 'react';
import {
  Users,
  Sparkles,
  Database,
  Palette,
  ShieldCheck,
  GitMerge,
  Laptop,
  CheckCircle2
} from 'lucide-react';
import { AnswersState } from '../types';

interface PillarsNavProps {
  answers: AnswersState;
  activePillarFilter: string | null;
  onSelectPillarFilter: (filter: string | null) => void;
}

const PILLARS_LIST = [
  { id: '1', name: 'Người dùng', key: 'targetUsers', icon: Users },
  { id: '2', name: 'Chức năng', key: 'coreFeatures', icon: Sparkles },
  { id: '3', name: 'Dữ liệu', key: 'dataEntities', icon: Database },
  { id: '4', name: 'Giao diện', key: 'uiStyle', icon: Palette },
  { id: '5', name: 'Phân quyền', key: 'permissions', icon: ShieldCheck },
  { id: '6', name: 'Quy trình', key: 'userFlow', icon: GitMerge },
  { id: '7', name: 'Thiết bị', key: 'targetDevices', icon: Laptop },
  { id: '10', name: 'Hoàn thành', key: 'completionCriteria', icon: CheckCircle2 },
];

export const PillarsNav: React.FC<PillarsNavProps> = ({
  answers,
  activePillarFilter,
  onSelectPillarFilter
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs mb-6 overflow-x-auto">
      <div className="flex items-center gap-1.5 min-w-max">
        <button
          type="button"
          onClick={() => onSelectPillarFilter(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activePillarFilter === null
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Tất cả (10 câu)
        </button>

        <div className="h-4 w-[1px] bg-slate-200 mx-1" />

        {PILLARS_LIST.map((pillar) => {
          const Icon = pillar.icon;
          const isDone = Boolean(answers[pillar.key]?.trim()?.length > 10);
          const isSelected = activePillarFilter === pillar.id;

          return (
            <button
              key={pillar.id}
              type="button"
              onClick={() => onSelectPillarFilter(isSelected ? null : pillar.id)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white font-semibold'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100/70'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isDone && !isSelected ? 'text-emerald-600' : ''}`} />
              <span>{pillar.name}</span>
              {isDone && !isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
