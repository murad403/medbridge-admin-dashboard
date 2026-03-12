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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ImagePlus, X, ArrowLeft } from "lucide-react";
import RichTextEditor from "@/components/shared/RichTextEditor";
import Link from "next/link";


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

    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<ArticleFormData>({
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Link href="/news-management">
                    <button type="button" className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <ArrowLeft className="size-5 text-gray-600" />
                    </button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-title">
                        {isEditing ? "Edit Article" : "Create New Article"}
                    </h1>
                    <p className="text-sm text-description mt-0.5">
                        {isEditing
                            ? "Update the article details below"
                            : "Write and publish a news article for your app's homepage"}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Image Upload */}
                    <div className="bg-white rounded-xl border p-6">
                        <Label className="text-base font-medium text-title mb-3 block">
                            Cover Image
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
                                Click to upload or drag and drop
                            </span>
                            <span className="text-xs text-gray-400 mt-1">
                                PNG, JPG up to 10MB
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
                    <Label htmlFor="title" className="text-base font-medium text-title mb-2 block">
                        Article Title
                    </Label>
                    <Input
                        id="title"
                        placeholder="Enter a compelling title..."

                        {...register("title")}
                        className={cn(errors.title && "border-red-500 w-full")}
                    />
                    {errors.title && (
                        <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                    )}
                </div>

                {/* Description */}
                <div className="bg-white rounded-xl border p-6">
                    <Label htmlFor="description" className="text-base font-medium text-title mb-2 block">
                        Short Description
                    </Label>
                    <Textarea
                        id="description"
                        placeholder="Write a brief description that appears in previews..."
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
                    <Label className="text-base font-medium text-title mb-2 block">
                        Article Content
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
                {/* Publishing Options */}
                <div className="bg-white rounded-xl border p-6 space-y-5">
                    <h2 className="text-base font-semibold text-title">Publishing Options</h2>

                    {/* Category */}
                    <div>
                        <Label className="text-base font-medium text-title mb-2 block">
                            Category
                        </Label>
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className={cn("w-full", errors.category && "border-red-500")}>
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
                    <div>
                        <Label className="text-base font-medium text-title mb-2 block">
                            Tags
                        </Label>
                        <Input
                            placeholder="safety, transport, brooklyn"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            className={cn(errors.tags && "border-red-500")}
                        />
                        <p className="text-xs text-blue-500 mt-1">Separate tags with commas</p>
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

                    {/* Author */}
                    <div>
                        <Label htmlFor="author" className="text-base font-medium text-title mb-2 block">
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

                    {/* Publish Date */}
                    <div>
                        <Label className="text-base font-medium text-title mb-2 block">
                            Publish Date
                        </Label>
                        <Controller
                            name="publishDate"
                            control={control}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button
                                            className={cn(
                                                "w-full flex justify-between items-center text-left font-normal border border-gray-400 rounded-lg py-2 px-4",
                                                !field.value && "text-muted-foreground",
                                                errors.publishDate && "border-red-500"
                                            )}
                                        >
                                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                                            <CalendarIcon className="ml-2 h-4 w-4" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="end">
                                        <div>
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </div>
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
                </div>

                {/* Inline Article Preview */}
                <div className="bg-white rounded-xl border p-6">
                    <h2 className="text-base font-semibold text-title mb-4">Article Preview</h2>
                    <div className="rounded-lg border overflow-hidden">
                        {watchedValues.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={watchedValues.image}
                                alt="Preview"
                                className="w-full h-36 object-cover"
                            />
                        ) : (
                            <div className="w-full h-36 bg-gray-100 flex items-center justify-center">
                                <span className="text-sm text-gray-400">Cover Image Preview</span>
                            </div>
                        )}
                        <div className="p-3 space-y-1">
                            <p className="font-semibold text-sm text-title line-clamp-2">
                                {watchedValues.title || "Article title will appear here"}
                            </p>
                            <p className="text-xs text-description line-clamp-2">
                                {watchedValues.description || "Description will appear here"}
                            </p>
                            {watchedValues.category && (
                                <Badge variant="secondary" className="text-xs mt-1">
                                    {watchedValues.category}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    className="w-full bg-linear-to-r from-button-start to-button-end text-white"
                >
                    {isEditing ? "Update Article" : "Publish Article"}
                </Button>
            </div>
        </div>
    </form>
    );
}
