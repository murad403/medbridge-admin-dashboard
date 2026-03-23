"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo/logo.png";
import { LayoutDashboard, Settings, LogOut, User } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useState } from "react";
import LogoutModal from "../modal/LogoutModal";


const navItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "User Management", href: "/user-management", icon: User },
  { title: "Settings", href: "/settings", icon: Settings },
];

const dashboardActivePaths = ["/risk-alerts", "/view-full-history"];


export default function AdminSidebar() {

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
  }>({ open: false });
  const pathname = usePathname();

  const handleLogout = () => {
    setDeleteModal({ open: true });
  };

  return (
    <Sidebar collapsible="icon" className="bg-white">
      <SidebarHeader className="p-0">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 group-data-[collapsible=icon]:px-0">
          <Link href="/" className="flex items-center gap-2.5 min-w-0 group-data-[collapsible=icon]:justify-center">
            <Image src={logo} alt="MedBridge" width={40} height={40} className="shrink-0 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8" />
            <span className="text-lg font-bold text-[#1b3a5c] truncate group-data-[collapsible=icon]:hidden">
              MedBridge
            </span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              const isDashboardContext = dashboardActivePaths.some((path) => pathname.startsWith(path));
              const isActive =
                item.href === "/"
                  ? pathname === "/" || isDashboardContext
                  : pathname.startsWith(item.href);
              return (
                <SidebarMenuItem key={item.href} className="px-3 mt-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                    className={` text-white
                    
                      ${isActive
                        ? "bg-button-color py-3 rounded-[10px] hover:text-white"
                        : "text-title hover:bg-gray-100  py-3"}
                    `}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-6" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              onClick={handleLogout}
              className="text-red-500 bg-red-100 cursor-pointer px-4 rounded-lg transition-colors duration-300 hover:bg-red-50 hover:text-red-600 py-3"
            >
              <LogOut className="size-5" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <LogoutModal open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open })} onConfirm={() => {}} />
    </Sidebar>
  );
}
