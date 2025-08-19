import BhaaManagementLayout from "@/components/admin/bhaamanagement/BhaaManagementLayout";
import ClientManagementLayout from "@/components/admin/clientmanagement/ClientManagementLayout";
import React from "react";

function page() {
  return (
    <div className="p-4">
      <ClientManagementLayout />
    </div>
  );
}

export default page;
