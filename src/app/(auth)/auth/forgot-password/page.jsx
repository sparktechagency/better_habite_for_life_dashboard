import ForgotPassword from "@/components/auth/forgotPassword";
import React from "react";

function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <ForgotPassword />
    </div>
  );
}

export default page;
