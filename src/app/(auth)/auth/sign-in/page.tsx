"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo/logo.png";
import { SignInFormData, signInSchema } from "@/validation/auth.validation";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    console.log("Sign in payload", data);
  };

  return (
    <div className=" w-full flex items-center justify-center">
      <div className="w-full max-w-117.5">
        <Link href={"/"} className="flex items-center justify-center gap-2 mb-10">
          <Image src={logo} alt="MedBridge" width={48} height={48} priority />
          <h1 className="font-bold text-title text-3xl md:text-4xl">MedBridge</h1>
        </Link>

        <div className="rounded-xl border border-border-color bg-[#FAFAFA] px-6 py-10 md:p-5">
          <div className="text-center mb-5">
            <h1 className="text-2xl md:text-3xl leading-11 font-semibold text-title">
              Welcome Back!
            </h1>
            <p className="text-xl md:text-2xl leading-6 text-title mt-1.5">
              Sign in on your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-title font-semibold text-sm md:text-base">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11.5 bg-white"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-title font-semibold text-sm md:text-base">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-11.5 bg-white pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="size-4 rounded border border-border-color accent-button-color"
                />
                <label className="flex items-center gap-2 text-sm text-title">
                  Remember password
                </label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-[#EF4444] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
