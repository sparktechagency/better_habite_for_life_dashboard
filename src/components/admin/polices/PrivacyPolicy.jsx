import GetPolicy from "@/components/common/policies/GetPolicy";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { Button } from "@/components/ui/button";
import React from "react";
import { FiEdit3 } from "react-icons/fi";

function PrivacyPolicy() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <SmallPageInfo
          title="Privacy Policy"
          description="Here is an overview of your privacy policy"
        />
        <Button className="">
          <FiEdit3 size={15} /> Edit Privacy Policy
        </Button>
      </div>
      <GetPolicy getPolicy="Privacy Policy" />
    </div>
  );
}

export default PrivacyPolicy;
