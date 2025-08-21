import ResetPassword from "@/components/auth/resetPassword";
import React from "react";

function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <ResetPassword />
    </div>
  );
}

export default page;
