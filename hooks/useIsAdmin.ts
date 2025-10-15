/**
 * Client-side hook for checking admin status
 */

"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const useIsAdmin = () => {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isLoaded) return;
      
      if (!user) {
        setIsAdmin(false);
        setIsChecking(false);
        return;
      }

      try {
        // Call our API to check admin status
        const response = await fetch('/api/admin/check');
        if (response.ok) {
          const { isAdmin: adminStatus } = await response.json();
          setIsAdmin(adminStatus);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Failed to check admin status:', error);
        setIsAdmin(false);
      }
      
      setIsChecking(false);
    };

    checkAdminStatus();
  }, [user, isLoaded]);

  return { isAdmin, isChecking, isLoggedIn: !!user };
};