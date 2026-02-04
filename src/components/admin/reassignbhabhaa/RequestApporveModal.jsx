"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllUsersForAssignReassignQuery } from "@/redux/Apis/admin/assignreassignApi/assignreassingApi";
import Loader from "@/components/common/loader/Loader";

function DetailBlock({ title, name, email, image }) {
  const initial = name ? name.trim().charAt(0).toUpperCase() : "?";
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-foreground">{title}</Label>
      <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
        <Avatar className="size-10 shrink-0 rounded-full bg-muted">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="rounded-full bg-muted text-muted-foreground text-sm font-medium">
            {initial}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-foreground">
            {name || "—"}
          </span>
          <span className="text-xs text-muted-foreground">{email || "—"}</span>
        </div>
      </div>
    </div>
  );
}

function RequestApporveModal({
  open,
  onOpenChange,
  request,
  onAssign,
  isLoading,
}) {
  const [selectedPersonId, setSelectedPersonId] = useState("");
  const assignPersonRole = request?.assignPersonRole ?? "";

  const { data: usersResponse, isLoading: isLoadingUsers } =
    useGetAllUsersForAssignReassignQuery(
      { role: assignPersonRole, limit: 100 },
      { skip: !open || !assignPersonRole }
    );

  const personOptions = React.useMemo(() => {
    const list = usersResponse?.data ?? [];
    const arr = Array.isArray(list) ? list : [];
    const alreadyRequestedId = request?.requestedPerson?._id;
    if (!alreadyRequestedId) return arr;
    return arr.filter((person) => person._id !== alreadyRequestedId);
  }, [usersResponse?.data, request?.requestedPerson?._id]);

  useEffect(() => {
    if (!open) {
      setSelectedPersonId("");
    }
  }, [open]);

  useEffect(() => {
    if (
      selectedPersonId &&
      !personOptions.some((p) => p._id === selectedPersonId)
    ) {
      setSelectedPersonId("");
    }
  }, [personOptions, selectedPersonId]);

  const handleAssign = () => {
    const selected = personOptions.find((p) => p._id === selectedPersonId);
    onAssign?.(request, selected);
    onOpenChange?.(false);
  };

  const reasonPlaceholder =
    "You can track your progress by visiting the 'Dashboard' section. It provides a comprehensive overview of your habit streaks, completion rates, and historical data to help you stay motivated.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-left">
            Assign Requested Person
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <DetailBlock
            title="User Details"
            name={request?.user?.fullName}
            email={request?.user?.email}
            image={request?.user?.profile}
          />
          <DetailBlock
            title="Requested Person Details"
            name={request?.requestedPerson?.fullName}
            email={request?.requestedPerson?.email}
            image={request?.requestedPerson?.profile}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-foreground">
            Reason
          </Label>
          <Textarea
            className="min-h-[100px] resize-none bg-muted/30"
            readOnly
            value={request?.reason ?? ""}
            placeholder={reasonPlaceholder}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-foreground">
            Request Person Name
          </Label>
          <Select
            value={selectedPersonId}
            onValueChange={setSelectedPersonId}
            disabled={isLoadingUsers}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  isLoadingUsers
                    ? "Loading..."
                    : "Select requested person name.."
                }
              />
            </SelectTrigger>
            <SelectContent>
              {personOptions.map((person) => (
                <SelectItem key={person._id} value={person._id}>
                  {person.fullName || person.email || person._id}
                </SelectItem>
              ))}
              {personOptions.length === 0 && (
                <SelectItem value="no-results">No results found</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="flex justify-end gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange?.(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleAssign}
            disabled={!selectedPersonId || isLoading}
          >
            {isLoading ? (
              <>
                Assigning...{" "}
                <Loader className="w-4 h-4 animate-spin ml-2 text-white" />
              </>
            ) : (
              "Assign"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RequestApporveModal;
