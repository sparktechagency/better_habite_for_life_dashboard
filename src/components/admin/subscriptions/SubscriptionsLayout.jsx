import SmallPageInfo from "@/components/common/SmallPageInfo";
import React from "react";
import Subscriptions from "./Subscriptions";

function SubscriptionsLayout() {
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Subscriptions"
        description="create, edit, and manage your subscriptions"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Subscriptions />
      </div>
    </div>
  );
}

export default SubscriptionsLayout;
