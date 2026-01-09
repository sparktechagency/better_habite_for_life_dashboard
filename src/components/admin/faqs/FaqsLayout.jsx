"use client";

import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { FiEdit3 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { FcFaq } from "react-icons/fc";
import {
  useGetFaqDataQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from "@/redux/Apis/faqApi/faqApi";
import useToast from "@/hooks/useToast";

function FaqsLayout() {
  const toast = useToast();
  const { data: faqResponse, isLoading, error } = useGetFaqDataQuery({});
  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const [isEditMode, setIsEditMode] = useState(false);
  const [openSections, setOpenSections] = useState(new Set());
  const [sections, setSections] = useState([]);
  const [newSections, setNewSections] = useState([]); // Track newly added sections
  const [modifiedSections, setModifiedSections] = useState(new Set()); // Track modified sections

  // Sync sections with API data
  useEffect(() => {
    if (faqResponse?.data) {
      const apiSections = faqResponse.data.map((faq) => ({
        id: faq._id,
        title: faq.question || faq.title || "",
        content: faq.answer || faq.content || "",
        isNew: false,
      }));
      setSections(apiSections);
      // Open first section by default
      if (apiSections.length > 0) {
        setOpenSections(new Set([apiSections[0].id]));
      }
    }
  }, [faqResponse]);

  const toggleSection = (id) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(id)) {
      newOpenSections.delete(id);
    } else {
      newOpenSections.add(id);
    }
    setOpenSections(newOpenSections);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setNewSections([]);
    setModifiedSections(new Set());
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset to original data
    if (faqResponse?.data) {
      const apiSections = faqResponse.data.map((faq) => ({
        id: faq._id,
        title: faq.question || faq.title || "",
        content: faq.answer || faq.content || "",
        isNew: false,
      }));
      setSections(apiSections);
    }
    setNewSections([]);
    setModifiedSections(new Set());
  };

  const handleSave = async () => {
    try {
      // Create new sections
      for (const section of sections.filter((s) => s.isNew)) {
        await createFaq({
          question: section.title,
          answer: section.content,
        }).unwrap();
      }

      // Update modified existing sections
      for (const id of modifiedSections) {
        const section = sections.find((s) => s.id === id && !s.isNew);
        if (section) {
          await updateFaq({
            id: section.id,
            data: {
              question: section.title,
              answer: section.content,
            },
          }).unwrap();
        }
      }

      toast.success("FAQs saved successfully");
      setIsEditMode(false);
      setNewSections([]);
      setModifiedSections(new Set());
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.message || "Failed to save FAQs";
      toast.error(errorMessage);
    }
  };

  const handleTitleChange = (id, newTitle) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, title: newTitle } : section
      )
    );
    // Track modification for existing sections
    const section = sections.find((s) => s.id === id);
    if (section && !section.isNew) {
      setModifiedSections((prev) => new Set([...prev, id]));
    }
  };

  const handleContentChange = (id, newContent) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, content: newContent } : section
      )
    );
    // Track modification for existing sections
    const section = sections.find((s) => s.id === id);
    if (section && !section.isNew) {
      setModifiedSections((prev) => new Set([...prev, id]));
    }
  };

  const handleAddNewSection = () => {
    const newId = `new-${Date.now()}`;
    const newSection = {
      id: newId,
      title: "New FAQ Question",
      content: "Enter your answer here...",
      isNew: true,
    };
    setSections((prevSections) => [...prevSections, newSection]);
    setNewSections((prev) => [...prev, newId]);
    // Auto-open the new section
    setOpenSections((prev) => new Set([...prev, newId]));
  };

  const handleDeleteSection = async (id) => {
    const section = sections.find((s) => s.id === id);

    // If it's an existing section (not new), delete from API immediately
    if (section && !section.isNew) {
      try {
        const response = await deleteFaq({ id }).unwrap();
        if (response?.success) {
          toast.success(response.message || "FAQ deleted successfully");
        }
      } catch (error) {
        const errorMessage =
          error?.data?.message || error?.message || "Failed to delete FAQ";
        toast.error(errorMessage);
        return; // Don't remove from UI if API delete failed
      }
    }

    // Remove from local state
    setSections((prevSections) =>
      prevSections.filter((section) => section.id !== id)
    );
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });

    // Remove from new sections if it was new
    setNewSections((prev) => prev.filter((newId) => newId !== id));
  };

  const isSaving = isCreating || isUpdating || isDeleting;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading FAQs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-red-500">Failed to load FAQs</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SmallPageInfo
          title="Faqs"
          icon={<FcFaq />}
          description="Here is an overview of your faqs"
        />
        <div className="flex items-center gap-2">
          {isEditMode && (
            <Button
              onClick={handleAddNewSection}
              className="bg-black hover:bg-black/80 text-white"
              disabled={isSaving}
            >
              <Plus size={16} />
              Add FAQ
            </Button>
          )}
          {isEditMode ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-black hover:bg-black/80 text-white"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={handleEditClick}
              className="hover:bg-white hover:text-red-400"
            >
              <FiEdit3 size={15} />
            </Button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {sections.length === 0 && !isEditMode && (
        <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-white">
          <FcFaq className="text-6xl mb-4" />
          <p className="text-gray-500 mb-4">No FAQs found</p>
          <Button onClick={handleEditClick}>
            <Plus size={16} className="mr-2" />
            Add Your First FAQ
          </Button>
        </div>
      )}

      {/* Accordion Sections */}
      {(sections.length > 0 || isEditMode) && (
        <div className="border rounded-lg bg-white">
          {sections.map((section, index) => {
            const isOpen = openSections.has(section.id);
            const isLast = index === sections.length - 1;

            return (
              <div
                key={section.id}
                className={`border-b ${isLast ? "border-b-0" : ""}`}
              >
                {/* Accordion Header */}
                <div className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  {isEditMode ? (
                    <Input
                      value={section.title}
                      onChange={(e) =>
                        handleTitleChange(section.id, e.target.value)
                      }
                      className="flex-1 mr-4 font-semibold text-gray-900 border-gray-300"
                      onClick={(e) => e.stopPropagation()}
                      placeholder="Enter FAQ question..."
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex-1 text-left"
                    >
                      <h3 className="text-base font-semibold text-gray-900">
                        {section.title}
                      </h3>
                    </button>
                  )}
                  <div className="flex items-center gap-2">
                    {isEditMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            window.confirm(
                              "Are you sure you want to delete this FAQ?"
                            )
                          ) {
                            handleDeleteSection(section.id);
                          }
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete FAQ"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex-shrink-0"
                    >
                      <ChevronDown
                        className={`h-5 w-5 text-gray-600 transition-transform ${
                          isOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-4 pb-4">
                    <Textarea
                      value={section.content}
                      readOnly={!isEditMode}
                      onChange={(e) =>
                        handleContentChange(section.id, e.target.value)
                      }
                      className={`min-h-[120px] resize-none ${
                        isEditMode
                          ? "bg-white border-gray-300 text-gray-900"
                          : "bg-gray-50 border-gray-200 text-gray-900"
                      }`}
                      placeholder="Enter FAQ answer..."
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FaqsLayout;
