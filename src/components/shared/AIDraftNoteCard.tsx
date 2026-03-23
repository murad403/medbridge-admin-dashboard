"use client";

import React, { useState } from "react";
import { Copy, RotateCcw, Send } from "lucide-react";

type AIDraftNoteCardProps = {
  draftText: string;
  onSendToEhr: () => void;
};

const AIDraftNoteCard = ({ draftText, onSendToEhr }: AIDraftNoteCardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draftText);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1500);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <aside className="h-fit rounded-[14px] border border-border-color bg-main p-4 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-title">AI Draft Medical Note</h2>
        <div className="flex items-center gap-2 text-description">
          <button
            type="button"
            onClick={handleCopyDraft}
            aria-label="Copy AI draft"
            title="Copy AI draft"
            className="cursor-pointer rounded p-1 transition hover:bg-[#F2F4F7]"
          >
            <Copy className="size-4" />
          </button>
          {isCopied && <span className="text-[11px] font-medium text-[#16A34A]">Copied</span>}
          <RotateCcw className="size-4" />
        </div>
      </div>

      <p className="mt-1 text-xs text-description">AI-generated clinical documentation</p>

      <div className="mt-5 space-y-5">
        <section>
          <p className="text-[11px] font-semibold tracking-wide text-description">CHIEF COMPLAINT</p>
          <p className="mt-2 text-sm text-[#344054]">
            Patient reports sudden onset of severe chest pain radiating down the left arm, associated with dizziness.
          </p>
        </section>

        <section>
          <p className="text-[11px] font-semibold tracking-wide text-description">HISTORY OF PRESENT ILLNESS</p>
          <p className="mt-2 text-sm text-[#344054]">N/A</p>
        </section>

        <section>
          <p className="text-[11px] font-semibold tracking-wide text-description">ASSOCIATED SYMPTOMS</p>
          <div className="mt-2 rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] p-3 text-sm text-[#344054]">
            Patient reports sudden onset of severe chest pain radiating down the left arm, associated with dizziness.
          </div>
        </section>

        <section>
          <p className="text-[11px] font-semibold tracking-wide text-description">RISK ANALYSIS</p>
          <div className="mt-2 rounded-lg border border-[#FECACA] bg-[#FEF2F2] p-3 text-sm text-[#991B1B]">
            Patient reports sudden onset of severe chest pain radiating down the left arm, associated with dizziness.
          </div>
        </section>

        <section>
          <p className="text-[11px] font-semibold tracking-wide text-description">SUGGESTED ICD</p>
          <p className="mt-2 text-sm text-[#344054]">Patient reports sudden onset of severe, acute, T00. T00...</p>
        </section>
      </div>

      <div className="mt-6 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button className="rounded-[10px] border border-border-color px-3 py-2 text-sm font-medium text-title transition hover:bg-[#F9FAFB]">
            Edit Note
          </button>
          <button className="rounded-[10px] bg-[#22C55E] px-3 py-2 text-sm font-medium text-white transition hover:opacity-90">
            Approve & Sign
          </button>
        </div>

        <button
          type="button"
          onClick={onSendToEhr}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-button-color px-3 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          <Send className="size-4" />
          Send to EHR
        </button>

        <button className="inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] border border-border-color px-3 py-2 text-sm font-medium text-title transition hover:bg-[#F9FAFB]">
          <RotateCcw className="size-4" />
          Regenerate AI Draft
        </button>
      </div>
    </aside>
  );
};

export default AIDraftNoteCard;
