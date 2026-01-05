"use client";
import GetPolicy from "@/components/common/policies/GetPolicy";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import PolicyModal from "./PolicyModal";

function TermsAndContions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Mock policy content - in real app, this would come from API
  const [policyContent, setPolicyContent] = useState(
    "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>"
  );

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSave = async (htmlContent) => {
    // Save the policy content
    console.log("Saving Terms and Conditions:", htmlContent);
    // In real app, make API call here
    // await updatePolicy("Terms and Conditions", htmlContent);
    setPolicyContent(htmlContent);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <SmallPageInfo
          title="Terms and Conditions"
          description="Here is an overview of your terms and conditions"
        />
        <Button className="" onClick={handleEditClick}>
          <FiEdit3 size={15} /> Edit T&C
        </Button>
      </div>
      <GetPolicy getPolicy="Terms and Conditions" />
      <PolicyModal
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        title="Edit Terms and Conditions"
        content={policyContent}
        onSave={handleSave}
      />
    </div>
  );
}

export default TermsAndContions;
