import ManagementTable from "@/components/common/managementTable/ManagementTable";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { Button } from "@/components/ui/button";
import React from "react";
import { HiPlus } from "react-icons/hi";

function BhaManagementLayout() {
  const pendingApproval = 10;
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2 items-start justify-between">
        <SmallPageInfo
          title="Bha Management"
          description="Here is an overview of your bha management"
        />
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
          <Button>
            Pending Approval
            <span className="text-lg text-lime-500 p-1 rounded-md">
              ({pendingApproval})
            </span>
          </Button>
          <Button>
            <HiPlus size={15} /> Create Bha Account
          </Button>
        </div>
      </div>
      <SearchFilterButton showAddButton={false} />
      <ManagementTable />
    </div>
  );
}

export default BhaManagementLayout;
