import PatientQueueCard from "@/components/shared/PatientQueueCard";
import { patients, TQueueItem } from "@/lib/demo";
import Link from "next/link";


const PatientQueue = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-title">Today&apos;s Patient Queue</h2>
        <Link href={'/today-patient-queue'} className="cursor-pointer text-sm font-medium text-title transition hover:opacity-70">
          View All
        </Link>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-border-color bg-main shadow-xs">
        {patients.slice(0, 3).map((patient: TQueueItem, index: number) => (
          <PatientQueueCard key={index} patient={patient} index={index} />
        ))}
      </div>
    </section>
  );
};

export default PatientQueue;
