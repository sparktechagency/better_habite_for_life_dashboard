"use client";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import PolicyModal from "./PolicyModal";
import {
  useGetTermsAndConditionsQuery,
  useUpdatePolicyMutation,
} from "@/redux/Apis/policyApi/policyApi";
import useToast from "@/hooks/useToast";

function TermsAndContions() {
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [policyContent, setPolicyContent] = useState("");

  const {
    data: policyResponse,
    isLoading,
    error,
  } = useGetTermsAndConditionsQuery();
  const [updatePolicy, { isLoading: isUpdating }] = useUpdatePolicyMutation();

  // Sync policy content with API data
  useEffect(() => {
    if (policyResponse?.data?.termsOfService) {
      setPolicyContent(policyResponse.data.termsOfService);
    }
  }, [policyResponse]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSave = async (htmlContent) => {
    try {
      const response = await updatePolicy({
        termsOfService: htmlContent,
      }).unwrap();

      if (response?.success) {
        toast.success(
          response.message || "Terms and Conditions updated successfully"
        );
        setPolicyContent(htmlContent);
        setIsModalOpen(false);
      } else {
        toast.error(
          response?.message || "Failed to update Terms and Conditions"
        );
      }
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to update Terms and Conditions";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading Terms and Conditions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-red-500">Failed to load Terms and Conditions</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <SmallPageInfo
          title="Terms and Conditions"
          description="Here is an overview of your terms and conditions"
        />
        <Button onClick={handleEditClick}>
          <FiEdit3 size={15} /> Edit T&C
        </Button>
      </div>

      {/* Policy Content Display */}
      <div className="space-y-4 border bg-white p-4 rounded-lg min-h-[700px]">
        <h1 className="text-2xl font-bold">Terms and Conditions</h1>
        {policyContent ? (
          <div
            className="text-base text-gray-700 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: policyContent }}
          />
        ) : (
          <p className="text-base text-gray-500">
            No terms and conditions content available.
          </p>
        )}
      </div>

      <PolicyModal
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        title="Edit Terms and Conditions"
        content={policyContent}
        onSave={handleSave}
        isLoading={isUpdating}
      />
    </div>
  );
}

export default TermsAndContions;
