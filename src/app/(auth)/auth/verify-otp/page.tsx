"use client";

import { useRef } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import authBgMain from "@/assets/auth/auth1.png";
import authBgAccent from "@/assets/auth/auth2.png";
import { VerifyOtpFormData, verifyOtpSchema } from "@/validation/auth.validation";

const OTP_LENGTH = 5;

const VerifyOtp = () => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit: SubmitHandler<VerifyOtpFormData> = async (data) => {
    console.log("Verify OTP payload", data);
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
            Verify Email
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="otp"
            render={({ field: { value, onChange } }) => {
              const otpValue = value ?? "";
              const digits = Array.from({ length: OTP_LENGTH }, (_, idx) => otpValue[idx] ?? "");

              return (
                <div className="space-y-2">
                  <div className="flex justify-center gap-2">
                    {digits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          inputRefs.current[idx] = el;
                        }}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={1}
                        value={digit}
                        onChange={(event) => {
                          const nextDigit = event.target.value.replace(/\D/g, "").slice(-1);
                          const nextDigits = [...digits];
                          nextDigits[idx] = nextDigit;
                          onChange(nextDigits.join(""));

                          if (nextDigit && idx < OTP_LENGTH - 1) {
                            inputRefs.current[idx + 1]?.focus();
                          }
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Backspace" && !digits[idx] && idx > 0) {
                            inputRefs.current[idx - 1]?.focus();
                          }
                        }}
                        className="size-10 rounded-xl border border-border-color bg-white text-center text-lg font-semibold text-[#0F172A] focus:border-[#2E5BFF] focus:outline-none focus:ring-1 focus:ring-[#2E5BFF]"
                      />
                    ))}
                  </div>
                  {errors.otp && (
                    <p className="text-center text-xs text-red-500">{errors.otp.message}</p>
                  )}
                </div>
              );
            }}
          />

          <Button type="submit" disabled={isSubmitting} className="mt-2 h-11.25 text-[34px] leading-8.5">
            Verify
          </Button>

          <p className="text-center text-sm text-[#1F2937]">
            Don&apos;t get the code?{" "}
            <button type="button" className="font-semibold text-[#2E5BFF] hover:underline">
              Resend
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
