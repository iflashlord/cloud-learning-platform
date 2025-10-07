"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { AdminPageHeader } from "@/components/ui/admin-page-header";
import { 
  Users, 
  UserPlus, 
  Search, 
  MoreHorizontal, 
  Ban, 
  Shield,
  Mail,
  Calendar,
  Activity
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface User {
  id: string;
  userId: string;
  userName: string | null;
  userImageSrc: string;
  activeCourseId: number | null;
  hearts: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  lastActive: Date | null;
  course?: {
    id: number;
    title: string;
  } | null;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !isActive }),
      });
      
      if (response.ok) {
        fetchUsers(); // Refresh the users list
      } else {
        console.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === "all" || 
      (filter === "active" && user.isActive) || 
      (filter === "inactive" && !user.isActive);
    
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  const stats = {
    total: users.length,
    active: users.filter(u => u.isActive).length,
    inactive: users.filter(u => !u.isActive).length,
    newThisMonth: users.filter(u => 
      new Date(u.createdAt).getMonth() === new Date().getMonth()
    ).length,
  };

  const filterOptions = [
    { value: "all", label: "All Users", count: users.length },
    { value: "active", label: "Active", count: stats.active },
    { value: "inactive", label: "Inactive", count: stats.inactive },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <AdminPageHeader
        title="User Management"
        description="Manage platform users and their access"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search users by name or ID..."
        filterOptions={filterOptions}
        activeFilter={filter}
        onFilterChange={(value) => setFilter(value as "all" | "active" | "inactive")}
        showAddButton={false}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive Users</p>
                <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
              </div>
              <Ban className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-2xl font-bold text-purple-600">{stats.newThisMonth}</p>
              </div>
              <UserPlus className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No users found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12">
                      <Image
                        src={user.userImageSrc || "/default-avatar.png"}
                        alt={user.userName || "User"}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">
                          {user.userName || "Anonymous"}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.isActive 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">ID: {user.userId}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Shield className="w-3 h-3 mr-1" />
                          {user.points} points
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          ❤️ {user.hearts} hearts
                        </span>
                        {user.course && (
                          <span className="text-sm text-gray-500 flex items-center">
                            📚 {user.course.title}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                      {user.lastActive && (
                        <p className="text-sm text-gray-500">
                          Last active: {new Date(user.lastActive).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    
                    <Button
                      variant={user.isActive ? "danger" : "default"}
                      size="sm"
                      onClick={() => toggleUserStatus(user.id, user.isActive)}
                    >
                      {user.isActive ? (
                        <>
                          <Ban className="w-4 h-4 mr-2" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Activate
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredUsers.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                showTotal={true}
                totalItems={filteredUsers.length}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}