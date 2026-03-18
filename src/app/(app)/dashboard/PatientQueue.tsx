import { Clock3 } from "lucide-react";

const patients = [
  {
    name: "Emma Davis",
    age: 34,
    priority: "MEDIUM",
    priorityClass: "bg-[#FFF7E5] text-[#F59E0B]",
    issue: "Persistent cough",
    time: "45 min ago",
  },
  {
    name: "James Wilson",
    age: 67,
    priority: "LOW",
    priorityClass: "bg-[#ECFDF3] text-[#16A34A]",
    issue: "Joint pain",
    time: "1 hr ago",
  },
  {
    name: "Lisa Martinez",
    age: 29,
    priority: "MEDIUM",
    priorityClass: "bg-[#FFF7E5] text-[#F59E0B]",
    issue: "Allergic reaction",
    time: "1 hr 15 min ago",
  },
];

const PatientQueue = () => {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-title">Today&apos;s Patient Queue</h2>
        <button className="cursor-pointer text-sm font-medium text-title transition hover:opacity-70">
          View All
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-color bg-main shadow-sm">
        {patients.map((patient, index) => (
          <article
            key={patient.name}
            className={`flex flex-wrap items-start gap-3 px-3.5 py-4 sm:px-4 ${
              index !== patients.length - 1 ? "border-b border-border-color" : ""
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

            <button className="ml-auto rounded-lg border border-border-color bg-[#F8F9FB] px-4 py-1.5 text-sm font-medium text-title transition hover:bg-gray-100">
              Open
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PatientQueue;
