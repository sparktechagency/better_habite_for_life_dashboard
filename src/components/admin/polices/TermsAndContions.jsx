import GetPolicy from "@/components/common/policies/GetPolicy";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { Button } from "@/components/ui/button";
import React from "react";
import { FiEdit3 } from "react-icons/fi";

function TermsAndContions() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <SmallPageInfo
          title="Terms and Conditions"
          description="Here is an overview of your terms and conditions"
        />
        <Button className="">
          <FiEdit3 size={15} /> Edit T&C
        </Button>
      </div>
      <GetPolicy getPolicy="Terms and Conditions" />
    </div>
  );
}

export default TermsAndContions;
