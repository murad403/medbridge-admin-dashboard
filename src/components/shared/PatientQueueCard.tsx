import { patients, TQueueItem } from '@/lib/demo'
import { Clock3 } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const PatientQueueCard = ({ patient, index }: { patient: TQueueItem; index: number }) => {
    return (
        <article
            className={`flex flex-wrap items-start gap-3 p-4 ${index !== patients.length - 1 ? "border-b border-border-color" : ""
                }`}
        >
            <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-medium text-title">{patient.name}</h3>
                    <span className="text-xs text-description">{patient.age} years</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${patient.priorityClass}`}>
                        {patient.priority}
                    </span>
                </div>

                <p className="text-sm text-description">{patient.issue}</p>
                <p className="flex items-center gap-1.5 text-xs text-description">
                    <Clock3 className="size-3.5" />
                    {patient.time}
                </p>
            </div>

            <Link href={`/patient-queue/${patient.age}`} className="ml-auto rounded-lg border border-border-color bg-[#F8F9FB] px-4 py-1.5 text-sm font-medium text-title transition hover:bg-gray-100">
                Open
            </Link>
        </article>
    )
}

export default PatientQueueCard
