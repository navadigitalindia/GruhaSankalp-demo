'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isDanger = toast.type === 'danger';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-2 ${
              isSuccess
                ? 'bg-emerald-900/90 text-white border-emerald-700'
                : isWarning
                ? 'bg-amber-900/90 text-white border-amber-700'
                : isDanger
                ? 'bg-rose-900/90 text-white border-rose-700'
                : 'bg-[#0B2948]/95 text-white border-slate-700'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-amber-400" />}
              {isDanger && <XCircle className="w-5 h-5 text-rose-400" />}
              {!isSuccess && !isWarning && !isDanger && <Info className="w-5 h-5 text-sky-400" />}
            </div>

            <div className="flex-1 text-sm">
              <h4 className="font-semibold text-white leading-tight">{toast.title}</h4>
              <p className="text-slate-200 text-xs mt-0.5 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
