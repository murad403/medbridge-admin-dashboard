export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  publishDate: string;
  status: "published";
  views: number;
  image: string;
}

export const dummyArticles: Article[] = [
  {
    id: "1",
    title: "Top 10 Neighborhoods to Invest in 2026",
    category: "Investment",
    author: "Fernando Silva",
    publishDate: "2026-03-01",
    status: "published",
    views: 1240,
    image: "",
  },
  {
    id: "2",
    title: "Understanding Mortgage Rates in Today's Market",
    category: "Legal & Finance",
    author: "Maria Santos",
    publishDate: "2026-02-28",
    status: "published",
    views: 890,
    image: "",
  },
  {
    id: "3",
    title: "Modern Interior Design Trends for Small Apartments",
    category: "Interior Design",
    author: "Ana Costa",
    publishDate: "2026-02-25",
    status: "published",
    views: 2100,
    image: "",
  },
  {
    id: "4",
    title: "Real Estate Market Analysis Q1 2026",
    category: "Market Analysis",
    author: "Fernando Silva",
    publishDate: "2026-02-20",
    status: "published",
    views: 1560,
    image: "",
  },
  {
    id: "5",
    title: "How Technology is Transforming Property Search",
    category: "Technology",
    author: "João Oliveira",
    publishDate: "2026-02-15",
    status: "published",
    views: 750,
    image: "",
  },
];