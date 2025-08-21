import Login from "@/components/auth/login";
import React from "react";

function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Login />
    </div>
  );
}

export default page;
