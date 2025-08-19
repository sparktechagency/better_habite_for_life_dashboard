import ManagementTable from "@/components/common/managementTable/ManagementTable";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { Button } from "@/components/ui/button";
import React from "react";
import { HiPlus } from "react-icons/hi";

function BhaaManagementLayout() {
  const pendingApproval = 10;
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <SmallPageInfo
          title="Bhaa Management"
          description="Here is an overview of your bhaa management"
        />
        <div className="flex items-center gap-2">
          <Button>
            Pending Approval
            <span className="text-lg text-green-500 p-1 rounded-md">
              ({pendingApproval})
            </span>
          </Button>
          <Button>
            <HiPlus size={15} /> Create Bhaa Account
          </Button>
        </div>
      </div>
      <SearchFilterButton showAddButton={false} />
      <ManagementTable />
    </div>
  );
}

export default BhaaManagementLayout;
