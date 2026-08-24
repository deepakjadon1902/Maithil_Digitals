import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-3xl rounded-premium border border-white/10 bg-deep p-5">
        <button className="absolute right-3 top-3 rounded-premium p-2 text-white hover:text-orange" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}
