import z from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be 200 characters or less"),
  description: z.string().min(1, "Description is required").max(500, "Description must be 500 characters or less"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  publishDate: z.date({ error: "Publish date is required" }),
  author: z.string().min(1, "Author is required"),
  image: z.string().min(1, "Image is required"),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
