"use client";
import GetPolicy from "@/components/common/policies/GetPolicy";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import PolicyModal from "./PolicyModal";

function PrivacyPolicy() {
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
    console.log("Saving Privacy Policy:", htmlContent);
    // In real app, make API call here
    // await updatePolicy("Privacy Policy", htmlContent);
    setPolicyContent(htmlContent);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <SmallPageInfo
          title="Privacy Policy"
          description="Here is an overview of your privacy policy"
        />
        <Button className="" onClick={handleEditClick}>
          <FiEdit3 size={15} /> Edit Privacy Policy
        </Button>
      </div>
      <GetPolicy getPolicy="Privacy Policy" />
      <PolicyModal
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        title="Edit Privacy Policy"
        content={policyContent}
        onSave={handleSave}
      />
    </div>
  );
}

export default PrivacyPolicy;
