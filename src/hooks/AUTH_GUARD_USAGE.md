# Authentication Guard Usage Guide

This project provides three ways to protect routes and components with authentication and role-based access control:

1. **Next.js Middleware** (`src/middleware.js`) - Route-level protection (runs on the edge)
2. **Higher-Order Component (HOC)** (`src/hooks/withAuthGuard.jsx`) - Component-level protection
3. **Custom Hook** (`src/hooks/useAuthGuard.js`) - Manual protection in components

## 1. Next.js Middleware (Recommended for Route Protection)

The middleware automatically protects routes based on their path prefix:
- `/admin/*` - Requires `admin` role
- `/bha/*` - Requires `doctor` role
- `/bhaa/*` - Requires `assistant` role

**How it works:**
- Runs on the edge before the page loads
- Checks for `accessToken` cookie
- Checks for `userRole` cookie
- Redirects unauthorized users to `/auth/login`
- Public routes (like `/auth/login`) are excluded

**No code needed** - it works automatically for all routes matching the patterns!

## 2. Higher-Order Component (HOC)

Wrap your page components with `withAuthGuard` to protect them:

### Example 1: Admin-only page

```jsx
// src/app/(admin)/admin/settings/page.jsx
"use client";
import withAuthGuard from "@/hooks/withAuthGuard";
import SettingsPage from "./SettingsContent";

// Protect the component - only admins can access
export default withAuthGuard(SettingsPage, {
  allowedRoles: ["admin"],
  requireAuth: true,
});
```

### Example 2: Multiple roles allowed

```jsx
// src/app/(admin)/admin/reports/page.jsx
"use client";
import withAuthGuard from "@/hooks/withAuthGuard";
import ReportsPage from "./ReportsContent";

// Allow both admin and doctor roles
export default withAuthGuard(ReportsPage, {
  allowedRoles: ["admin", "doctor"],
  requireAuth: true,
});
```

### Example 3: Custom redirect and fallback

```jsx
// src/app/(admin)/admin/dashboard/page.jsx
"use client";
import withAuthGuard from "@/hooks/withAuthGuard";
import DashboardPage from "./DashboardContent";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export default withAuthGuard(DashboardPage, {
  allowedRoles: ["admin"],
  requireAuth: true,
  redirectTo: "/auth/login",
  fallback: LoadingSpinner,
});
```

### Example 4: Public route but require authentication

```jsx
// src/app/profile/page.jsx
"use client";
import withAuthGuard from "@/hooks/withAuthGuard";
import ProfilePage from "./ProfileContent";

// Any authenticated user can access (no role restriction)
export default withAuthGuard(ProfilePage, {
  allowedRoles: [], // Empty array = no role restriction
  requireAuth: true,
});
```

## 3. Custom Hook

Use `useAuthGuard` hook for more control in your components:

### Example 1: Conditional rendering

```jsx
// src/components/admin/Dashboard.jsx
"use client";
import useAuthGuard from "@/hooks/useAuthGuard";
import { useEffect } from "react";

export default function Dashboard() {
  const { isAuthorized, isChecking, userRole, isAuthenticated } = useAuthGuard({
    allowedRoles: ["admin"],
    requireAuth: true,
    redirectOnMount: true, // Automatically redirect if unauthorized
  });

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {userRole}!</p>
    </div>
  );
}
```

### Example 2: Manual redirect control

```jsx
// src/components/admin/Settings.jsx
"use client";
import useAuthGuard from "@/hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Settings() {
  const router = useRouter();
  const { isAuthorized, isChecking, userRole } = useAuthGuard({
    allowedRoles: ["admin"],
    requireAuth: true,
    redirectOnMount: false, // Don't auto-redirect
  });

  useEffect(() => {
    if (!isChecking && !isAuthorized) {
      // Custom redirect logic
      router.push("/unauthorized");
    }
  }, [isAuthorized, isChecking, router]);

  if (isChecking) {
    return <div>Checking permissions...</div>;
  }

  if (!isAuthorized) {
    return null; // Or show unauthorized message
  }

  return <div>Settings Page</div>;
}
```

## Configuration Options

### `withAuthGuard` Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `allowedRoles` | `string[]` | `[]` | Array of allowed roles (e.g., `['admin', 'doctor']`) |
| `requireAuth` | `boolean` | `true` | Whether authentication is required |
| `redirectTo` | `string` | `'/auth/login'` | Redirect path when unauthorized |
| `fallback` | `React.Component` | `null` | Custom loading component |

### `useAuthGuard` Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `allowedRoles` | `string[]` | `[]` | Array of allowed roles |
| `requireAuth` | `boolean` | `true` | Whether authentication is required |
| `redirectTo` | `string` | `'/auth/login'` | Redirect path when unauthorized |
| `redirectOnMount` | `boolean` | `true` | Whether to redirect immediately on mount |

### Return Values (useAuthGuard)

| Property | Type | Description |
|----------|------|-------------|
| `isAuthorized` | `boolean` | Whether user has required role |
| `isChecking` | `boolean` | Whether auth check is in progress |
| `userRole` | `string \| null` | Current user's role |
| `isAuthenticated` | `boolean` | Whether user is authenticated |

## Role Mapping

The application uses the following role mappings:
- `admin` - Administrator role
- `doctor` - BHA (Behavioral Health Assistant) role
- `assistant` - BHAA (Behavioral Health Assistant Assistant) role

## Best Practices

1. **Use Middleware for Route Protection**: The Next.js middleware is the most efficient way to protect routes as it runs on the edge before the page loads.

2. **Use HOC for Page Components**: Wrap page components with `withAuthGuard` for simple, declarative protection.

3. **Use Hook for Complex Logic**: Use `useAuthGuard` hook when you need conditional rendering or custom redirect logic.

4. **Combine Approaches**: You can use middleware for route-level protection and HOC/hook for component-level fine-grained control.

## Troubleshooting

### Issue: User is redirected even when authenticated

**Solution**: Make sure the `userRole` cookie is set during login. Check `src/components/auth/login.jsx` to ensure it sets both localStorage and cookies.

### Issue: Middleware not working

**Solution**: 
1. Ensure `src/middleware.js` is in the root of your `src` directory
2. Check that the route matches the `matcher` pattern in the middleware config
3. Verify cookies are being set correctly

### Issue: Role check not working

**Solution**: 
1. Verify the role value matches exactly (case-sensitive)
2. Check that `localStorage.getItem("userRole")` returns the correct value
3. Ensure the role is set in cookies for middleware access
