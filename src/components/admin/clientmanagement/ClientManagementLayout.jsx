import SearchFilterButton from "@/components/common/SearchFilterButton";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { Button } from "@/components/ui/button";
import React from "react";
import { HiPlus } from "react-icons/hi";
import ClientManagementTable from "./ClientManagementTable";

function ClientManagementLayout() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2 items-start justify-between">
        <SmallPageInfo
          title="User Management"
          description="Here is an overview of your user management"
        />
      </div>
      <SearchFilterButton
        showAddButton={false}
        selectOptions={["All Status", "Active", "Inactive"]}
        placeholder="Search User"
      />
      <ClientManagementTable />
    </div>
  );
}

export default ClientManagementLayout;
