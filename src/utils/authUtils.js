"use client";

import { getCookie, setCookie } from "./cookies";

/**
 * Get the current user's role from cookies or localStorage
 * @returns {string|null} User role or null if not found
 */
export const getUserRole = () => {
  // Try cookies first (for middleware access)
  const roleFromCookie = getCookie("userRole");
  if (roleFromCookie) {
    console.log("Role from cookie:", roleFromCookie);
    return roleFromCookie;
  }

  // Fallback to localStorage (for client-side access)
  if (typeof window !== "undefined") {
    const roleFromStorage = localStorage.getItem("userRole");
    if (roleFromStorage) {
      // Sync to cookies for future middleware access
      setCookie("userRole", roleFromStorage, 7);
      console.log("Role from localStorage:", roleFromStorage);
      return roleFromStorage;
    }
  }

  console.log("No role found");
  return null;
};

/**
 * Set the user role in both cookies and localStorage
 * @param {string} role - User role to set
 * @param {number} days - Cookie expiry in days (default: 7)
 */
export const setUserRole = (role, days = 7) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userRole", role);
  }
  setCookie("userRole", role, days);
};

/**
 * Clear user role from both cookies and localStorage
 */
export const clearUserRole = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userRole");
    // Clear cookie by setting it with past date
    document.cookie = "userRole=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if access token exists
 */
export const isAuthenticated = () => {
  return !!getCookie("accessToken");
};

/**
 * Check if user has one of the allowed roles
 * @param {string[]} allowedRoles - Array of allowed roles
 * @returns {boolean} True if user has one of the allowed roles
 */
export const hasRole = (allowedRoles = []) => {
  if (allowedRoles.length === 0) {
    return true; // No role restriction
  }

  const userRole = getUserRole();
  
  // Treat super_admin the same as admin
  const normalizedUserRole = userRole === "super_admin" ? "admin" : userRole;
  const normalizedAllowedRoles = allowedRoles.map(role => 
    role === "super_admin" ? "admin" : role
  );
  
  // Debug logging
  console.log("hasRole check:", { 
    userRole, 
    normalizedUserRole,
    allowedRoles, 
    normalizedAllowedRoles,
    match: normalizedUserRole && normalizedAllowedRoles.includes(normalizedUserRole) 
  });
  
  return normalizedUserRole && normalizedAllowedRoles.includes(normalizedUserRole);
};

/**
 * Check if user is authorized (authenticated and has required role)
 * @param {Object} options - Authorization options
 * @param {string[]} options.allowedRoles - Array of allowed roles
 * @param {boolean} options.requireAuth - Whether authentication is required
 * @returns {boolean} True if user is authorized
 */
export const isAuthorized = (options = {}) => {
  const { allowedRoles = [], requireAuth = true } = options;

  // Check authentication
  if (requireAuth && !isAuthenticated()) {
    return false;
  }

  // Check role if roles are specified
  if (allowedRoles.length > 0) {
    return hasRole(allowedRoles);
  }

  // If no role restriction and auth is not required, allow access
  return true;
};
