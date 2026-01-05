"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { FiEdit3 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { FcFaq } from "react-icons/fc";
function FaqsLayout() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [openSections, setOpenSections] = useState(
    new Set(["what-we-collect"])
  );

  const initialSections = [
    {
      id: "what-we-collect",
      title: "What We Collect",
      content:
        "Pass It Along was created by philanthropists who wanted to make giving more personal and meaningful. We collect information that you provide directly to us, such as when you create an account, make a donation, or contact us for support. This may include your name, email address, phone number, payment information, and any other information you choose to provide.",
    },
    {
      id: "how-we-use-it",
      title: "How We Use It",
      content:
        "We use the information we collect to provide, maintain, and improve our services. This includes processing your donations, communicating with you about your account and our services, sending you updates about causes you support, and responding to your inquiries. We may also use your information to detect, prevent, and address technical issues and to protect the rights, property, or safety of Pass It Along, our users, or others.",
    },
    {
      id: "your-anonymity",
      title: "Your Anonymity",
      content:
        "We respect your privacy and understand that some donors prefer to remain anonymous. You can choose to make anonymous donations, and we will not disclose your identity to the recipient organization or other users. However, we may still collect and use your information internally as described in this policy to process your donation and comply with legal requirements.",
    },
    {
      id: "who-sees-your-info",
      title: "Who Sees Your Info",
      content:
        "We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our platform, processing payments, or conducting our business, as long as they agree to keep your information confidential. We may also disclose your information if required by law or to protect our rights and the safety of our users.",
    },
    {
      id: "security",
      title: "Security",
      content:
        "We take the security of your information seriously and use industry-standard security measures to protect your data. This includes encryption of sensitive information, secure payment processing, and regular security audits. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      id: "your-choices",
      title: "Your Choices",
      content:
        "You have the right to access, update, or delete your personal information at any time. You can also opt out of receiving marketing communications from us by following the unsubscribe instructions in our emails or by contacting us directly. You can manage your privacy settings in your account dashboard to control what information is visible to others.",
    },
  ];

  const [sections, setSections] = useState(initialSections);

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
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the data
    console.log("Saving privacy policy content:", sections);
    setIsEditMode(false);
    // In a real app, you would save to your backend here
  };

  const handleTitleChange = (id, newTitle) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, title: newTitle } : section
      )
    );
  };

  const handleContentChange = (id, newContent) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, content: newContent } : section
      )
    );
  };

  const handleAddNewSection = () => {
    const newId = `faq-${Date.now()}`;
    const newSection = {
      id: newId,
      title: "New FAQ Section",
      content: "Enter your content here...",
    };
    setSections((prevSections) => [...prevSections, newSection]);
    // Auto-open the new section
    setOpenSections((prev) => new Set([...prev, newId]));
  };

  const handleDeleteSection = (id) => {
    setSections((prevSections) =>
      prevSections.filter((section) => section.id !== id)
    );
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

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
              // variant="outline"
              className="bg-black hover:bg-black/80 text-white"
            >
              <Plus size={16} />
              Add FAQ
            </Button>
          )}
          {isEditMode ? (
            <Button
              onClick={handleSave}
              className="bg-black hover:bg-black/80 text-white"
            >
              Save
            </Button>
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

      {/* Accordion Sections */}
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
                            "Are you sure you want to delete this FAQ section?"
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
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FaqsLayout;
