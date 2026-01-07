"use client";
import SmallPageInfo from "@/components/common/SmallPageInfo";

import React from "react";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import ClientTable from "@/components/common/clientTable/ClientTable";
import { formatContactInfo } from "../dashboard/ClinetStatusOverview";
function ClientOverviewLayout() {
  const tableData = [
    {
      clientName: "John Doe",
      clientEmail: "john.doe@example.com",
      contactInfo: "01717171717",
      address: "Dhaka, Bangladesh",
      status: "Active",
      joinedOn: "2025-05-12",
    },
    {
      clientName: "John Doe",
      clientEmail: "john.doe@example.com",
      contactInfo: "01717171717",
      address: "Dhaka, Bangladesh",
      status: "Active",
      joinedOn: "2025-05-12",
    },
    {
      clientName: "John Doe",
      clientEmail: "john.doe@example.com",
      contactInfo: "01717171717",
      address: "Dhaka, Bangladesh",
      status: "Inactive",
      joinedOn: "2025-05-12",
    },
    {
      clientName: "John Doe",
      clientEmail: "john.doe@example.com",
      contactInfo: "01717171717",
      address: "Dhaka, Bangladesh",
      status: "Inactive",
      joinedOn: "2025-05-12",
    },
  ];
  const formattedTableData = tableData.map((data) => ({
    ...data,
    contactInfo: formatContactInfo(data.contactInfo, data.address),
  }));
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Client Overview"
        description="Here is an overview of your clients"
      />
      {/* <CardSection cards={clientOverviewStats} footer={false} /> */}
      <SearchFilterButton
        showAddButton={false}
        selectOptions={["All Status", "Active", "Inactive"]}
        placeholder="Search Client"
      />
      <ClientTable tableData={formattedTableData} />
    </div>
  );
}

export default ClientOverviewLayout;
