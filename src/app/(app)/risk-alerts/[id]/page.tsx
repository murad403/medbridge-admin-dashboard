"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import fullBodyImage from "@/assets/images/fullbody.png";
import EhrSuccessModal from "@/components/modal/EhrSuccessModal";
import AIDraftNoteCard from "@/components/shared/AIDraftNoteCard";
import BodyMapCard from "@/components/shared/BodyMapCard";
import BodyMapSummaryCard from "@/components/shared/BodyMapSummaryCard";
import NarrativeCard from "@/components/shared/NarrativeCard";
import PatientOverviewCard from "@/components/shared/PatientOverviewCard";
import { ArrowLeft, ShieldAlert } from "lucide-react";



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

const patientNarrative =
  "I've been having sharp chest pain for the past 2 hours. It started suddenly while I was resting. The pain goes down my left arm and I feel a bit dizzy. I also have some shortness of breath. This has never happened to me before. I'm really worried.";

const RiskAlertDetailsPage = () => {
  const router = useRouter();
  const [isEhrModalOpen, setIsEhrModalOpen] = useState(false);

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
        onClick={() => router.push("/")}
        className="inline-flex items-center gap-1 text-sm font-medium text-title transition hover:text-button-color cursor-pointer"
      >
        <ArrowLeft className="size-4" />
        Back to Queue
      </button>

      <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
        <PatientOverviewCard
          patientName="Emma Davis"
          ageText="34 years old"
          patientId="MED-2024-0892"
          riskLevel="MEDIUM"
          submittedText="Submitted 45 min ago"
          reports={patientReports}
          historyHref="/view-full-history/10"
        />

        <div className="space-y-4">
          <NarrativeCard
            title="Patient Description (Original Words)"
            submittedText="Submitted 12 min ago"
            content={patientNarrative}
          />

          <NarrativeCard
            title="Clinical Summary"
            submittedText="Submitted 12 min ago"
            content={patientNarrative}
          />

          <BodyMapCard
            image={fullBodyImage}
            selectedArea="Left arm"
            durationText="2 days, 3 hrs"
            severityText="Moderate"
          />

          <BodyMapSummaryCard items={bodyMapSummary} />
        </div>

        <AIDraftNoteCard draftText={aiDraftText} onSendToEhr={() => setIsEhrModalOpen(true)} />
      </div>

      <EhrSuccessModal open={isEhrModalOpen} onOpenChange={setIsEhrModalOpen} />
    </section>
  );
};

export default RiskAlertDetailsPage;
