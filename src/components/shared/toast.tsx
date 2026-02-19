"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  show: boolean;
  onClose: () => void;
}

export function Toast({ message, type, show, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed bottom-6 right-6 z-[200] max-w-sm"
        >
          <div className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl ring-1 ring-black/5 ${
            type === "success" ? "bg-white" : "bg-white"
          }`}>
            {type === "success" ? (
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500 shrink-0" />
            )}
            <p className="text-sm font-medium text-text-dark">{message}</p>
            <button
              onClick={onClose}
              className="ml-2 p-1 rounded-full hover:bg-surface-offwhite transition-colors shrink-0"
            >
              <X className="h-4 w-4 text-text-secondary" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
