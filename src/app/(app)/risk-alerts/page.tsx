import RiskAlertCard from '@/components/shared/RiskAlertCard'
import { alerts, TAlert } from '@/lib/demo'
import { AlertTriangle } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <section className="space-y-3 max-w-4xl">

            <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-[#EF4444]" />
                <h2 className="text-lg font-medium text-title">High-Risk Alerts</h2>
            </div>


            <div className="space-y-4">
                {alerts.map((alert: TAlert, index: number) => (
                    <RiskAlertCard key={index} alert={alert} />
                ))}
            </div>
        </section>
    )
}

export default page
