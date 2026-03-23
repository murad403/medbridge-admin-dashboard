"use client";

import React from "react";
import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type EhrSuccessModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EhrSuccessModal = ({ open, onOpenChange }: EhrSuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-w-90 p-7">
        <DialogTitle className="sr-only">EHR Submission Status</DialogTitle>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-[#DCFCE7] p-2.5">
            <div className="rounded-full bg-[#22C55E] p-2.5 text-white">
              <Check className="size-5" />
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-title">Sent Successfully!</h3>
          <p className="mt-2 text-sm text-description">Medical note has been successfully sent to EHR.</p>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="mt-5 w-full cursor-pointer rounded-[10px] bg-button-color px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Continue
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EhrSuccessModal;
