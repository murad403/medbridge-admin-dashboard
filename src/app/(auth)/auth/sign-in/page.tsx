"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "@/validation/auth.validation";
import AuthCard from "@/components/auth/AuthCard";
import { Eye, EyeOff } from "@/components/icons";


export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });


  const onSubmit = async (data: SignInFormData) => {
    console.log("Sign in:", data);
  };

  return (
    <AuthCard>
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Welcome Back Admin!
        </h2>
        <p className="text-sm text-gray-400 mt-1">Sign in on your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b3a5c]/30 focus:border-[#1b3a5c] transition"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b3a5c]/30 focus:border-[#1b3a5c] transition pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Forget Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-linear-to-b from-[#2c4f6e] to-[#0f2336] text-white rounded-lg font-semibold text-sm hover:opacity-90 transition disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </AuthCard>
  );
}
