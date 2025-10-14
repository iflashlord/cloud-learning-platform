export interface User {
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

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  newThisMonth: number;
}

export interface UserStatsProps {
  stats: UserStats;
}

export interface UserTableProps {
  users: User[];
  loading: boolean;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onToggleUserStatus: (userId: string, isActive: boolean) => void;
}

export interface UserRowProps {
  user: User;
  onToggleStatus: (userId: string, isActive: boolean) => void;
}

export interface UseUserManagementReturn {
  users: User[];
  loading: boolean;
  searchTerm: string;
  filter: "all" | "active" | "inactive";
  currentPage: number;
  setSearchTerm: (term: string) => void;
  setFilter: (filter: "all" | "active" | "inactive") => void;
  setCurrentPage: (page: number) => void;
  filteredUsers: User[];
  stats: UserStats;
  toggleUserStatus: (userId: string, isActive: boolean) => Promise<void>;
}