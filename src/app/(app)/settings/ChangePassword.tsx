import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound } from "lucide-react";


const ChangePassword = () => {
    return (
        <section className="rounded-[10px] border border-border-color bg-main p-4 md:p-5">
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="size-4 text-title" />
                <h2 className="text-2xl font-semibold text-title">Change Password</h2>
              </div>
              <p className="mt-1 text-sm text-description">Change your password to keep your account secure.</p>
            </div>

            <div className="max-w-xl space-y-3">
              <div>
                <label className="text-title font-semibold text-sm md:text-base">Current Password</label>
                <Input className="mt-1 h-11.5 bg-[#F3F4F6]" defaultValue="********" type="password" />
              </div>

              <div>
                <label className="text-title font-semibold text-sm md:text-base">New Password</label>
                <Input className="mt-1 h-11.5 bg-[#F3F4F6]" defaultValue="********" type="password" />
              </div>

              <div>
                <label className="text-title font-semibold text-sm md:text-base">Confirm Password</label>
                <Input className="mt-1 h-11.5 bg-[#F3F4F6]" defaultValue="********" type="password" />
              </div>
            </div>

            <Button type="button" className="mt-4 max-w-35">
              Change Password
            </Button>
          </section>
    );
};

export default ChangePassword;
