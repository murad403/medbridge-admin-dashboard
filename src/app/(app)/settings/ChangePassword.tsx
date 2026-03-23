import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockKeyhole } from "lucide-react";
import React from "react";

const ChangePassword = () => {
    return (
        <section className="rounded-[10px] border border-border-color bg-main p-4 shadow-xs sm:p-5">
            <div className="mb-4 ">
                <div className="flex items-center gap-2">
                    <LockKeyhole className=" size-4 text-title" />
                    <h2 className="text-xl font-medium text-title">Change Password</h2>

                </div>

                <p className="text-sm text-description">Change your password to keep your account secure</p>

            </div>

            <div className="max-w-xl space-y-4">
                <div>
                    <label className="text-title font-semibold text-sm md:text-base">Current Password</label>
                    <Input className="h-11.5 bg-[#F8F9FB]" type="password" defaultValue="********" />
                </div>

                <div>
                    <label className="text-title font-semibold text-sm md:text-base">New Password</label>
                    <Input className="h-11.5 bg-[#F8F9FB]" type="password" defaultValue="********" />
                </div>

                <div>
                    <label className="text-title font-semibold text-sm md:text-base">Confirm Password</label>
                    <Input className="h-11.5 bg-[#F8F9FB]" type="password" defaultValue="********" />
                </div>
            </div>

            <Button
                type="button"
                className="max-w-30 mt-4"
            >
                Change Password
            </Button>
        </section>
    );
};

export default ChangePassword;
