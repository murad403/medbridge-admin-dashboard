"use client";

import Image, { type StaticImageData } from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";

type BodyMapCardProps = {
  image: StaticImageData;
  selectedArea: string;
  durationText: string;
  severityText: string;
};

const BodyMapCard = ({ image, selectedArea, durationText, severityText }: BodyMapCardProps) => {
  return (
    <article className="rounded-[14px] border border-border-color bg-main p-4 shadow-xs">
      <h3 className="text-base font-semibold text-title">Body Map Diagram</h3>
      <p className="mt-1 text-xs text-description">Selected area of pain</p>

      <div className="mt-4 overflow-hidden rounded-xl border border-[#E4E7EC] bg-[#FCFCFD]">
        <div className="flex justify-center p-4">
          <Image src={image} alt="Body map" className="h-auto w-full max-w-70 object-contain" priority />
        </div>

        <div className="flex items-center justify-between border-t border-[#E4E7EC] bg-[#F9FAFB] px-4 py-2">
          <div>
            <p className="text-xs font-medium text-title">{selectedArea}</p>
            <p className="text-[11px] text-description">{durationText}</p>
          </div>
          <Badge className="h-auto rounded-md bg-[#FFF7E5] px-2 py-1 text-[10px] text-[#F59E0B] hover:bg-[#FFF7E5]">
            {severityText}
          </Badge>
        </div>
      </div>
    </article>
  );
};

export default BodyMapCard;
