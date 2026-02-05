"use client";

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/utils/getImageUrl";
import { useUsersByDoctorIdQuery } from "@/redux/Apis/admin/bhamanagementApi/bhamanagementApi";
import { Loader } from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";
import ReassignFromAdminModal from "./ReassignFromAdminModal";

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function BhaClientsSheetContent({ doctorId, doctorName }) {
  const { data: response, isLoading } = useUsersByDoctorIdQuery(
    { id: doctorId },
    { skip: !doctorId },
  );
  const list = response?.data ?? [];
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [selectedUserForReassign, setSelectedUserForReassign] = useState(null);

  const handleReassignClick = (user) => {
    setSelectedUserForReassign(user);
    setReassignModalOpen(true);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="shrink-0 border-b px-6 py-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          Clients under{" "}
          <span className="font-normal bg-gray-200 p-1 rounded-md flex items-center gap-2">
            <FaUserDoctor size={16} className="text-gray-900" />
            <span className="text-gray-900 font-medium">{doctorName}</span>
          </span>
        </h2>
      </div>
      <ScrollArea className="flex-1 min-h-0 px-6">
        <div className="space-y-1 pr-4 pb-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : list.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No clients found
            </p>
          ) : (
            list.map((user, index) => (
              <div
                key={user.email ?? index}
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50"
              >
                <Avatar className="size-10 shrink-0">
                  <AvatarImage
                    src={getImageUrl(user.profile)}
                    alt={user.fullName ?? user.fullname}
                  />
                  <AvatarFallback className="text-sm font-medium">
                    {getInitials(user.fullName ?? user.fullname)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {user.fullName ?? user.fullname ?? "—"}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email || "—"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 h-8"
                  onClick={() => handleReassignClick(user)}
                >
                  Reassign
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      <ReassignFromAdminModal
        open={reassignModalOpen}
        onOpenChange={(open) => {
          setReassignModalOpen(open);
          if (!open) setSelectedUserForReassign(null);
        }}
        user={selectedUserForReassign}
        currentDoctorId={doctorId}
      />
    </div>
  );
}
