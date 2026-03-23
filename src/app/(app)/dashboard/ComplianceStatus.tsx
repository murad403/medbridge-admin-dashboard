const ComplianceStatus = () => {
  return (
    <section className="h-full rounded-[10px] border border-border-color bg-main p-4 md:p-6">
      <h2 className="text-base leading-[1.2] font-semibold text-title md:text-xl">
        Compliance Status
      </h2>

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-description">HIPAA Status</span>
          <span className="rounded-full bg-[#EAF9EE] px-2 py-0.5 text-xs font-medium text-[#16A34A]">
            Active
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-description">Last Audit</span>
          <span className="font-medium text-title">Feb 15, 2026</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-description">Pending Flags</span>
          <span className="font-medium text-[#EA580C]">3</span>
        </div>
      </div>

      <div className="mt-6 border-t border-[#ECEFF3] pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-description">Compliance Score</span>
          <span className="font-semibold text-[#16A34A]">98.4%</span>
        </div>

        <div className="mt-2 h-2 w-full rounded-full bg-[#E5E7EB]">
          <div
            className="h-2 rounded-full bg-[#22C55E]"
            style={{ width: "98.4%" }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
};

export default ComplianceStatus;
