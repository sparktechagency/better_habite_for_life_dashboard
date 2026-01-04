"use client";
import ManagementTable from "@/components/common/managementTable/ManagementTable";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { Button } from "@/components/ui/button";
import React, { useState, useCallback } from "react";
import { HiPlus } from "react-icons/hi";
import BhaaCreateModal from "./BhaaCreateModal";
function BhaaManagementLayout() {
  const [openBhaaCreateModal, setOpenBhaaCreateModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpenBhaaCreateModal(true);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <SmallPageInfo
          title="BHAA Management"
          description="Here is an overview of your BHAA management"
        />
        <div className="flex items-center gap-2">
          <Button onClick={handleOpenModal}>
            <HiPlus size={15} /> Create BHAA Account
          </Button>
        </div>
      </div>
      <SearchFilterButton
        showAddButton={false}
        selectOptions={["All Status", "Active", "Blocked"]}
        placeholder="Search BHAA"
      />
      <ManagementTable />
      <BhaaCreateModal
        openModal={openBhaaCreateModal}
        setOpenModal={setOpenBhaaCreateModal}
      />
    </div>
  );
}

export default BhaaManagementLayout;
