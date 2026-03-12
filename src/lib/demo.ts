/* eslint-disable @typescript-eslint/no-explicit-any */
import image1 from "@/assets/demo/img1.png"
import image2 from "@/assets/demo/img2.png"
import image3 from "@/assets/demo/img3.png"
import image4 from "@/assets/demo/img4.png"
import image5 from "@/assets/demo/img5.png"

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  publishDate: string;
  status: "published";
  views: number;
  image: any;
}

export const dummyArticles: Article[] = [
  {
    id: "1",
    image: image1,
    description: "Discover the top 10 neighborhoods to invest in for 2026.",
    title: "Top 10 Neighborhoods to Invest in 2026",
    category: "Investment",
    author: "Fernando Silva",
    publishDate: "2026-03-01",
    status: "published",
    views: 1240,
  },
  {
    id: "2",
    image: image2,
    description: "Learn how to navigate the complexities of today's mortgage market.",
    title: "Understanding Mortgage Rates in Today's Market",
    category: "Legal & Finance",
    author: "Maria Santos",
    publishDate: "2026-02-28",
    status: "published",
    views: 890
  },
  {
    id: "3",
    image: image3,
    description: "Explore the latest trends in modern interior design for small apartments.",
    title: "Modern Interior Design Trends for Small Apartments",
    category: "Interior Design",
    author: "Ana Costa",
    publishDate: "2026-02-25",
    status: "published",
    views: 2100,
  },
  {
    id: "4",
    description: "Explore the latest trends in modern interior design for small apartments.",
    title: "Real Estate Market Analysis Q1 2026",
    category: "Market Analysis",
    author: "Fernando Silva",
    publishDate: "2026-02-20",
    status: "published",
    views: 1560,
    image: image4,
  },
  {
    id: "5",
    title: "How Technology is Transforming Property Search",
    description: "Explore the latest trends in modern interior design for small apartments.",
    category: "Technology",
    author: "João Oliveira",
    publishDate: "2026-02-15",
    status: "published",
    views: 750,
    image: image5,
  },
];

export interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "guest";
  savedAreas: number;
  searches: number;
  mostViewed: string;
  lastActive: string;
}

export const dummyUsers: User[] = [
  { id: "1", name: "Sarah Johnson",   email: "sarah.j@email.com",     status: "active", savedAreas: 8,  searches: 45, mostViewed: "Downtown Brooklyn",  lastActive: "2 hours ago" },
  { id: "2", name: "Michael Chen",    email: "mchen@email.com",       status: "active", savedAreas: 12, searches: 67, mostViewed: "Chelsea Manhattan",  lastActive: "1 day ago" },
  { id: "3", name: "Guest User",      email: "",                      status: "guest",  savedAreas: 0,  searches: 8,  mostViewed: "Williamsburg",       lastActive: "3 hours ago" },
  { id: "4", name: "Emily Rodriguez", email: "emily.r@email.com",     status: "active", savedAreas: 15, searches: 92, mostViewed: "Park Slope",         lastActive: "5 hours ago" },
  { id: "5", name: "David Kim",       email: "dkim@email.com",        status: "active", savedAreas: 6,  searches: 34, mostViewed: "Upper West Side",    lastActive: "2 days ago" },
  { id: "6", name: "Guest User",      email: "",                      status: "guest",  savedAreas: 0,  searches: 3,  mostViewed: "Astoria",            lastActive: "1 hour ago" },
  { id: "7", name: "Jessica Martinez",email: "jmartinez@email.com",   status: "active", savedAreas: 10, searches: 58, mostViewed: "Greenwich Village",   lastActive: "4 hours ago" },
  { id: "8", name: "Ryan Thompson",   email: "rthompson@email.com",   status: "active", savedAreas: 4,  searches: 21, mostViewed: "Long Island City",   lastActive: "1 week ago" },
];