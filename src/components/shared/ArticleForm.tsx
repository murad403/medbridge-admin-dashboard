"use client";

import { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, type ArticleFormData } from "@/validation/article.validation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  ImagePlus,
  X,
  Eye,
} from "lucide-react";
import RichTextEditor from "@/components/shared/RichTextEditor";
import ArticlePreviewModal from "../modal/ArticlePreviewModal";

const categories = [
  "Real Estate",
  "Market Analysis",
  "Investment",
  "Architecture",
  "Interior Design",
  "Neighborhood Guide",
  "Legal & Finance",
  "Technology",
];

interface ArticleFormProps {
  defaultValues?: Partial<ArticleFormData>;
  onSubmit: (data: ArticleFormData) => void;
  isEditing?: boolean;
}

export default function ArticleForm({
  defaultValues,
  onSubmit,
  isEditing = false,
}: ArticleFormProps) {
  const [tagInput, setTagInput] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "",
      tags: [],
      author: "",
      image: "",
      ...defaultValues,
    },
  });

  const watchedValues = useWatch({ control });
  const tags = useWatch({ control, name: "tags" });

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && !tags.includes(tag)) {
        setValue("tags", [...tags, tag], { shouldValidate: true });
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tagToRemove),
      { shouldValidate: true }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setValue("image", reader.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setValue("image", "", { shouldValidate: true });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-heading">
              {isEditing ? "Edit Article" : "Add New Article"}
            </h1>
            <p className="text-sm text-description mt-1">
              {isEditing
                ? "Update the article details below"
                : "Fill in the details to create a new article"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPreviewOpen(true)}
              className="gap-2"
            >
              <Eye className="size-4" />
              Preview
            </Button>
            <Button
              type="submit"
              className="bg-linear-to-r from-button-start to-button-end text-white gap-2"
            >
              {isEditing ? "Update Article" : "Publish Article"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Upload */}
            <div className="bg-white rounded-xl border p-6">
              <Label className="text-sm font-medium text-title mb-3 block">
                Featured Image
              </Label>
              {watchedValues.image ? (
                <div className="relative rounded-lg overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={watchedValues.image}
                    alt="Article preview"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-sm transition-colors"
                  >
                    <X className="size-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
                  <ImagePlus className="size-10 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 font-medium">
                    Click to upload image
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG, WEBP up to 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
              {errors.image && (
                <p className="text-sm text-red-500 mt-2">{errors.image.message}</p>
              )}
            </div>

            {/* Title */}
            <div className="bg-white rounded-xl border p-6">
              <Label htmlFor="title" className="text-sm font-medium text-title mb-2 block">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter article title"
                {...register("title")}
                className={cn(errors.title && "border-red-500")}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border p-6">
              <Label htmlFor="description" className="text-sm font-medium text-title mb-2 block">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter a brief description of the article"
                rows={3}
                {...register("description")}
                className={cn(errors.description && "border-red-500")}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Content - Rich Text Editor */}
            <div className="bg-white rounded-xl border p-6">
              <Label className="text-sm font-medium text-title mb-2 block">
                Content
              </Label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.content && (
                <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category */}
            <div className="bg-white rounded-xl border p-6">
              <Label className="text-sm font-medium text-title mb-2 block">
                Category
              </Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={cn(errors.category && "border-red-500")}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl border p-6">
              <Label className="text-sm font-medium text-title mb-2 block">
                Tags
              </Label>
              <Input
                placeholder="Type a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className={cn(errors.tags && "border-red-500")}
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="gap-1 pl-2.5 pr-1.5 py-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:bg-gray-300 rounded-full p-0.5"
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              {errors.tags && (
                <p className="text-sm text-red-500 mt-1">{errors.tags.message}</p>
              )}
            </div>

            {/* Publish Date */}
            <div className="bg-white rounded-xl border p-6">
              <Label className="text-sm font-medium text-title mb-2 block">
                Publish Date
              </Label>
              <Controller
                name="publishDate"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                          errors.publishDate && "border-red-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.publishDate && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.publishDate.message}
                </p>
              )}
            </div>

            {/* Author */}
            <div className="bg-white rounded-xl border p-6">
              <Label htmlFor="author" className="text-sm font-medium text-title mb-2 block">
                Author
              </Label>
              <Input
                id="author"
                placeholder="Enter author name"
                {...register("author")}
                className={cn(errors.author && "border-red-500")}
              />
              {errors.author && (
                <p className="text-sm text-red-500 mt-1">{errors.author.message}</p>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Preview Modal */}
      <ArticlePreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        article={watchedValues}
      />
    </>
  );
}
