"use client";

import { MessageCircle } from "lucide-react";

/** Opens WhatsApp with the title and the current page address. */
export function ShareButton({ text, label }: { text: string; label: string }) {
  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm"
      onClick={() => {
        const url = window.location.href;
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank", "noopener,noreferrer");
      }}
    >
      <MessageCircle aria-hidden="true" className="h-4 w-4" />
      {label}
    </button>
  );
}
