import { Flame, Circle, AlertCircle } from 'lucide-react';

interface BadgeProps {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  label?: string;
}

export function PriorityBadge({ priority, label }: BadgeProps) {
  if (priority === 'HIGH') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">
        <Flame className="w-3.5 h-3.5" />
        {label || 'HIGH'}
      </span>
    );
  }
  if (priority === 'MEDIUM') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
        <AlertCircle className="w-3.5 h-3.5" />
        {label || 'MEDIUM'}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200">
      <Circle className="w-3.5 h-3.5" />
      {label || 'LOW'}
    </span>
  );
}

export function Tag({ children, color = 'teal' }: { children: React.ReactNode; color?: 'teal' | 'blue' | 'slate' | 'amber' }) {
  const colors = {
    teal: 'bg-teal-50 text-teal-600 border-teal-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    slate: 'bg-slate-100 text-slate-600 border-slate-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
}
