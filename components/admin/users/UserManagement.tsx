import React from 'react';
import { AdminPageHeader } from '@/components/ui/admin-page-header';
import { UserStatsCards } from './UserStatsCards';
import { UserTable } from './UserTable';
import { useUserManagement } from './useUserManagement';

export const UserManagement: React.FC = () => {
  const {
    users,
    loading,
    searchTerm,
    filter,
    currentPage,
    setSearchTerm,
    setFilter,
    setCurrentPage,
    filteredUsers,
    stats,
    toggleUserStatus,
  } = useUserManagement();

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

      <UserStatsCards stats={stats} />

      <UserTable
        users={filteredUsers}
        loading={loading}
        currentPage={currentPage}
        itemsPerPage={10}
        onPageChange={setCurrentPage}
        onToggleUserStatus={toggleUserStatus}
      />
    </div>
  );
};