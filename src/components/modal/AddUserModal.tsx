"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddUserFormData, addUserSchema } from "@/validation/user.validation";

type AddUserModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitUser: (data: AddUserFormData & { avatarUrl?: string }) => void;
};

const AddUserModal = ({ open, onOpenChange, onSubmitUser }: AddUserModalProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<AddUserFormData["role"] | "">("");
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
    },
  });

  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  const closeModal = () => {
    onOpenChange(false);
    reset();
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
    }
    setBlobUrl("");
    setAvatarUrl("");
    setSelectedRole("");
  };

  const onSubmit = (data: AddUserFormData) => {
    onSubmitUser({ ...data, avatarUrl: avatarUrl || undefined });
    closeModal();
  };

  const handlePickAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
    }

    const nextUrl = URL.createObjectURL(file);
    setBlobUrl(nextUrl);
    setAvatarUrl(nextUrl);
  };

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (!nextOpen ? closeModal() : onOpenChange(true))}>
      <DialogContent className="max-w-[95vw] p-6 sm:max-w-xl" showCloseButton={false}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <DialogTitle className="text-3xl font-semibold text-title">Add New User</DialogTitle>
            <DialogDescription className="mt-1 text-sm text-description">
              Add a new user to the database
            </DialogDescription>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="rounded-md p-1 text-description transition hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePickAvatar}
        />

        <form className="mt-2 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="avatar" className="mb-2 text-sm font-semibold text-title">
              User Avatar
            </Label>
            <button
              id="avatar"
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex size-18 items-center justify-center overflow-hidden rounded-[10px] border border-dashed border-border-color bg-[#F9FAFB] text-[#9CA3AF] transition hover:bg-[#F3F4F6]"
            >
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="User avatar" className="h-full w-full object-cover" />
              ) : (
                <Plus className="size-6" />
              )}
            </button>
          </div>

          <div>
            <Label htmlFor="name" className="mb-2 text-sm font-semibold text-title">
              User Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. Jhon Snow"
              className="bg-[#F8F9FB]"
              {...register("name")}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="mb-2 text-sm font-semibold text-title">
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="example@gmail.com"
              className="bg-[#F8F9FB]"
              {...register("email")}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password" className="mb-2 text-sm font-semibold text-title">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password example"
              className="bg-[#F8F9FB]"
              {...register("password")}
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <Label htmlFor="role" className="mb-2 text-sm font-semibold text-title">
              User Role
            </Label>
            <Select
              value={selectedRole}
              onValueChange={(value) => {
                const roleValue = value as AddUserFormData["role"];
                setSelectedRole(roleValue);
                setValue("role", roleValue, { shouldValidate: true });
              }}
            >
              <SelectTrigger id="role" className="h-11 bg-[#F8F9FB]">
                <SelectValue placeholder="Select User role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Doctor">Doctor</SelectItem>
                <SelectItem value="Patient">Patient</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
          </div>

          <button
            type="submit"
            className="mt-1 w-full rounded-[10px] bg-button-color py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Create User
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
