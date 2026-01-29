'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { Toast as ToastType } from '@/types';

interface ToastContainerProps {
    toasts: ToastType[];
    removeToast: (id: string) => void;
}

const ToastItem: React.FC<{ toast: ToastType; removeToast: (id: string) => void }> = ({ toast, removeToast }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(toast.id);
        }, 4000);
        return () => clearTimeout(timer);
    }, [toast.id, removeToast]);

    const icons = {
        success: <CheckCircle size={16} className="text-emerald-500" />,
        error: <AlertCircle size={16} className="text-red-500" />,
        info: <Info size={16} className="text-indigo-500" />
    };

    const backgrounds = {
        success: 'bg-emerald-50 dark:bg-zinc-900/90 border-emerald-200 dark:border-emerald-500/20 hover:border-emerald-300 dark:hover:border-emerald-500/40',
        error: 'bg-red-50 dark:bg-zinc-900/90 border-red-200 dark:border-red-500/20 hover:border-red-300 dark:hover:border-red-500/40',
        info: 'bg-indigo-50 dark:bg-zinc-900/90 border-indigo-200 dark:border-indigo-500/20 hover:border-indigo-300 dark:hover:border-indigo-500/40',
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`
                relative flex items-center gap-3 w-80 p-3 rounded-lg 
                border shadow-lg shadow-slate-200/50 dark:shadow-black/50 backdrop-blur-md
                ${backgrounds[toast.type]}
                transition-colors cursor-pointer group
            `}
            onClick={() => removeToast(toast.id)}
        >
            <div className="shrink-0">{icons[toast.type]}</div>
            <div className="flex-1 text-sm text-slate-700 dark:text-zinc-200 font-medium">{toast.message}</div>
            <button className="text-slate-400 dark:text-zinc-600 group-hover:text-slate-600 dark:group-hover:text-zinc-400 transition-colors">
                <X size={14} />
            </button>
        </motion.div>
    );
};

export const Toast: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
    return (
        <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-2 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <ToastItem toast={toast} removeToast={removeToast} />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Toast;
