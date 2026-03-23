"use client";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

const PersonalInformation = () => {
  return (
    <section className="rounded-[10px] border border-border-color bg-main p-4 md:p-5">
      <h2 className="text-2xl font-semibold text-title">Organization Details</h2>

      <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 md:max-w-2xl">
        <div>
          <label className="text-title font-semibold text-sm md:text-base">Organization Name</label>
          <Input defaultValue="MedBridge Healthcare" className="mt-1 h-11.5 bg-[#F3F4F6]" />
        </div>

        <div>
          <label className="text-title font-semibold text-sm md:text-base">Organization ID</label>
          <Input defaultValue="MDBR-2024-001" className="mt-1 h-11.5 bg-[#F3F4F6]" />
        </div>

        <div className="md:col-span-2">
          <label className="text-title font-semibold text-sm md:text-base">Primary Address</label>
          <Input
            defaultValue="123 Medical Center Blvd, San Francisco, CA 94102"
            className="mt-1 h-11.5 bg-[#F3F4F6]"
          />
        </div>

        <div>
          <label className="text-title font-semibold text-sm md:text-base">Contact Phone</label>
          <Input defaultValue="+1 (415) 555-0123" className="mt-1 h-11.5 bg-[#F3F4F6]" />
        </div>

        <div>
          <label className="text-title font-semibold text-sm md:text-base">Contact Email</label>
          <Input defaultValue="admin@medbridge.com" className="mt-1 h-11.5 bg-[#F3F4F6]" />
        </div>

        <div className="md:col-span-2">
          <label className="text-title font-semibold text-sm md:text-base">Timezone</label>
          <Input defaultValue="America/Los_Angeles (PST)" className="mt-1 h-11.5 bg-[#F3F4F6]" />
        </div>
      </div>



      <div className="mt-4 flex items-center justify-end gap-3 max-w-2xl">
        <button className="bg-[#F5F6F8] cursor-pointer py-2.5 px-6 rounded-[10px] border border-border-color">
          Reset
        </button>
        <Button type="button" className="flex items-center justify-center max-w-35">
          <Save className="size-3.5" />
          Save Changes
        </Button>
      </div>

    </section>
  );
};

export default PersonalInformation;
