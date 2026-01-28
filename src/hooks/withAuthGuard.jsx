"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthorized, isAuthenticated, getUserRole } from "@/utils/authUtils";

/**
 * Higher-Order Component (HOC) for protecting routes with authentication and role-based access control
 * 
 * @param {React.Component} WrappedComponent - The component to protect
 * @param {Object} options - Configuration options
 * @param {string[]} options.allowedRoles - Array of allowed roles (e.g., ['admin', 'doctor', 'assistant'])
 * @param {boolean} options.requireAuth - Whether authentication is required (default: true)
 * @param {string} options.redirectTo - Custom redirect path when unauthorized (default: '/auth/login')
 * @param {React.Component} options.fallback - Custom loading/fallback component
 * @returns {React.Component} Protected component
 * 
 * @example
 * // Protect a component for admin only
 * export default withAuthGuard(MyComponent, {
 *   allowedRoles: ['admin'],
 *   requireAuth: true
 * });
 * 
 * @example
 * // Protect a component for multiple roles
 * export default withAuthGuard(MyComponent, {
 *   allowedRoles: ['admin', 'doctor'],
 *   requireAuth: true
 * });
 * 
 * @example
 * // Public route but require authentication
 * export default withAuthGuard(MyComponent, {
 *   allowedRoles: [],
 *   requireAuth: true
 * });
 */
const withAuthGuard = (
  WrappedComponent,
  options = {}
) => {
  const {
    allowedRoles = [],
    requireAuth = true,
    redirectTo = "/auth/login",
    fallback: FallbackComponent = null,
  } = options;

  return function AuthGuardedComponent(props) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      const checkAuth = () => {
        try {
          // Use utility function to check authorization
          const authorized = isAuthorized({
            allowedRoles,
            requireAuth,
          });

          if (!authorized) {
            // Not authorized, redirect to login
            const loginUrl = new URL(redirectTo, window.location.origin);
            loginUrl.searchParams.set("redirect", pathname);
            router.push(loginUrl.toString());
            return;
          }

          // All checks passed
          setIsAuthorized(true);
        } catch (error) {
          console.error("Auth guard error:", error);
          router.push(redirectTo);
        } finally {
          setIsChecking(false);
        }
      };

      checkAuth();
    }, [router, pathname, requireAuth, allowedRoles, redirectTo]);

    // Show loading/fallback while checking
    if (isChecking) {
      if (FallbackComponent) {
        return <FallbackComponent />;
      }
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    // If not authorized, don't render (redirect is happening)
    if (!isAuthorized) {
      return null;
    }

    // Render the protected component
    return <WrappedComponent {...props} />;
  };
};

export default withAuthGuard;
