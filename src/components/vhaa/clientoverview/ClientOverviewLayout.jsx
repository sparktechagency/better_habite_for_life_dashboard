import SmallPageInfo from "@/components/common/SmallPageInfo";

import React from "react";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import ClientTable from "@/components/common/clientTable/ClientTable";
import { CardSection } from "@/components/common/Card";
import { LuUserRound } from "react-icons/lu";

function ClientOverviewLayout() {
  const clientOverviewStats = [
    {
      title: "Total Clients",
      value: 6,
      icon: <LuUserRound size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
    {
      title: "Avg Completion",
      value: 6,
      icon: <LuUserRound size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
    {
      title: "Active ",
      value: 6,
      icon: <LuUserRound size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
    {
      title: "Flaged",
      value: 6,
      icon: <LuUserRound size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
  ];
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Client Overview"
        description="Here is an overview of your clients"
      />
      <CardSection cards={clientOverviewStats} footer={false} />
      <SearchFilterButton
        showAddButton={false}
        selectOptions={["All Status", "Active", "Inactive"]}
        placeholder="Search Client"
      />
      <ClientTable />
    </div>
  );
}

export default ClientOverviewLayout;
