import SearchFilterButton from "@/components/common/SearchFilterButton";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { Button } from "@/components/ui/button";
import React from "react";
import { HiPlus } from "react-icons/hi";
import ClientManagementTable from "./ClientManagementTable";

function ClientManagementLayout() {
  const pendingApproval = 10;
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2 items-start justify-between">
        <SmallPageInfo
          title="Client Management"
          description="Here is an overview of your client management"
        />
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
          <Button>
            Pending Approval
            <span className="text-lg text-lime-500 p-1 rounded-md">
              ({pendingApproval})
            </span>
          </Button>
          <Button>
            <HiPlus size={15} /> Create Client Account
          </Button>
        </div>
      </div>
      <SearchFilterButton showAddButton={false} />
      <ClientManagementTable />
    </div>
  );
}

export default ClientManagementLayout;
