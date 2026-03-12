"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Search, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DeleteArticleModal from "@/components/modal/DeleteArticleModal";
import { Article, dummyArticles } from "@/lib/demo";
import Image from "next/image";



export default function NewsManagementPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all articles");
  const [articles, setArticles] = useState<Article[]>(dummyArticles);
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
          <Button className=" text-white flex items-center justify-center gap-2">
            <Plus className="size-4" />
            Create Article
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center gap-4 flex-col md:flex-row">

        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 py-3"
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
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))

          }
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-description">Article</TableHead>
              <TableHead className="font-semibold text-description">Status</TableHead>
              <TableHead className="font-semibold text-description">Author</TableHead>
              <TableHead className="font-semibold text-description">Date</TableHead>
              <TableHead className="font-semibold text-description">Views</TableHead>
              <TableHead className="font-semibold text-description text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-12 text-description"
                >
                  No articles found
                </TableCell>
              </TableRow>
            ) : (
              filteredArticles.map((article) => (
                <TableRow key={article.id} className="hover:bg-gray-50">
                  <TableCell className="flex items-center gap-3">
                    <Image src={article.image} alt={article.title} className="size-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-title line-clamp-1 text-base max-w-xs">
                        {article.title}
                      </p>
                      <p className="text-description text-sm mt-1">
                        {article.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Published
                    </Badge>
                  </TableCell>
                  <TableCell className="text-description">
                    {article.author}
                  </TableCell>
                  <TableCell className="text-description">
                    {format(new Date(article.publishDate), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="text-description">
                    <div className="flex items-center gap-1.5">
                      <Eye size={15} />
                      {article.views.toLocaleString()}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/news-management/edit-article?id=${article.id}`}>

                        <Pencil className="text-description" size={14} />

                      </Link>
                      <button
                      className="cursor-pointer"
                        onClick={() => handleDelete(article)}
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
