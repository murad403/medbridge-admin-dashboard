import PatientQueueCard from '@/components/shared/PatientQueueCard'
import { patients, TQueueItem } from '@/lib/demo'
import React from 'react'

const page = () => {
  return (
    <section className="space-y-4 max-w-4xl">

      <h2 className="text-xl font-medium text-title">Today&apos;s Patient Queue</h2>


      <div className="overflow-hidden rounded-[10px] border border-border-color bg-main shadow-xs">
        {patients.slice(0, 5).map((patient: TQueueItem, index: number) => (
          <PatientQueueCard key={index} patient={patient} index={index} />
        ))}
      </div>
    </section>
  )
}

export default page
