"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import UserRoleDialog from "@/components/common/userRoleDialog/UserRoleDialog";
import { setUserRole } from "@/redux/features/role/userRole";

function Page() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // Show dialog on page load
    setDialogOpen(true);
  }, []);

  const handleRoleSelect = (role) => {
    // Save role to Redux
    dispatch(setUserRole(role));

    // Close the dialog
    setDialogOpen(false);

    // Navigate to the appropriate dashboard based on role
    if (role === "admin") {
      router.push("/admin/dashboard");
    } else if (role === "bha") {
      router.push("/bha/dashboard");
    } else if (role === "bhaa") {
      router.push("/bhaa/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <UserRoleDialog open={dialogOpen} onRoleSelect={handleRoleSelect} />
    </div>
  );
}

export default Page;
