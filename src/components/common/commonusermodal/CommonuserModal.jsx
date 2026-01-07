"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function CommonuserModal({ children, openModal, setOpenModal, title, onSave }) {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-left">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-4">{children}</div>
        <DialogFooter className="px-6 pb-6">
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          {onSave && (
            <Button variant="primary" onClick={onSave}>
              Save
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CommonuserModal;
