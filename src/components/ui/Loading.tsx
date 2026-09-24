import type { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export function Spinner({ size = 24 }: { size?: number }) {
  return <Loader2 className="animate-spin text-teal-600" style={{ width: size, height: size }} />;
}

export function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Spinner size={40} />
      <p className="text-slate-500 text-sm">{message}</p>
    </div>
  );
}

export function EmptyState({ icon, title, description, action }: { icon: ReactNode; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-500 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-700 text-lg">{title}</h3>
      <p className="text-slate-400 text-sm mt-1 max-w-md">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
