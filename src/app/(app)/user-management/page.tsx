"use client";

import { Circle, CircleOff, Funnel, MoreVertical, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import AddUserModal from "@/components/modal/AddUserModal";
import UserActionConfirmModal, {
  UserActionType,
} from "@/components/modal/UserActionConfirmModal";
import UserActionSuccessModal from "@/components/modal/UserActionSuccessModal";
import CustomPagination from "@/components/shared/CustomPagination";
import PageHeader from "@/components/shared/PageHeader";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddUserFormData } from "@/validation/user.validation";
import { Button } from "@/components/ui/button";

type UserRole = "Doctor" | "Patient";
type UserStatus = "Active" | "Suspended";

type UserItem = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
  avatarUrl?: string;
};

const initialUsers: UserItem[] = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    email: "sarah.chen@medbridge.com",
    role: "Doctor",
    status: "Active",
    lastLogin: "Mar 1, 2026 08:23 AM",
  },
  {
    id: 2,
    name: "Dr. Michael Ross",
    email: "michael.ross@medbridge.com",
    role: "Doctor",
    status: "Active",
    lastLogin: "Mar 1, 2026 07:45 AM",
  },
  {
    id: 3,
    name: "Emily Stone",
    email: "emily.stone@email.com",
    role: "Patient",
    status: "Active",
    lastLogin: "Feb 28, 2026 03:12 PM",
  },
  {
    id: 4,
    name: "Admin User",
    email: "admin@medbridge.com",
    role: "Doctor",
    status: "Active",
    lastLogin: "Mar 1, 2026 09:00 AM",
  },
  {
    id: 5,
    name: "Dr. James Wilson",
    email: "james.wilson@medbridge.com",
    role: "Doctor",
    status: "Suspended",
    lastLogin: "Feb 25, 2026 11:30 AM",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    role: "Patient",
    status: "Active",
    lastLogin: "Feb 29, 2026 02:45 PM",
  },
  {
    id: 7,
    name: "Dr. Patricia Moore",
    email: "patricia.moore@medbridge.com",
    role: "Doctor",
    status: "Active",
    lastLogin: "Mar 1, 2026 06:15 AM",
  },
  {
    id: 8,
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    role: "Patient",
    status: "Active",
    lastLogin: "Feb 27, 2026 09:22 AM",
  },
  {
    id: 9,
    name: "Dr. Ava Brown",
    email: "ava.brown@medbridge.com",
    role: "Doctor",
    status: "Active",
    lastLogin: "Feb 26, 2026 11:48 AM",
  },
  {
    id: 10,
    name: "Noah Clark",
    email: "noah.clark@email.com",
    role: "Patient",
    status: "Suspended",
    lastLogin: "Feb 20, 2026 08:11 AM",
  },
];

const PAGE_SIZE = 8;

const UserManagementPage = () => {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuUserId, setOpenMenuUserId] = useState<number | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ userId: number; actionType: UserActionType } | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current) {
        return;
      }

      if (!menuRef.current.contains(event.target as Node)) {
        setOpenMenuUserId(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const roleMatched = roleFilter === "all" || user.role === roleFilter;
      const keyword = searchQuery.trim().toLowerCase();

      if (!keyword) {
        return roleMatched;
      }

      const keywordMatched =
        user.name.toLowerCase().includes(keyword) || user.email.toLowerCase().includes(keyword);

      return roleMatched && keywordMatched;
    });
  }, [roleFilter, searchQuery, users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedUsers = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
    return filteredUsers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredUsers, safeCurrentPage]);

  const handleCreateUser = (data: AddUserFormData & { avatarUrl?: string }) => {
    setUsers((previousUsers) => {
      const nextId = previousUsers.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1;
      const newUser: UserItem = {
        id: nextId,
        name: data.name,
        email: data.email,
        role: data.role,
        status: "Active",
        lastLogin: "Just now",
        avatarUrl: data.avatarUrl,
      };

      return [newUser, ...previousUsers];
    });

    setCurrentPage(1);
    setIsSuccessOpen(true);
  };

  const handleConfirmAction = () => {
    if (!confirmAction) {
      return;
    }

    setUsers((previousUsers) => {
      if (confirmAction.actionType === "delete") {
        return previousUsers.filter((user) => user.id !== confirmAction.userId);
      }

      return previousUsers.map((user) => {
        if (user.id !== confirmAction.userId) {
          return user;
        }

        return {
          ...user,
          status: confirmAction.actionType === "suspend" ? "Suspended" : "Active",
        };
      });
    });

    setConfirmAction(null);
    setOpenMenuUserId(null);
    setIsSuccessOpen(true);
  };

  const handleActionMenuClick = (user: UserItem, actionType: UserActionType) => {
    setConfirmAction({ userId: user.id, actionType });
    setOpenMenuUserId(null);
  };

  return (
    <div className="space-y-6" ref={menuRef}>
      <PageHeader
        title="User Management"
        description="Manage user accounts, roles, and permissions"
      />

      <div className="flex flex-col gap-3 border rounded-[10px] bg-main border-border-color p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-2xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-description" />
          <Input
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search users by name or email..."
            className="h-11.5 bg-[#F8F9FB] pl-10"
          />
        </div>

        <div className="flex w-full gap-3 md:w-auto">
          <div className="relative min-w-42.5 flex-1 md:flex-none">
            <Funnel className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-description" />
            <Select
              value={roleFilter}
              onValueChange={(value) => {
                setRoleFilter(value as "all" | UserRole);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-11 bg-[#F8F9FB] pl-9">
                <SelectValue placeholder="Filter role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Doctor">Doctor</SelectItem>
                <SelectItem value="Patient">Patient</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            onClick={() => setIsAddUserOpen(true)}
            className="flex gap-2 items-center"
          >
            <Plus className="size-4" />
            Add User
          </Button>
        </div>
      </div>
      <section className="rounded-[10px] border border-border-color bg-main">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB]">
              <TableHead className="text-sm font-medium text-title">Name</TableHead>
              <TableHead className="text-sm font-medium text-title">Role</TableHead>
              <TableHead className="text-sm font-medium text-title">Status</TableHead>
              <TableHead className="text-sm font-medium text-title">Last Login</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <TableRow key={user.id} className="relative">
                  <TableCell>
                    <p className="text-base font-medium text-title">{user.name}</p>
                    <p className="mt-0.5 text-sm text-description">{user.email}</p>
                  </TableCell>
                  <TableCell className="text-sm text-description">{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-lg border px-3 py-0.5 text-sm font-medium ${user.status === "Active"
                          ? "border-[#BBF7D0] bg-[#EAF9EE] text-[#16A34A]"
                          : "border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280]"
                        }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-description">{user.lastLogin}</TableCell>

                  <TableCell className="text-right">
                    <button
                      type="button"
                      onClick={() => setOpenMenuUserId(openMenuUserId === user.id ? null : user.id)}
                      className="rounded-md p-1 text-description transition hover:bg-gray-100"
                    >
                      <MoreVertical className="size-4" />
                    </button>

                    {openMenuUserId === user.id && (
                      <div className="absolute right-10 top-1/2 z-30 w-47.5 -translate-y-1/2 rounded-[14px] border border-border-color bg-white p-2 shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
                        <button
                          type="button"
                          onClick={() => handleActionMenuClick(user, "suspend")}
                          className="flex w-full items-center gap-3 rounded-[10px] px-2.5 py-2 text-left text-sm font-medium text-title transition hover:bg-[#F9FAFB]"
                        >
                          <CircleOff className="size-5 text-[#6B7280]" />
                          <span>Suspend</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleActionMenuClick(user, "activate")}
                          className="flex w-full items-center gap-3 rounded-[10px] px-2.5 py-2 text-left text-sm font-medium text-title transition hover:bg-[#F9FAFB]"
                        >
                          <Circle className="size-5 text-[#6B7280]" />
                          <span>Active User</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleActionMenuClick(user, "delete")}
                          className="flex w-full items-center gap-3 rounded-[10px] px-2.5 py-2 text-left text-sm font-medium text-[#FF2D2D] transition hover:bg-[#FFF5F5]"
                        >
                          <Trash2 className="size-5 text-[#9CA3AF]" />
                          <span>Delete User</span>
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-base text-description">
                  No users found for selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <CustomPagination
          currentPage={safeCurrentPage}
          totalItems={filteredUsers.length}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
          itemLabel="users"
        />
      </section>

      <AddUserModal open={isAddUserOpen} onOpenChange={setIsAddUserOpen} onSubmitUser={handleCreateUser} />

      <UserActionConfirmModal
        open={Boolean(confirmAction)}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmAction(null);
          }
        }}
        actionType={confirmAction?.actionType ?? "suspend"}
        onConfirm={handleConfirmAction}
      />

      <UserActionSuccessModal open={isSuccessOpen} onOpenChange={setIsSuccessOpen} />
    </div>
  );
};

export default UserManagementPage;
