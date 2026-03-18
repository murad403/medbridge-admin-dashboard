import { TAlert } from '@/lib/demo'
import { AlertTriangle, Clock3 } from 'lucide-react'
import Link from 'next/link'


const RiskAlertCard = ({ alert }: { alert: TAlert }) => {
    return (
        <article
            key={alert.patient}
            className="rounded-[10px] border border-l-4 border-[#EF4444] bg-main shadow-xs p-4"
        >
            <div className="flex flex-wrap items-start gap-2 sm:justify-between">
                <div className="space-y-1.5 w-full">
                    <div className="flex justify-between items-center w-full gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-medium text-title">{alert.patient}</h3>
                            <p className="text-xs text-description">{alert.age} years old</p>
                            <span className="rounded-full bg-[#FFECEC] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#EF4444]">
                                {alert.risk}
                            </span>
                        </div>

                        <Link href={`/risk-alerts/${alert.age}`} className="ml-auto min-w-24 rounded-lg bg-button-color px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 sm:ml-4">
                            Open Case
                        </Link>
                    </div>

                    <p className="flex items-center gap-1.5 text-sm font-medium text-[#EF4444]">
                        <AlertTriangle className="size-3.5" />
                        {alert.symptom}
                    </p>

                    <p className="text-sm text-description">{alert.note}</p>
                    <p className="flex items-center gap-1.5 text-xs text-description">
                        <Clock3 className="size-3.5" />
                        {alert.time}
                    </p>
                </div>
            </div>
        </article>
    )
}

export default RiskAlertCard
