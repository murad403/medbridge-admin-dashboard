"use client";

import { CircleAlert, Trash2 } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export type UserActionType = "suspend" | "delete" | "activate";

type UserActionConfirmModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: UserActionType;
  onConfirm: () => void;
};

const actionConfig: Record<
  UserActionType,
  { title: string; description: string; buttonText: string; destructive: boolean }
> = {
  delete: {
    title: "Delete user",
    description: "Are you sure you want to delete this user?",
    buttonText: "Yes, Delete",
    destructive: true,
  },
  suspend: {
    title: "Suspend",
    description: "Are you sure you want to suspend this user?",
    buttonText: "Yes, Suspend",
    destructive: true,
  },
  activate: {
    title: "Active user",
    description: "Are you sure you want to active this user?",
    buttonText: "Yes, Active",
    destructive: false,
  },
};

const UserActionConfirmModal = ({
  open,
  onOpenChange,
  actionType,
  onConfirm,
}: UserActionConfirmModalProps) => {
  const config = actionConfig[actionType];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-5 sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="items-center text-center">
          <div
            className={`mb-1 flex size-16 items-center justify-center rounded-full border-4 bg-white ${
              config.destructive ? "border-[#FEE2E2] text-[#FF2D2D]" : "border-[#DBEAFE] text-button-color"
            }`}
          >
            {actionType === "delete" ? <Trash2 className="size-8" /> : <CircleAlert className="size-8" />}
          </div>
          <DialogTitle className="text-2xl font-semibold text-title">{config.title}</DialogTitle>
          <DialogDescription className="text-base text-description">{config.description}</DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className={`w-full cursor-pointer rounded-xl px-4 py-2.5 text-base font-semibold text-white transition hover:opacity-90 ${
              config.destructive ? "bg-[#FF0A0A]" : "bg-button-color"
            }`}
          >
            {config.buttonText}
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full cursor-pointer rounded-xl border border-border-color bg-white px-4 py-2.5 text-base font-medium text-title transition hover:bg-gray-50"
          >
            No, Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserActionConfirmModal;
