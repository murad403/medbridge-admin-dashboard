"use client";

import React from "react";
import { Sparkles } from "lucide-react";

type NarrativeCardProps = {
  title: string;
  submittedText: string;
  content: string;
};

const NarrativeCard = ({ title, submittedText, content }: NarrativeCardProps) => {
  return (
    <article className="rounded-[14px] border border-border-color bg-main p-4 shadow-xs">
      <h3 className="text-base font-semibold text-title">{title}</h3>
      <p className="mt-1 text-xs text-description">{submittedText}</p>
      <div className="mt-3 rounded-xl bg-[#F8F9FB] p-4 text-sm leading-6 text-[#344054]">{content}</div>
      <button className="mt-3 inline-flex items-center gap-1 rounded-md border border-border-color px-3 py-1.5 text-xs font-medium text-title transition hover:bg-[#F8F9FB]">
        <Sparkles className="size-3.5" />
        Highlight Key Phrases
      </button>
    </article>
  );
};

export default NarrativeCard;
