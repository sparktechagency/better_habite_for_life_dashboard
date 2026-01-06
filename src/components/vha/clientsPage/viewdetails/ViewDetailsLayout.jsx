import React from "react";
import AssignedTaskList from "./AssignedTaskList";
import BackButton from "@/components/common/backButton/backButton";
import ClientDetailsLayout from "./ClientProfile";

function ViewDetailsLayout() {
  return (
    <div className="space-y-4">
      <BackButton showText={true} text="View Client Details" />
      <ClientDetailsLayout />
      <AssignedTaskList />
    </div>
  );
}

export default ViewDetailsLayout;
