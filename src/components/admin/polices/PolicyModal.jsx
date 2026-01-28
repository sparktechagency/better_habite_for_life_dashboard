"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TipTapEditor from "@/TipTap/TipTapEditor";
import { Loader } from "lucide-react";

function PolicyModal({
  openModal,
  setOpenModal,
  title = "Edit Policy",
  content = "",
  onSave,
  isLoading = false,
}) {
  const [editorContent, setEditorContent] = useState(content);

  // Update editor content when content prop changes
  useEffect(() => {
    if (openModal) {
      setEditorContent(content);
    }
  }, [content, openModal]);

  // Reset content when modal closes
  useEffect(() => {
    if (!openModal) {
      setEditorContent("");
    }
  }, [openModal]);

  const handleContentChange = useCallback((html) => {
    setEditorContent(html);
  }, []);

  const handleSave = useCallback(async () => {
    if (!editorContent.trim()) {
      return;
    }

    if (onSave) {
      await onSave(editorContent);
    }
  }, [editorContent, onSave]);

  const handleOpenChange = useCallback(
    (open) => {
      setOpenModal(open);
    },
    [setOpenModal]
  );

  return (
    <Dialog open={openModal} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b flex-shrink-0">
          <DialogTitle className="text-xl font-semibold text-left">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden px-6 py-4">
          <TipTapEditor
            content={editorContent}
            onChange={handleContentChange}
            minHeight="400px"
            maxHeight="600px"
            placeholder="Start editing your policy content..."
            showWordCount={false}
            className="w-full"
          />
        </div>

        <DialogFooter className="px-6 py-4 border-t flex-shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpenModal(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isLoading || !editorContent.trim()}
            className="bg-gray-800 hover:bg-gray-700 text-white"
          >
            {isLoading ? <> Saving...{" "}<Loader className="w-4 h-4 animate-spin ml-2 text-white" /></> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PolicyModal;
