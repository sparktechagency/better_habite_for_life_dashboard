"use client";
import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/utils/getImageUrl";
import formatDate from "@/utils/FormatDate/formatDate";

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
      setOpenModal(false);
    }
  }, [onSolve, report, setOpenModal]);

  if (!report) return null;

  // Extract user info from report
  const user = report.userId || {};
  const userName = user.fullName || "Unknown User";
  const userEmail = user.email || "N/A";
  const userAvatar = getImageUrl(user.profile);
  const isPending = report.status === "pending";
  const isSolved = report.status === "solved";

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-left">
            Report Details
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-0">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Avatar className="size-30">
              <AvatarImage src={userAvatar} />
              <AvatarFallback>
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          {/* User Info */}
          <div className="flex justify-between items-center py-4 border-b">
            <span className="text-sm font-medium text-gray-900">User:</span>

            <span className="text-sm text-gray-900">{userName}</span>
          </div>

          {/* Email Address */}
          <div className="flex justify-between items-center py-4 border-b">
            <span className="text-sm font-medium text-gray-900">
              Email Address:
            </span>
            <span className="text-sm text-gray-900">{userEmail}</span>
          </div>

          {/* Create Date */}
          <div className="flex justify-between items-center py-4 border-b">
            <span className="text-sm font-medium text-gray-900">
              Create Date:
            </span>
            <span className="text-sm text-gray-900">
              {formatDate(report.createdAt)}
            </span>
          </div>

          {/* Status */}
          <div className="flex justify-between items-center py-4 border-b">
            <span className="text-sm font-medium text-gray-900">Status:</span>
            <Badge
              className={
                isSolved
                  ? "bg-green-100 text-green-700 hover:bg-green-100"
                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
              }
            >
              {report.status
                ? report.status.charAt(0).toUpperCase() + report.status.slice(1)
                : "Pending"}
            </Badge>
          </div>

          {/* Report Description */}
          <div className="pt-4">
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-900">
                Report Description:
              </span>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                {report.text || "No description provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer with Solve Button - Only show for pending reports */}
        <div className="px-6 pb-6 flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          {isPending && (
            <Button
              onClick={handleSolve}
              className="bg-green-500 hover:bg-green-600 text-white rounded-md px-6 py-2 text-sm font-medium"
            >
              Solve
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default ReportViewModal;
