"use client";

import { useRouter } from "next/navigation";
import ArticleForm from "@/components/shared/ArticleForm";
import type { ArticleFormData } from "@/validation/article.validation";

export default function AddArticlePage() {
  const router = useRouter();

  const handleSubmit = (data: ArticleFormData) => {
    console.log("Creating article:", data);
    // TODO: API call to create article
    router.push("/news-management");
  };

  return <ArticleForm onSubmit={handleSubmit} />;
}
