import SearchFilterButton from "@/components/common/SearchFilterButton";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { ClientTable } from "@/components/common/clientTable/ClientTable";
import React from "react";

function ClientPgaeLayout() {
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Client Management"
        description="Here is an overview of your clients"
      />
      <SearchFilterButton />
      <ClientTable />
    </div>
  );
}

export default ClientPgaeLayout;
