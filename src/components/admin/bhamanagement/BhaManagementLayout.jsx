"use client";
import ManagementTable from "@/components/common/managementTable/ManagementTable";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { Button } from "@/components/ui/button";
import React, { useState, useCallback } from "react";
import { HiPlus } from "react-icons/hi";
import BhaCreateModal from "./BhaCreateModal";

function BhaManagementLayout() {
  const [openBhaCreateModal, setOpenBhaCreateModal] = useState(false);
  const pendingApproval = 10;

  const handleOpenModal = useCallback(() => {
    setOpenBhaCreateModal(true);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2 items-start justify-between">
        <SmallPageInfo
          title="Bha Management"
          description="Here is an overview of your bha management"
        />
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
          <Button onClick={handleOpenModal}>
            <HiPlus size={15} /> Create Bha Account
          </Button>
        </div>
      </div>
      <SearchFilterButton
        showAddButton={false}
        selectOptions={["All Status", "Active", "Blocked"]}
        placeholder="Search BHA"
      />
      <ManagementTable />
      <BhaCreateModal
        openModal={openBhaCreateModal}
        setOpenModal={setOpenBhaCreateModal}
      />
    </div>
  );
}

export default BhaManagementLayout;
