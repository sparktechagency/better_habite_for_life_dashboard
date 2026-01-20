"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import predefinedMessagesData from "./predefinemessage.json";

const PredefinedMessageModal = ({
  open,
  onOpenChange,
  onSelectMessage,
  taskName = "task",
}) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  // Replace {{taskName}} placeholder with actual task name or default
  const formatMessage = (question) => {
    let message = question.text.replace(/\{\{taskName\}\}/g, taskName);
    
    // If it's a rating type question, append the rating scale with labels
    if (question.type === "rating" && predefinedMessagesData?.scale?.labels) {
      const labels = predefinedMessagesData.scale.labels;
      const min = predefinedMessagesData.scale.min;
      const max = predefinedMessagesData.scale.max;
      
      // Build the rating scale string: "1 = Label1, 2 = Label2, 3 = Label3"
      const scaleLabels = [];
      for (let i = min; i <= max; i++) {
        const label = labels[i.toString()];
        if (label) {
          scaleLabels.push(`${i} = ${label}`);
        }
      }
      
      if (scaleLabels.length > 0) {
        message += ` ${scaleLabels.join(", ")}?`;
      }
    }
    
    return message;
  };

  const handleQuestionClick = (question) => {
    const formattedMessage = formatMessage(question);
    setSelectedQuestionId(question.id);
    
    // Call the callback to send the message
    if (onSelectMessage) {
      onSelectMessage(formattedMessage);
    }
    
    // Close modal after a short delay to show selection
    setTimeout(() => {
      onOpenChange(false);
      setSelectedQuestionId(null);
    }, 200);
  };

  const questions = predefinedMessagesData?.questions || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:w-[90vw] md:w-[80vw] lg:max-w-2xl max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh] overflow-y-auto p-3 sm:p-4 md:p-6 mx-auto">
        <DialogHeader className="pb-2 sm:pb-3 md:pb-4">
          <DialogTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
            Predefined Messages
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 sm:mt-3 md:mt-4 space-y-2 sm:space-y-2.5 md:space-y-3">
          {questions.length === 0 ? (
            <p className="text-gray-500 text-center py-6 sm:py-8 text-sm sm:text-base">
              No predefined messages available
            </p>
          ) : (
            questions.map((question) => {
              const formattedText = formatMessage(question);
              const isSelected = selectedQuestionId === question.id;

              return (
                <Button
                  key={question.id}
                  onClick={() => handleQuestionClick(question)}
                  variant="outline"
                  className={`w-full justify-start text-left h-auto py-2.5 sm:py-3 md:py-3.5 px-3 sm:px-4 min-h-[44px] whitespace-normal ${
                    isSelected
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                  }`}
                >
                  <div className="flex flex-col items-start gap-1 w-full overflow-hidden">
                    <span className="text-xs sm:text-sm md:text-base font-medium break-words break-all w-full leading-relaxed">
                      {formattedText}
                    </span>
                    {question.type === "rating" && (
                      <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                        Rating: {predefinedMessagesData.scale.min} - {predefinedMessagesData.scale.max}
                      </span>
                    )}
                  </div>
                </Button>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PredefinedMessageModal;
