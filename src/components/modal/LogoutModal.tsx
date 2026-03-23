"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CircleAlert } from "lucide-react";

interface LogoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const LogoutModal = ({ open, onOpenChange, onConfirm }: LogoutModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-5 sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="items-center text-center">
          <div className="mb-1 flex size-16 items-center justify-center rounded-full border-4 border-[#FEE2E2] bg-white text-[#FF2D2D]">
            <CircleAlert className="size-8" />
          </div>
          <DialogTitle className="text-4xl font-semibold text-title">Logout?</DialogTitle>
          <DialogDescription className="text-lg text-description">
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="w-full cursor-pointer rounded-xl bg-[#FF0A0A] px-4 py-3 text-base font-semibold text-white transition hover:opacity-90"
          >
            Yes, Logout
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full cursor-pointer rounded-xl border border-border-color bg-white px-4 py-3 text-base font-medium text-title transition hover:bg-gray-50"
          >
            No, Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;