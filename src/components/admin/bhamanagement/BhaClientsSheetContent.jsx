"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrl } from "@/utils/getImageUrl";
import { useUsersByDoctorIdQuery } from "@/redux/Apis/admin/bhamanagementApi/bhamanagementApi";
import { Loader } from "lucide-react";

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function BhaClientsSheetContent({ doctorId }) {
  const { data: response, isLoading } = useUsersByDoctorIdQuery(
    { id: doctorId },
    { skip: !doctorId }
  );
  const list = response?.data ?? [];

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="shrink-0 border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Clients</h2>
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
                    alt={user.fullname}
                  />
                  <AvatarFallback className="text-sm font-medium">
                    {getInitials(user.fullname)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {user.fullname || "—"}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email || "—"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
