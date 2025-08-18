import SearchFilterButton from "@/components/common/SearchFilterButton";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import Reports from "./Reports";
import React from "react";

function ReportLayout() {
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Reports"
        description="Here is an overview of your reports"
      />
      <SearchFilterButton showAddButton={false} />
      <Reports />
    </div>
  );
}

export default ReportLayout;
