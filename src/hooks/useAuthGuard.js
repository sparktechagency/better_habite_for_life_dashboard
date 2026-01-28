"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthorized as checkIsAuthorized, isAuthenticated as checkIsAuthenticated, getUserRole } from "@/utils/authUtils";

/**
 * Custom hook for authentication and role-based access control
 * 
 * @param {Object} options - Configuration options
 * @param {string[]} options.allowedRoles - Array of allowed roles (e.g., ['admin', 'doctor', 'assistant'])
 * @param {boolean} options.requireAuth - Whether authentication is required (default: true)
 * @param {string} options.redirectTo - Custom redirect path when unauthorized (default: '/auth/login')
 * @param {boolean} options.redirectOnMount - Whether to redirect immediately on mount (default: true)
 * @returns {Object} { isAuthorized, isChecking, userRole, isAuthenticated }
 * 
 * @example
 * // In a component
 * const { isAuthorized, isChecking, userRole } = useAuthGuard({
 *   allowedRoles: ['admin'],
 *   requireAuth: true
 * });
 * 
 * if (isChecking) return <Loading />;
 * if (!isAuthorized) return <Unauthorized />;
 * 
 * return <ProtectedContent />;
 */
const useAuthGuard = (options = {}) => {
  const {
    allowedRoles = [],
    requireAuth = true,
    redirectTo = "/auth/login",
    redirectOnMount = true,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [userRole, setUserRoleState] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check authentication status
        const authenticated = checkIsAuthenticated();
        setIsAuthenticated(authenticated);

        // Get user role
        const role = getUserRole();
        setUserRoleState(role);

        // Debug logging
        console.log("Auth Guard Check:", {
          authenticated,
          role,
          allowedRoles,
          requireAuth,
        });

        // Check authorization
        const authorized = checkIsAuthorized({
          allowedRoles,
          requireAuth,
        });

        console.log("Authorization result:", authorized);
        setIsAuthorized(authorized);

        // Redirect if not authorized and redirectOnMount is true
        if (!authorized && redirectOnMount) {
          const loginUrl = new URL(redirectTo, window.location.origin);
          if (!authenticated) {
            loginUrl.searchParams.set("redirect", pathname);
          } else {
            loginUrl.searchParams.set("error", "unauthorized");
            loginUrl.searchParams.set("redirect", pathname);
          }
          router.push(loginUrl.toString());
        }
      } catch (error) {
        console.error("Auth guard error:", error);
        setIsAuthorized(false);
        setIsAuthenticated(false);
        
        if (redirectOnMount) {
          router.push(redirectTo);
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router, pathname, requireAuth, allowedRoles, redirectTo, redirectOnMount]);

  return {
    isAuthorized,
    isChecking,
    userRole,
    isAuthenticated,
  };
};

export default useAuthGuard;
