/**
 * EXAMPLE USAGE OF AUTH GUARDS
 * 
 * This file demonstrates how to use the authentication guards in your application.
 * DO NOT import this file - it's for reference only.
 */

// ============================================
// EXAMPLE 1: Using HOC (Higher-Order Component)
// ============================================

import withAuthGuard from "@/hooks/withAuthGuard";

// Admin-only page
function AdminDashboard() {
  return <div>Admin Dashboard</div>;
}

export default withAuthGuard(AdminDashboard, {
  allowedRoles: ["admin"],
  requireAuth: true,
});

// ============================================
// EXAMPLE 2: Using Custom Hook
// ============================================

"use client";
import useAuthGuard from "@/hooks/useAuthGuard";

function ProtectedComponent() {
  const { isAuthorized, isChecking, userRole, isAuthenticated } = useAuthGuard({
    allowedRoles: ["admin", "doctor"],
    requireAuth: true,
    redirectOnMount: true,
  });

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Role: {userRole}</p>
      <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
    </div>
  );
}

// ============================================
// EXAMPLE 3: Manual Role Check (No Auto-Redirect)
// ============================================

"use client";
import useAuthGuard from "@/hooks/useAuthGuard";
import { useRouter } from "next/navigation";

function CustomProtectedComponent() {
  const router = useRouter();
  const { isAuthorized, isChecking, userRole } = useAuthGuard({
    allowedRoles: ["admin"],
    requireAuth: true,
    redirectOnMount: false, // Don't auto-redirect
  });

  if (isChecking) {
    return <div>Checking permissions...</div>;
  }

  if (!isAuthorized) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You don't have permission to view this page.</p>
        <button onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return <div>Protected Content</div>;
}

// ============================================
// EXAMPLE 4: Using Utility Functions Directly
// ============================================

"use client";
import { isAuthorized, getUserRole, isAuthenticated } from "@/utils/authUtils";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function UtilityBasedComponent() {
  const router = useRouter();

  useEffect(() => {
    // Check authorization manually
    const authorized = isAuthorized({
      allowedRoles: ["admin"],
      requireAuth: true,
    });

    if (!authorized) {
      router.push("/auth/login");
    }
  }, [router]);

  const userRole = getUserRole();
  const authenticated = isAuthenticated();

  return (
    <div>
      <p>Role: {userRole}</p>
      <p>Authenticated: {authenticated ? "Yes" : "No"}</p>
    </div>
  );
}

// ============================================
// EXAMPLE 5: Page Component with HOC
// ============================================

// src/app/(admin)/admin/settings/page.jsx
"use client";
import withAuthGuard from "@/hooks/withAuthGuard";
import SettingsContent from "./SettingsContent";

// This page is automatically protected - only admins can access
export default withAuthGuard(SettingsContent, {
  allowedRoles: ["admin"],
  requireAuth: true,
  redirectTo: "/auth/login",
});

// ============================================
// EXAMPLE 6: Multiple Roles Allowed
// ============================================

// src/app/(admin)/admin/reports/page.jsx
"use client";
import withAuthGuard from "@/hooks/withAuthGuard";
import ReportsContent from "./ReportsContent";

// Both admin and doctor can access this page
export default withAuthGuard(ReportsContent, {
  allowedRoles: ["admin", "doctor"],
  requireAuth: true,
});

// ============================================
// EXAMPLE 7: Public Route but Require Auth
// ============================================

// src/app/profile/page.jsx
"use client";
import withAuthGuard from "@/hooks/withAuthGuard";
import ProfileContent from "./ProfileContent";

// Any authenticated user can access (no role restriction)
export default withAuthGuard(ProfileContent, {
  allowedRoles: [], // Empty = no role restriction
  requireAuth: true,
});

// ============================================
// NOTES:
// ============================================
// 
// 1. Middleware (src/middleware.js) automatically protects routes:
//    - /admin/* requires "admin" role
//    - /bha/* requires "doctor" role
//    - /bhaa/* requires "assistant" role
//
// 2. HOC is best for simple page-level protection
//
// 3. Hook is best for conditional rendering or custom logic
//
// 4. Utility functions are best for one-off checks
//
// 5. All methods check for:
//    - accessToken cookie (authentication)
//    - userRole cookie/localStorage (authorization)
