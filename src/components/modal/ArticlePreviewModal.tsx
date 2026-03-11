"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon, User } from "lucide-react";
import type { ArticleFormData } from "@/validation/article.validation";

interface ArticlePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: Partial<ArticleFormData>;
}

export default function ArticlePreviewModal({
  open,
  onOpenChange,
  article,
}: ArticlePreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Article Preview</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Image */}
          {article.image && (
            <div className="rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.image}
                alt={article.title || "Article image"}
                className="w-full h-56 object-cover"
              />
            </div>
          )}

          {/* Category & Tags */}
          <div className="flex flex-wrap gap-2">
            {article.category && (
              <Badge className="bg-linear-to-r from-button-start to-button-end text-white">
                {article.category}
              </Badge>
            )}
            {article.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          {article.title && (
            <h2 className="text-xl font-bold text-heading">{article.title}</h2>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-description">
            {article.author && (
              <span className="flex items-center gap-1.5">
                <User className="size-4" />
                {article.author}
              </span>
            )}
            {article.publishDate && (
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="size-4" />
                {format(article.publishDate, "PPP")}
              </span>
            )}
          </div>

          {/* Description */}
          {article.description && (
            <p className="text-sm text-description leading-relaxed">
              {article.description}
            </p>
          )}

          {/* Content */}
          {article.content && (
            <div
              className="prose prose-sm max-w-none border-t pt-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-medium [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded [&_a]:text-blue-600 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
