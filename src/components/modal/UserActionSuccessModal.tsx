"use client";

import { Check } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type UserActionSuccessModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const UserActionSuccessModal = ({ open, onOpenChange }: UserActionSuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-5 sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="items-center text-center">
          <div className="mb-1 flex size-16 items-center justify-center rounded-full border-4 border-[#DCFCE7] bg-white text-[#16A34A]">
            <Check className="size-8" />
          </div>
          <DialogTitle className="text-4xl font-semibold text-title">Done!</DialogTitle>
          <DialogDescription className="text-lg text-description">
            your action has been done
          </DialogDescription>
        </DialogHeader>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="mt-2 w-full cursor-pointer rounded-xl bg-button-color px-4 py-3 text-base font-semibold text-white transition hover:opacity-90"
        >
          Continue
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default UserActionSuccessModal;
