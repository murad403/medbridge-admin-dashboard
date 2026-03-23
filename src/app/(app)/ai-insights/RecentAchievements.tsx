import React from "react";
import { CircleCheck, Medal } from "lucide-react";

const RecentAchievements = () => {
  return (
    <section className="rounded-[10px] border border-border-color bg-main p-4 shadow-xs sm:p-5">
      <h2 className="text-xl font-medium text-title">Recent Achievements</h2>

      <div className="mt-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-7 items-center justify-center rounded-full bg-[#ECFDF3] text-[#16A34A]">
            <CircleCheck className="size-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-title">50 Hours Saved</p>
            <p className="text-xs text-description">Milestone reached</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-7 items-center justify-center rounded-full bg-[#EEF4FF] text-button-color">
            <Medal className="size-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-title">200+ Cases Processed</p>
            <p className="text-xs text-description">This month</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentAchievements;
