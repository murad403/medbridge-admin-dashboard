"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import bodyMapImage from "@/assets/images/fullbody.png";
import attachedImage1 from "@/assets/images/Rectangle 9529.png";
import attachedImage2 from "@/assets/images/Rectangle 9530.png";
import attachedImage3 from "@/assets/images/Rectangle 9531.png";
import attachedImage4 from "@/assets/images/Rectangle 9532.png";
import attachedImage5 from "@/assets/images/Rectangle 9533.png";
import EhrSuccessModal from "@/components/modal/EhrSuccessModal";
import ImageGalleryModal from "@/components/modal/ImageGalleryModal";
import AIDraftNoteCard from "@/components/shared/AIDraftNoteCard";
import BodyMapCard from "@/components/shared/BodyMapCard";
import BodyMapSummaryCard from "@/components/shared/BodyMapSummaryCard";
import NarrativeCard from "@/components/shared/NarrativeCard";
import PatientOverviewCard from "@/components/shared/PatientOverviewCard";
import { ArrowLeft } from "lucide-react";

const patientReports = [
  { title: "Allergic rhinitis treatment", time: "4 months ago" },
  { title: "Annual physical", time: "1 year ago" },
];

const bodyMapSummary = [
  {
    area: "Chest (central)",
    duration: "Duration: 1 day",
    severity: "Severe",
    severityClass: "text-[#EF4444] bg-[#FEECEC]",
  },
  {
    area: "Left arm",
    duration: "Duration: 1 day",
    severity: "Moderate",
    severityClass: "text-[#F59E0B] bg-[#FFF7E5]",
  },
];

const attachedImages = [attachedImage1, attachedImage2, attachedImage3, attachedImage4, attachedImage5];

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

const PatientQueueDetailsPage = () => {
  const router = useRouter();
  const [isEhrModalOpen, setIsEhrModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openImageModal = (index = 0) => {
    setActiveImageIndex(index);
    setIsImageModalOpen(true);
  };

  return (
    <section className="space-y-4">
      <button
        type="button"
        onClick={() => router.push("/patient-queue")}
        className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-title transition hover:text-button-color"
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

          <BodyMapCard
            image={bodyMapImage}
            selectedArea="Left arm"
            durationText="2 days, 3 hrs"
            severityText="Moderate"
          />

          <BodyMapSummaryCard items={bodyMapSummary} />

          <article className="rounded-[14px] border border-border-color bg-main p-4 shadow-xs">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-title">Attached Images</h3>
              <button
                type="button"
                onClick={() => openImageModal(0)}
                className="text-xs font-medium text-description transition hover:text-button-color"
              >
                View all
              </button>
            </div>

            <div className="mt-3 grid grid-cols-5 gap-2">
              {attachedImages.map((image, index) => (
                <button
                  key={`inline-image-${index}`}
                  type="button"
                  onClick={() => openImageModal(index)}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                  aria-label={`Open attached image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`Attached image ${index + 1}`}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </article>
        </div>

        <AIDraftNoteCard draftText={aiDraftText} onSendToEhr={() => setIsEhrModalOpen(true)} />
      </div>

      <EhrSuccessModal open={isEhrModalOpen} onOpenChange={setIsEhrModalOpen} />

      <ImageGalleryModal
        open={isImageModalOpen}
        onOpenChange={setIsImageModalOpen}
        images={attachedImages}
        activeIndex={activeImageIndex}
        onSelectImage={setActiveImageIndex}
      />
    </section>
  );
};

export default PatientQueueDetailsPage;
