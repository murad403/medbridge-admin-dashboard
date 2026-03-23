"use client";

import Link from "next/link";
import React from "react";
import { ArrowLeft, Download, FileText, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { jsPDF } from "jspdf";

const historyReports = [
    { title: "Allergic rhinitis treatment", time: "4 months ago" },
    { title: "Allergic rhinitis treatment", time: "4 months ago" },
    { title: "Allergic rhinitis treatment", time: "4 months ago" },
    { title: "Allergic rhinitis treatment", time: "4 months ago" },
    { title: "Allergic rhinitis treatment", time: "4 months ago" },
    { title: "Annual physical", time: "1 year ago" },
];

const FullHistory = () => {
    const handleDownloadPdf = (reportTitle: string, reportTime: string) => {
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("MedBridge - Patient Report", 20, 24);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Report: ${reportTitle}`, 20, 40);
        doc.text(`Patient: Emma Davis`, 20, 50);
        doc.text(`Patient ID: MED-2024-0892`, 20, 60);
        doc.text(`Recorded: ${reportTime}`, 20, 70);
        doc.text(`Risk Level: MEDIUM`, 20, 80);

        doc.setFontSize(11);
        doc.text("Summary:", 20, 96);
        doc.text(
            "Patient history report generated from MedBridge Doctor Dashboard.",
            20,
            106,
            { maxWidth: 170 }
        );

        const safeName = reportTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        doc.save(`${safeName || "patient-report"}.pdf`);
    };

    return (
        <section className="space-y-4">
            <Link
                href="/risk-alerts/34"
                className="inline-flex items-center gap-1 text-sm font-medium text-title transition hover:text-button-color"
            >
                <ArrowLeft className="size-4" />
                View full history
            </Link>

            <article className="rounded-[10px] border border-border-color bg-main p-5 shadow-xs md:p-7">
                <h1 className="text-xl font-semibold text-title">Full History</h1>

                <div className="mt-8 space-y-4 border-b border-[#EAECF0] pb-8 ">
                    <div>
                        <p className="flex items-center gap-1.5 text-xs text-description">
                            <User className="size-3.5" />
                            Patient Name
                        </p>
                        <p className="mt-1 text-lg font-medium text-title">Emma Davis</p>
                    </div>

                    <div className="flex gap-6 items-center">
                        <div>
                            <p className="text-xs text-description">Age</p>
                            <p className="mt-1 text-lg font-medium text-title">34 years old</p>
                        </div>

                        <div>
                            <p className="text-xs text-description">Patient ID</p>
                            <p className="mt-1 text-lg font-medium text-title">MED-2024-0892</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-description">Risk Level</p>
                        <Badge className="mt-2 h-auto rounded-md bg-[#FFF7E5] px-2 py-1 text-[10px] text-[#F59E0B] hover:bg-[#FFF7E5]">
                            MEDIUM
                        </Badge>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-title">Past Reports History</h2>

                    <div className="mt-4 max-w-xl space-y-4">
                        {historyReports.map((report, index) => (
                            <div key={`${report.title}-${index}`} className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-2.5">
                                    <FileText className="mt-0.5 size-4 text-[#98A2B3]" />
                                    <div>
                                        <p className="text-[17px] text-title">{report.title}</p>
                                        <p className="text-sm text-description">{report.time}</p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleDownloadPdf(report.title, report.time)}
                                    className="rounded-md p-1.5 text-button-color transition hover:bg-[#EEF4FF]"
                                    aria-label={`Download ${report.title}`}
                                >
                                    <Download className="size-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </article>
        </section>
    );
};

export default FullHistory;
