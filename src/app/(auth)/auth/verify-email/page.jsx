import VerifyEmail from "@/components/auth/verifyEmail";
import React from "react";

function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <VerifyEmail />
    </div>
  );
}

export default page;
