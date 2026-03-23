"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import fullBodyImage from "@/assets/images/fullbody.png";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Check, Clock3, Copy, FileText, RotateCcw, Send, ShieldAlert, Sparkles} from "lucide-react";



const patientReports = [
  { title: "Allergic rhinitis treatment", time: "4 months ago" },
  { title: "Annual physical", time: "1 year ago" },
];

const bodyMapSummary = [
  { area: "Chest (central)", duration: "Duration: 1 day", severity: "Severe", severityClass: "text-[#EF4444] bg-[#FEECEC]" },
  { area: "Left arm", duration: "Duration: 1 day", severity: "Moderate", severityClass: "text-[#F59E0B] bg-[#FFF7E5]" },
];

const aiDraftText = `CHIEF COMPLAINT
Patient reports sudden onset of severe chest pain radiating down the left arm, associated with dizziness.

HISTORY OF PRESENT ILLNESS
N/A

ASSOCIATED SYMPTOMS
Patient reports sudden onset of severe chest pain radiating down the left arm, associated with dizziness.

RISK ANALYSIS
Patient reports sudden onset of severe chest pain radiating down the left arm, associated with dizziness.

SUGGESTED ICD
Patient reports sudden onset of severe, acute, T00. T00...`;

const RiskAlertDetailsPage = () => {
  const router = useRouter();
  const [isEhrModalOpen, setIsEhrModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyDraft = async () => {
    try {
      await navigator.clipboard.writeText(aiDraftText);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1500);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <section className="space-y-4">
      <div className="rounded-[10px] border border-[#EF4444] bg-[#EF4444] px-4 py-2 text-sm font-medium text-white">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-2">
            <ShieldAlert className="size-4" />
            High Risk: Acute onset chest pain with radiation to left arm
          </p>
          <span className="text-xs font-semibold">Review Immediately</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-sm font-medium text-title transition hover:text-button-color cursor-pointer"
      >
        <ArrowLeft className="size-4" />
        Back to Queue
      </button>

      <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
        <aside className="h-fit rounded-[14px] border border-border-color bg-main p-5 shadow-xs">
          <h2 className="text-[26px] font-semibold text-title">Patient Overview</h2>

          <div className="mt-6 space-y-4 border-b border-[#EAECF0] pb-5">
            <div className="space-y-1">
              <p className="text-xs text-description">Patient Name</p>
              <p className="text-lg font-semibold text-title">Emma Davis</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-description">Age</p>
              <p className="text-base font-medium text-title">34 years old</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-description">Patient ID</p>
              <p className="text-base font-medium text-title">MED-2024-0892</p>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs text-description">Risk Level</p>
              <Badge className="h-auto rounded-md bg-[#FFF7E5] px-2 py-1 text-[10px] text-[#F59E0B] hover:bg-[#FFF7E5]">
                MEDIUM
              </Badge>
            </div>

            <p className="flex items-center gap-1.5 text-xs text-description">
              <Clock3 className="size-3.5" />
              Submitted 45 min ago
            </p>
          </div>

          <div className="mt-5 space-y-3">
            <p className="text-sm font-medium text-title">Past Reports</p>
            <div className="space-y-3">
              {patientReports.map((report) => (
                <div key={report.title} className="flex items-start gap-2">
                  <FileText className="mt-0.5 size-4 text-[#98A2B3]" />
                  <div>
                    <p className="text-sm text-title">{report.title}</p>
                    <p className="text-xs text-description">{report.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/history"
              className="mt-2 inline-flex w-full items-center justify-center rounded-[10px] bg-button-color px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              View Full History
            </Link>
          </div>
        </aside>

        <div className="space-y-4">
          <article className="rounded-[14px] border border-border-color bg-main p-4 shadow-xs">
            <h3 className="text-base font-semibold text-title">Patient Description (Original Words)</h3>
            <p className="mt-1 text-xs text-description">Submitted 12 min ago</p>
            <div className="mt-3 rounded-xl bg-[#F8F9FB] p-4 text-sm leading-6 text-[#344054]">
              I&apos;ve been having sharp chest pain for the past 2 hours. It started suddenly while I was resting. The pain goes down my left arm and I feel a bit dizzy. I also have some shortness of breath. This has never happened to me before. I&apos;m really worried.
            </div>
            <button className="mt-3 inline-flex items-center gap-1 rounded-md border border-border-color px-3 py-1.5 text-xs font-medium text-title transition hover:bg-[#F8F9FB]">
              <Sparkles className="size-3.5" />
              Highlight Key Phrases
            </button>
          </article>

          <article className="rounded-[14px] border border-border-color bg-main p-4 shadow-xs">
            <h3 className="text-base font-semibold text-title">Clinical Summary</h3>
            <p className="mt-1 text-xs text-description">Submitted 12 min ago</p>
            <div className="mt-3 rounded-xl bg-[#F8F9FB] p-4 text-sm leading-6 text-[#344054]">
              I&apos;ve been having sharp chest pain for the past 2 hours. It started suddenly while I was resting. The pain goes down my left arm and I feel a bit dizzy. I also have some shortness of breath. This has never happened to me before. I&apos;m really worried.
            </div>
            <button className="mt-3 inline-flex items-center gap-1 rounded-md border border-border-color px-3 py-1.5 text-xs font-medium text-title transition hover:bg-[#F8F9FB]">
              <Sparkles className="size-3.5" />
              Highlight Key Phrases
            </button>
          </article>

          <article className="rounded-[14px] border border-border-color bg-main p-4 shadow-xs">
            <h3 className="text-base font-semibold text-title">Body Map Diagram</h3>
            <p className="mt-1 text-xs text-description">Selected area of pain</p>

            <div className="mt-4 overflow-hidden rounded-xl border border-[#E4E7EC] bg-[#FCFCFD]">
              <div className="flex justify-center p-4">
                <Image src={fullBodyImage} alt="Body map" className="h-auto w-full max-w-70 object-contain" priority />
              </div>

              <div className="flex items-center justify-between border-t border-[#E4E7EC] bg-[#F9FAFB] px-4 py-2">
                <div>
                  <p className="text-xs font-medium text-title">Left arm</p>
                  <p className="text-[11px] text-description">2 days, 3 hrs</p>
                </div>
                <Badge className="h-auto rounded-md bg-[#FFF7E5] px-2 py-1 text-[10px] text-[#F59E0B] hover:bg-[#FFF7E5]">
                  Moderate
                </Badge>
              </div>
            </div>
          </article>

          <article className="rounded-[14px] border border-border-color bg-main p-4 shadow-xs">
            <h3 className="text-base font-semibold text-title">Body Map Summary</h3>
            <p className="mt-1 text-xs text-description">Areas highlighted by patient</p>

            <div className="mt-4 space-y-3">
              {bodyMapSummary.map((item) => (
                <div key={item.area} className="rounded-lg border border-[#EEF2F6] bg-[#F9FAFB] px-3 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-title">{item.area}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.severityClass}`}>
                      {item.severity}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-description">{item.duration}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

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
              onClick={() => setIsEhrModalOpen(true)}
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
      </div>

      <Dialog open={isEhrModalOpen} onOpenChange={setIsEhrModalOpen}>
        <DialogContent showCloseButton={false} className="max-w-90 p-7">
          <DialogTitle className="sr-only">EHR Submission Status</DialogTitle>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-[#DCFCE7] p-2.5">
              <div className="rounded-full bg-[#22C55E] p-2.5 text-white">
                <Check className="size-5" />
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-title">Sent Successfully!</h3>
            <p className="mt-2 text-sm text-description">
              Medical note has been successfully sent to EHR.
            </p>

            <button
              type="button"
              onClick={() => setIsEhrModalOpen(false)}
              className="mt-5 cursor-pointer w-full rounded-[10px] bg-button-color px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Continue
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RiskAlertDetailsPage;
