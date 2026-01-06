import SearchFilterButton from "@/components/common/SearchFilterButton";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { ClientTaskTable } from "./ClientTaskTable";
import React from "react";

function ClientPgaeLayout() {
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Client Management"
        description="Here is an overview of your clients"
      />
      <SearchFilterButton
        showAddButton={false}
        selectOptions={["All Status", "Active", "Inactive"]}
        placeholder="Search Client"
      />
      <ClientTaskTable />
    </div>
  );
}

export default ClientPgaeLayout;
