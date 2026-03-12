"use client"
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { dummyUsers } from '@/lib/demo'
import { Clock, Eye, MapPin, Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'

const avatarColors = [
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-orange-100 text-orange-600",
    "bg-green-100 text-green-600",
    "bg-pink-100 text-pink-600",
    "bg-teal-100 text-teal-600",
    "bg-yellow-100 text-yellow-700",
    "bg-red-100 text-red-600",
];

const UserManagementTable = () => {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("all users");

    const filteredUsers = useMemo(() => {
        let result = dummyUsers;

        if (search) {
            const query = search.toLowerCase();
            result = result.filter(
                (u) =>
                    u.name.toLowerCase().includes(query) ||
                    u.email.toLowerCase().includes(query) ||
                    u.mostViewed.toLowerCase().includes(query)
            );
        }

        if (activeTab === "active") {
            result = result.filter((u) => u.status === "active");
        } else if (activeTab === "guest") {
            result = result.filter((u) => u.status === "guest");
        }

        return result;
    }, [search, activeTab]);
    return (
        <div>
            <div className="mb-6 flex items-center gap-4 flex-col md:flex-row">

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 py-3"
                    />
                </div>

                <div className="flex items-center gap-2">
                    {
                        ["all users", "active", "guest"].map((tab) => (
                            <button
                                key={tab}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTab === tab
                                    ? "bg-linear-to-r from-button-start via-button-end to-button-start text-white"
                                    : "bg-[#F1F5F9] text-gray-700 hover:bg-[#F1F5F9]/80 capitalize"
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))

                    }
                </div>
            </div>


            <div className="bg-white rounded-xl border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="font-semibold text-description">User</TableHead>
                            <TableHead className="font-semibold text-description">Status</TableHead>
                            <TableHead className="font-semibold text-description">Saved Areas</TableHead>
                            <TableHead className="font-semibold text-description">Searches</TableHead>
                            <TableHead className="font-semibold text-description">Most Viewed</TableHead>
                            <TableHead className="font-semibold text-description text-right">Last Active</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-description">
                                    No users found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user, index) => (
                                <TableRow key={user.id} className="hover:bg-gray-50">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className={`size-9 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 ${avatarColors[index % avatarColors.length]}`}>
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-title text-sm">{user.name}</p>
                                                <p className="text-description text-xs mt-0.5">{user.email || "-"}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {user.status === "active" ? (
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                                        ) : (
                                            <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100">Guest</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-description">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={14} className="text-gray-400" />
                                            {user.savedAreas}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-description">
                                        <div className="flex items-center gap-1.5">
                                            <Eye size={14} className="text-gray-400" />
                                            {user.searches}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-description">{user.mostViewed}</TableCell>
                                    <TableCell className="text-description text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <Clock size={14} className="text-gray-400" />
                                            {user.lastActive}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default UserManagementTable
