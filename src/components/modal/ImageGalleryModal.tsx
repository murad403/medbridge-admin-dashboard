"use client";

import Image, { type StaticImageData } from "next/image";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type ImageGalleryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: StaticImageData[];
  activeIndex: number;
  onSelectImage: (index: number) => void;
};

const ImageGalleryModal = ({
  open,
  onOpenChange,
  images,
  activeIndex,
  onSelectImage,
}: ImageGalleryModalProps) => {
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl border border-[#E4E7EC] bg-[#F8F9FB] p-2 sm:p-3">
        <DialogTitle className="sr-only">Attached image preview</DialogTitle>
        <div className="space-y-2">
          <div className="overflow-hidden rounded-lg bg-white">
            <Image
              src={activeImage}
              alt="Selected attached image"
              className="h-auto max-h-[78vh] w-full object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-5 gap-2">
            {images.map((image, index) => (
              <button
                key={`modal-image-${index}`}
                type="button"
                onClick={() => onSelectImage(index)}
                className={`overflow-hidden rounded-md border-2 transition ${
                  activeIndex === index ? "border-button-color" : "border-transparent"
                }`}
                aria-label={`Select image ${index + 1}`}
              >
                <Image src={image} alt={`Preview image ${index + 1}`} className="h-16 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageGalleryModal;
