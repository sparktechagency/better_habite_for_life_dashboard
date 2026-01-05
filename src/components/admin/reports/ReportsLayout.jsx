import SmallPageInfo from "@/components/common/SmallPageInfo";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import Reports from "./Reports";
import React from "react";

function ReportsLayout() {
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Reports"
        description="Here is an overview of your reports"
      />
      <SearchFilterButton
        showAddButton={false}
        placeholder="Search Report"
        selectOptions={["Recent", "Oldest"]}
      />
      <Reports />
    </div>
  );
}

export default ReportsLayout;
