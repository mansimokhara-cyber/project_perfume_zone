import React from 'react';
import { useToast } from '../../context/ToastContext.jsx';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-surface-container-lowest border-l-4 border-secondary shadow-2xl p-4 flex items-center justify-between gap-4 border border-outline-variant/30 animate-fade-in"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-xl">
              {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'auto_awesome'}
            </span>
            <p className="font-body-md text-sm text-primary font-medium">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Close notification"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
