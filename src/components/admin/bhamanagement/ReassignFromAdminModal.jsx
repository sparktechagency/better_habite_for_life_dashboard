"use client";

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useGetBhaManagementDataQueryQuery } from "@/redux/Apis/admin/bhamanagementApi/bhamanagementApi";
import { useGetBhaaManagementDataQueryQuery } from "@/redux/Apis/admin/bhaamanagementApi/bhaamanagementApi";
import { useReassignBhaMutation } from "@/redux/Apis/admin/bhamanagementApi/bhamanagementApi";
import { Loader } from "lucide-react";
import useToast from "@/hooks/useToast";
const QUERY_LIMIT = 10000;

function ReassignFromAdminModal({ open, onOpenChange, user, currentDoctorId }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssigneeId, setSelectedAssigneeId] = useState("");
  const [reason, setReason] = useState("");
  const [reassignBha, { isLoading: isReassigning }] = useReassignBhaMutation();
  const toast = useToast();
  const bhaQuery = useGetBhaManagementDataQueryQuery(
    {
      page: 1,
      limit: QUERY_LIMIT,
      search: "",
      status: "All Status",
    },
    { skip: !open || selectedOption !== "bha" },
  );

  const bhaaQuery = useGetBhaaManagementDataQueryQuery(
    {
      page: 1,
      limit: QUERY_LIMIT,
      search: "",
      status: "All Status",
    },
    { skip: !open || selectedOption !== "bhaa" },
  );

  const rawList = useMemo(() => {
    if (selectedOption === "bha") return bhaQuery.data?.data ?? [];
    if (selectedOption === "bhaa") return bhaaQuery.data?.data ?? [];
    return [];
  }, [selectedOption, bhaQuery.data?.data, bhaaQuery.data?.data]);

  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) return rawList;
    const term = searchTerm.trim().toLowerCase();
    return rawList.filter(
      (item) =>
        item.fullName?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term),
    );
  }, [rawList, searchTerm]);

  const searchResultList = useMemo(() => {
    return filteredList.filter((item) => item._id !== currentDoctorId);
  }, [filteredList, currentDoctorId]);

  const selectedAssignee = useMemo(() => {
    if (!selectedAssigneeId) return null;
    return rawList.find(
      (item) => String(item._id) === String(selectedAssigneeId),
    );
  }, [rawList, selectedAssigneeId]);

  const handleClose = (isOpen) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setSelectedOption(null);
      setSearchTerm("");
      setSelectedAssigneeId("");
      setReason("");
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setSearchTerm("");
    setSelectedAssigneeId("");
  };

  const isLoading =
    (selectedOption === "bha" && bhaQuery.isLoading) ||
    (selectedOption === "bhaa" && bhaaQuery.isLoading);

  const canSubmit = selectedOption && selectedAssigneeId && reason.trim();

  const getUserId = (u) => {
    if (!u) return null;
    const value = u._id ?? u.id ?? u.userId ?? u.user_id;
    const idKey = Object.keys(u).find(
      (k) => k === "_id" || k.toLowerCase() === "id"
    );
    const fallback = idKey != null ? u[idKey] : null;
    const id = value != null ? value : fallback;
    if (id == null || id === "" || String(id) === "undefined") return null;
    return String(id);
  };

  const handleSubmit = async () => {
    const userId = getUserId(user);
    if (!userId || userId === "undefined") {
      toast.error("Client information is missing. Please close and try again.");
      return;
    }
    if (!selectedAssigneeId || !reason.trim()) return;
    try {
      const res = await reassignBha({
        userId: String(userId),
        assignId: String(selectedAssigneeId),
        reason: reason.trim(),
      }).unwrap();
      if (res?.success) {
        toast.success(res?.message ?? "Reassigned successfully");
        handleClose(false);
      } else {
        toast.error(res?.message ?? "Reassign failed");
      }
    } catch (err) {
      toast.error(
        err?.data?.message ?? err?.message ?? "Reassign failed"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reassign client</DialogTitle>
          <DialogDescription>
            {user
              ? `Reassign ${user.fullname || user.email} to a different doctor. Choose BHA or BHAA.`
              : "Select a client to reassign."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <p className="text-sm text-muted-foreground">
            Client:{" "}
            <span className="font-medium text-foreground">{user.fullname}</span>
            {" · "}
            <span className="text-muted-foreground">{user.email}</span>
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 py-2">
          <button
            type="button"
            onClick={() => handleOptionChange("bha")}
            className={cn(
              "flex flex-col items-center justify-center rounded-lg border-2 p-4 text-sm font-medium transition-colors",
              selectedOption === "bha"
                ? "border-primary bg-primary/10 text-primary"
                : "border-muted hover:border-muted-foreground/50 hover:bg-muted/50",
            )}
          >
            BHA
          </button>
          <button
            type="button"
            onClick={() => handleOptionChange("bhaa")}
            className={cn(
              "flex flex-col items-center justify-center rounded-lg border-2 p-4 text-sm font-medium transition-colors",
              selectedOption === "bhaa"
                ? "border-primary bg-primary/10 text-primary"
                : "border-muted hover:border-muted-foreground/50 hover:bg-muted/50",
            )}
          >
            BHAA
          </button>
        </div>

        {selectedOption && (
          <>
            <div className="space-y-2">
              <Label htmlFor="reassign-search">
                Search {selectedOption === "bha" ? "BHA" : "BHAA"}
              </Label>
              <Input
                id="reassign-search"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>
                Select {selectedOption === "bha" ? "BHA" : "BHAA"} — click a
                result to select
              </Label>
              {isLoading ? (
                <div className="flex items-center justify-center py-6 border rounded-md">
                  <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  {selectedAssignee ? (
                    <div className="flex items-center justify-between gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm">
                      <span className="truncate">
                        <span className="font-medium">
                          {selectedAssignee.fullName}
                        </span>
                        <span className="text-muted-foreground">
                          {" "}
                          — {selectedAssignee.email}
                        </span>
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="shrink-0 h-7 text-xs"
                        onClick={() => setSelectedAssigneeId("")}
                      >
                        Clear
                      </Button>
                    </div>
                  ) : (
                    <ScrollArea className="h-[200px] rounded-md border">
                      <div className="p-1">
                        {searchResultList.length === 0 ? (
                          <p className="py-4 text-center text-sm text-muted-foreground">
                            No options found
                          </p>
                        ) : (
                          searchResultList.map((item) => (
                            <button
                              key={item._id}
                              type="button"
                              onClick={() =>
                                setSelectedAssigneeId(String(item._id))
                              }
                              className="w-full text-left rounded-sm px-3 py-2 text-sm transition-colors hover:bg-muted/80"
                            >
                              <span className="font-medium">
                                {item.fullName}
                              </span>
                              <span className="text-muted-foreground">
                                {" "}
                                — {item.email}
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  )}
                </>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="reassign-reason">Reason</Label>
              <Textarea
                id="reassign-reason"
                placeholder="Enter reason for reassignment..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="resize-none w-full"
              />
            </div>
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => handleClose(false)} disabled={isReassigning}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!canSubmit || isReassigning}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }}
          >
            {isReassigning ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Reassign"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReassignFromAdminModal;
