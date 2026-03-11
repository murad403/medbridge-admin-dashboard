"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ArticleForm from "@/components/shared/ArticleForm";
import type { ArticleFormData } from "@/validation/article.validation";

// Dummy data to simulate fetching an existing article
const existingArticle: Partial<ArticleFormData> = {
  title: "Top 10 Neighborhoods to Invest in 2026",
  description:
    "Discover the most promising neighborhoods for real estate investment this year, backed by data-driven analysis and market trends.",
  content:
    "<h2>Introduction</h2><p>The real estate market in 2026 continues to offer exciting opportunities for investors. In this article, we explore the top neighborhoods that show the most promise for growth and return on investment.</p><h2>Key Factors</h2><p>When evaluating neighborhoods, we consider several key factors:</p><ul><li>Population growth trends</li><li>Infrastructure development</li><li>Employment opportunities</li><li>Property value appreciation rates</li></ul>",
  category: "Investment",
  tags: ["real estate", "investment", "neighborhoods", "2026"],
  publishDate: new Date("2026-03-01"),
  author: "Fernando Silva",
  image: "",
};

function EditArticleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams.get("id");

  const handleSubmit = (data: ArticleFormData) => {
    console.log("Updating article:", articleId, data);
    // TODO: API call to update article
    router.push("/news-management");
  };

  return (
    <ArticleForm
      defaultValues={existingArticle}
      onSubmit={handleSubmit}
      isEditing
    />
  );
}

export default function EditArticlePage() {
  return (
    <Suspense>
      <EditArticleContent />
    </Suspense>
  );
}
