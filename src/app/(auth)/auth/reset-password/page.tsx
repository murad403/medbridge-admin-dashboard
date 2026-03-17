"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import authBgMain from "@/assets/auth/auth1.png";
import authBgAccent from "@/assets/auth/auth2.png";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/validation/auth.validation";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    console.log("Reset password payload", data);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#F3F4F6] flex items-center justify-center px-4 py-8">
      <Image
        src={authBgMain}
        alt="Decorative background"
        className="absolute -left-24 -bottom-30 w-130 h-130 object-contain opacity-30 pointer-events-none"
      />
      <Image
        src={authBgAccent}
        alt="Decorative accent"
        className="absolute -top-12 -right-8 w-105 h-auto object-contain pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-95 rounded-2xl border border-[#E5E7EB] bg-white/65 p-5 sm:p-6">
        <div className="text-center mb-5">
          <h1 className="text-[48px] leading-13 font-semibold text-[#12141B]">
            Reset Password
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-[26px] leading-7 font-semibold text-[#12141B] mb-2">
              New Password
            </label>
            <div className="relative">
              <Input
                type={showPassword.newPassword ? "text" : "password"}
                placeholder="Create new password"
                className="h-11.5 bg-white pr-10"
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    newPassword: !prev.newPassword,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword.newPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[26px] leading-7 font-semibold text-[#12141B] mb-2">
              Re-enter Password
            </label>
            <div className="relative">
              <Input
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                className="h-11.5 bg-white pr-10"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword.confirmPassword ? (
                  <Eye size={18} />
                ) : (
                  <EyeOff size={18} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-2 h-11.25 text-[34px] leading-8.5">
            Confirm
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
