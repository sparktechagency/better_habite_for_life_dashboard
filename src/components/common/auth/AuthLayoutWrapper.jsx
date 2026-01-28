"use client";

import useAuthGuard from "@/hooks/useAuthGuard";

/**
 * Client-side wrapper component for protecting layouts
 * Use this to wrap layout content that needs auth checks
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string[]} [props.allowedRoles=[]] - Array of allowed roles
 * @param {boolean} [props.requireAuth=true] - Whether authentication is required
 * @param {boolean} [props.redirectOnMount=true] - Whether to redirect on mount if unauthorized
 * @param {React.ReactNode} [props.fallback=null] - Custom loading/fallback component
 */
export default function AuthLayoutWrapper({
  children,
  allowedRoles = [],
  requireAuth = true,
  redirectOnMount = true,
  fallback = null,
}) {
  const { isAuthorized, isChecking } = useAuthGuard({
    allowedRoles,
    requireAuth,
    redirectOnMount,
  });

  // Show loading state
  if (isChecking) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If not authorized and redirectOnMount is false, show unauthorized message
  if (!isAuthorized && !redirectOnMount) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  // If not authorized and redirectOnMount is true, redirect is happening
  if (!isAuthorized) {
    return null;
  }

  // Authorized - render children
  return <>{children}</>;
}
