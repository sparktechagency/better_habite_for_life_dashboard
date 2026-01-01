"use client";
import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ReportViewModal = React.memo(function ReportViewModal({
  openModal,
  setOpenModal,
  report,
  onSolve,
}) {
  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  const handleSolve = useCallback(() => {
    if (onSolve && report) {
      onSolve(report);
    }
    setOpenModal(false);
  }, [onSolve, report, setOpenModal]);

  if (!report) return null;

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-left">
            Report Details
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-0">
          {/* User Name */}
          <div className="flex justify-between items-center py-4 border-b">
            <span className="text-sm font-medium text-gray-900">
              User Name:
            </span>
            <span className="text-sm text-gray-900">{report.name}</span>
          </div>

          {/* Email Address */}
          <div className="flex justify-between items-center py-4 border-b">
            <span className="text-sm font-medium text-gray-900">
              Email Address:
            </span>
            <span className="text-sm text-gray-900">{report.email}</span>
          </div>

          {/* Create Date */}
          <div className="flex justify-between items-center py-4 border-b">
            <span className="text-sm font-medium text-gray-900">
              Create Date:
            </span>
            <span className="text-sm text-gray-900">{report.createDate}</span>
          </div>

          {/* Report Description */}
          <div className="pt-4 border-t">
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-900">
                Report Description:
              </span>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                {report.description ||
                  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer with Solve Button */}
        <div className="px-6 pb-6 flex justify-end">
          <Button
            onClick={handleSolve}
            className="bg-gray-700 hover:bg-gray-800 text-white rounded-md px-6 py-2 text-sm font-medium"
          >
            Solve
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default ReportViewModal;
