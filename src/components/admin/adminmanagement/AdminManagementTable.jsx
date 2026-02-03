"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBlockAdminMutation } from "@/redux/Apis/admin/adminmanagementApi/adminmanagementApi";
import useToast from "@/hooks/useToast";
import { TbLockSquareRounded } from "react-icons/tb";
const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "role", label: "Role" },
  { key: "joinedOn", label: "Joined On" },
  { key: "status", label: "Status" },
  { key: "actions", label: "" },
];

function formatDate(value) {
  if (!value) return "—";
  try {
    const d = new Date(value);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return value;
  }
}

function AdminManagementTable({ admins, paginationMeta, isLoading }) {
  const { success, error } = useToast();
  const adminInfoData = admins?.map((item) => ({
    id: item._id,
    fullName: item.fullName,
    email: item.email,
    phone: item.phone,
    role: item.role,
    isActive: item.isActive,
    joinedOn: item.createdAt,
    profilePicture: item.profile,
  }));

  const [blockAdmin, { isLoading: isBlockingAdmin }] = useBlockAdminMutation();
  const [blockingAdminId, setBlockingAdminId] = useState(null);

  const handleBlockAdmin = async (id, isActive) => {
    setBlockingAdminId(id);
    try {
      await blockAdmin({ id }).unwrap();
      success(
        !isActive
          ? "Admin unblocked successfully"
          : "Admin blocked successfully"
      );
    } catch (err) {
      error(err?.data?.message || err?.message || "Error blocking admin");
    } finally {
      setBlockingAdminId(null);
    }
  };

  const isThisRowBlocking = (adminId) =>
    isBlockingAdmin && blockingAdminId === adminId;

  return (
    <div className="rounded-md border">
      <Table loading={isLoading}>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {!admins?.length ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No admins found.
              </TableCell>
            </TableRow>
          ) : (
            adminInfoData.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell className="font-medium">{admin.fullName}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.phone || "N/A"}</TableCell>
                <TableCell>
                  {admin.role?.charAt(0).toUpperCase() + admin.role?.slice(1) ||
                    "N/A"}
                </TableCell>
                <TableCell>{formatDate(admin.joinedOn)}</TableCell>
                <TableCell>
                  <Badge
                    variant={admin.isActive === true ? "default" : "secondary"}
                    className={cn(
                      admin.isActive === false
                        ? "bg-red-500 text-white hover:bg-red-500/80"
                        : "bg-green-500 text-white hover:bg-green-500/80"
                    )}
                  >
                    {admin.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleBlockAdmin(admin.id, admin.isActive)}
                    disabled={isThisRowBlocking(admin.id)}
                    aria-label={`Block ${admin.fullName}`}
                  >
                    {isThisRowBlocking(admin.id) ? (
                      <Loader
                        className={cn(
                          "size-6 animate-spin",
                          admin.isActive ? "text-green-500" : "text-red-500"
                        )}
                      />
                    ) : !admin.isActive ? (
                      <TbLockSquareRounded className="size-6 text-green-500" />
                    ) : (
                      <TbLockSquareRounded className="size-6 text-red-500" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminManagementTable;
