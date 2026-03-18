import { CircleCheck } from "lucide-react";

const completedCases = [
  {
    patient: "Robert Taylor",
    type: "Annual checkup",
    time: "2 hours ago",
  },
  {
    patient: "Amanda Brown",
    type: "Flu symptoms",
    time: "3 hours ago",
  },
  {
    patient: "David Lee",
    type: "Back pain",
    time: "4 hours ago",
  },
];

const RecentlyCompleted = () => {
  return (
    <section className="rounded-[10px] border border-border-color bg-main shadow-xs p-4">
      <div className="mb-4 flex items-center gap-2">
        <CircleCheck className="size-4 text-title" />
        <h2 className="text-xl font-medium text-title">Recently Completed</h2>
      </div>

      <div className="space-y-3">
        {completedCases.map((item, index) => (
          <article
            key={item.patient}
            className={`${index !== completedCases.length - 1 ? "border-b border-border-color pb-3" : ""}`}
          >
            <h3 className="text-sm font-medium text-title">{item.patient}</h3>
            <p className="text-xs text-description">{item.type}</p>
            <p className="mt-1 text-xs text-description">{item.time}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentlyCompleted;
