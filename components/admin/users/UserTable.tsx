import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import { Users } from 'lucide-react';
import { UserRow } from './UserRow';
import type { UserTableProps } from './types';

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  currentPage,
  itemsPerPage,
  onPageChange,
  onToggleUserStatus
}) => {
  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users ({users.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No users found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedUsers.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onToggleStatus={onToggleUserStatus}
              />
            ))}
          </div>
        )}
        
        {users.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showTotal={true}
              totalItems={users.length}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};