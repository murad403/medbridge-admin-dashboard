"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import authImage from "@/assets/auth/auth1.png";
import { Input } from "@/components/ui/input";
import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const PersonalInformation = () => {
  const [profileImage, setProfileImage] = useState(authImage.src);
  const [createdBlobUrl, setCreatedBlobUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (createdBlobUrl) {
        URL.revokeObjectURL(createdBlobUrl);
      }
    };
  }, [createdBlobUrl]);

  const handleSelectProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (createdBlobUrl) {
      URL.revokeObjectURL(createdBlobUrl);
    }

    const url = URL.createObjectURL(file);
    setCreatedBlobUrl(url);
    setProfileImage(url);
  };

  return (
    <section className="rounded-[10px] border border-border-color bg-main p-4 shadow-xs sm:p-5">
      <div className="mb-4">
        <div className="flex items-center gap-2">
            <UserRound className="mt-0.5 size-4 text-title" />
          <h2 className="text-xl font-medium text-title">Profile</h2>
        </div>
  
          <p className="text-sm text-description">Update your personal information</p>
      
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleSelectProfileImage}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="mb-4 block h-28 w-24 overflow-hidden rounded-[10px] border border-border-color bg-[#F5F5F5]"
        aria-label="Change profile image"
        title="Click to change image"
      >
        <Image
          src={profileImage}
          alt="Doctor profile"
          width={100}
          height={112}
          unoptimized
          className="h-full w-full object-cover"
        />
      </button>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-title font-semibold text-sm md:text-base">First Name</label>
          <Input className="h-11.5 bg-[#F8F9FB]" defaultValue="Emily" />
        </div>

        <div>
          <label className="text-title font-semibold text-sm md:text-base">Last Name</label>
          <Input className="h-11.5 bg-[#F8F9FB]" defaultValue="Brown" />
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="text-title font-semibold text-sm md:text-base">Email</label>
          <Input className="h-11.5 bg-[#F1F3F6]" defaultValue="dr.brown@medbridge.com" disabled />
        </div>

        <div>
          <label className="text-title font-semibold text-sm md:text-base">Medical License Number</label>
          <Input className="h-11.5 bg-[#F8F9FB]" defaultValue="VIC-MB-123456" />
        </div>

        <div>
          <label className="text-title font-semibold text-sm md:text-base">Specialty</label>
          <Input className="h-11.5 bg-[#F8F9FB]" defaultValue="Internal Medicine" />
        </div>
      </div>

      <Button
      className="max-w-30 mt-4"
        type="button"
      >
        Save Profile
      </Button>
    </section>
  );
};

export default PersonalInformation;
