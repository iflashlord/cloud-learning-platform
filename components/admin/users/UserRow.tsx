import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  Shield,
  Heart,
  BookOpen,
  Ban
} from 'lucide-react';
import type { UserRowProps } from './types';

export const UserRow: React.FC<UserRowProps> = ({ user, onToggleStatus }) => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
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
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {user.userName || "Anonymous"}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              user.isActive 
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            }`}>
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">ID: {user.userId}</p>
          <div className="flex items-center space-x-4 mt-1">
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              {user.points} points
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Heart className="w-3 h-3 mr-1" fill="currentColor" />
              {user.hearts} hearts
            </span>
            {user.course && (
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <BookOpen className="w-3 h-3 mr-1" />
                {user.course.title}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
          {user.lastActive && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last active: {new Date(user.lastActive).toLocaleDateString()}
            </p>
          )}
        </div>
        
        <Button
          variant={user.isActive ? "danger" : "primary"}
          size="sm"
          onClick={() => onToggleStatus(user.id, user.isActive)}
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
  );
};