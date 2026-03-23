"use client";

import Link from "next/link";
import React from "react";
import { Clock3, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ReportItem = {
  title: string;
  time: string;
};

type PatientOverviewCardProps = {
  patientName: string;
  ageText: string;
  patientId: string;
  riskLevel: string;
  submittedText: string;
  reports: ReportItem[];
  historyHref: string;
};

const PatientOverviewCard = ({
  patientName,
  ageText,
  patientId,
  riskLevel,
  submittedText,
  reports,
  historyHref,
}: PatientOverviewCardProps) => {
  return (
    <aside className="h-fit rounded-[14px] border border-border-color bg-main p-5 shadow-xs">
      <h2 className="text-[26px] font-semibold text-title">Patient Overview</h2>

      <div className="mt-6 space-y-4 border-b border-[#EAECF0] pb-5">
        <div className="space-y-1">
          <p className="text-xs text-description">Patient Name</p>
          <p className="text-lg font-semibold text-title">{patientName}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-description">Age</p>
          <p className="text-base font-medium text-title">{ageText}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-description">Patient ID</p>
          <p className="text-base font-medium text-title">{patientId}</p>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs text-description">Risk Level</p>
          <Badge className="h-auto rounded-md bg-[#FFF7E5] px-2 py-1 text-[10px] text-[#F59E0B] hover:bg-[#FFF7E5]">
            {riskLevel}
          </Badge>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-description">
          <Clock3 className="size-3.5" />
          {submittedText}
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <p className="text-sm font-medium text-title">Past Reports</p>
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={`${report.title}-${report.time}`} className="flex items-start gap-2">
              <FileText className="mt-0.5 size-4 text-[#98A2B3]" />
              <div>
                <p className="text-sm text-title">{report.title}</p>
                <p className="text-xs text-description">{report.time}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href={historyHref}
          className="mt-2 inline-flex w-full items-center justify-center rounded-[10px] bg-button-color px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          View Full History
        </Link>
      </div>
    </aside>
  );
};

export default PatientOverviewCard;
