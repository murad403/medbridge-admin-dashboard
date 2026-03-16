"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Search, Pencil, Trash2, Eye, CircleCheck, Clock3 } from "lucide-react";
import DeleteArticleModal from "@/components/modal/DeleteArticleModal";
import CustomPagination from "@/components/shared/CustomPagination";
import { Article, dummyArticles } from "@/lib/demo";
import Image from "next/image";



export default function NewsManagementPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all articles");
  const [articles, setArticles] = useState<Article[]>(dummyArticles);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    article: Article | null;
  }>({ open: false, article: null });

  const filteredArticles = useMemo(() => {
    let result = articles;

    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.author.toLowerCase().includes(query) ||
          a.category.toLowerCase().includes(query)
      );
    }

    if (activeTab === "published") {
      result = result.filter((a) => a.status === "published");
    }

    return result;
  }, [articles, search, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedArticles = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;

    return filteredArticles.slice(startIndex, startIndex + pageSize);
  }, [filteredArticles, pageSize, safeCurrentPage]);

  const handleDelete = (article: Article) => {
    setDeleteModal({ open: true, article });
  };

  const confirmDelete = () => {
    if (deleteModal.article) {
      setArticles((prev) => prev.filter((a) => a.id !== deleteModal.article!.id));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-title">News Management</h1>
          <p className="text-sm text-description mt-1">
            Manage and organize your articles
          </p>
        </div>
        <Link href="/news-management/add-article">
          <button
            type="button"
            className="bg-linear-to-r from-button-start via-button-end to-button-start text-white flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium cursor-pointer"
          >
            <Plus className="size-4" />
            Create Article
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center gap-4 flex-col md:flex-row">

        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full h-10 rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="flex items-center gap-2">
          {
            ["all articles", "published"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTab === tab
                  ? "bg-linear-to-r from-button-start via-button-end to-button-start text-white"
                  : "bg-[#F1F5F9] text-gray-700 hover:bg-[#F1F5F9]/80"
                  }`}
                onClick={() => {
                  setActiveTab(tab)
                  setCurrentPage(1)
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))

          }
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full min-w-195">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="font-semibold text-description text-left px-5 py-4 text-sm">Article</th>
              <th className="font-semibold text-description text-left px-3 py-4 text-sm">Status</th>
              <th className="font-semibold text-description text-left px-3 py-4 text-sm">Author</th>
              <th className="font-semibold text-description text-left px-3 py-4 text-sm">Date</th>
              <th className="font-semibold text-description text-left px-3 py-4 text-sm">Views</th>
              <th className="font-semibold text-description text-right px-5 py-4 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-12 text-description"
                >
                  No articles found
                </td>
              </tr>
            ) : (
              paginatedArticles.map((article, index) => {
                const absoluteIndex = (safeCurrentPage - 1) * pageSize + index;
                const isFeatured = absoluteIndex < 3;
                const isDraft = absoluteIndex >= filteredArticles.length - 2;

                return (
                <tr key={article.id} className="hover:bg-slate-50/70 border-b border-slate-200 last:border-b-0 align-top">
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-3.5">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={52}
                        height={52}
                        className="rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0 max-w-lg">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-title line-clamp-1 text-[15px]">
                            {article.title}
                          </p>
                          {isFeatured && (
                            <span className="rounded-full bg-amber-100 text-amber-700 text-[11px] font-medium px-2 py-0.5 shrink-0">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-description text-sm mt-1 line-clamp-1">
                          {article.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    {isDraft ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium px-2.5 py-1">
                        <Clock3 className="size-3.5" />
                        Draft
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-1">
                        <CircleCheck className="size-3.5" />
                        Published
                      </span>
                    )}
                  </td>
                  <td className="text-description px-3 py-4 text-sm">
                    {article.author.split(" ")[0]}
                  </td>
                  <td className="text-description px-3 py-4 text-sm whitespace-nowrap">
                    {format(new Date(article.publishDate), "MMM d, yyyy")}
                  </td>
                  <td className="text-description px-3 py-4 text-sm">
                    {isDraft ? (
                      "-"
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <Eye size={14} />
                        {article.views.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/news-management/edit-article?id=${article.id}`} className="text-description hover:text-title transition-colors">
                        <Pencil size={14} />
                      </Link>
                      <button
                        type="button"
                        className="cursor-pointer text-red-500 hover:text-red-600 transition-colors"
                        onClick={() => handleDelete(article)}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })
            )}
          </tbody>
        </table>

        <CustomPagination
          currentPage={safeCurrentPage}
          totalItems={filteredArticles.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          itemLabel="articles"
        />
      </div>

      {/* Delete Modal */}
      <DeleteArticleModal
        open={deleteModal.open}
        onOpenChange={(open) => setDeleteModal({ open, article: deleteModal.article })}
        articleTitle={deleteModal.article?.title || ""}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
