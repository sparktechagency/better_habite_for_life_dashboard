"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LuPencilLine } from "react-icons/lu";
import { HiTrash } from "react-icons/hi2";

const columns = [
  { key: "name", label: "Target Domain Name" },
  { key: "createdAt", label: "Created At" },
  { key: "updatedAt", label: "Updated At" },
  { key: "actions", label: "Actions" },
];

function formatDate(value) {
  if (!value) return "—";
  try {
    const d = new Date(value);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

function TargetDomainTable({
  domains = [],
  isLoading = false,
  onEdit,
  onDelete,
}) {
  const rows = domains.map((item) => ({
    id: item._id,
    name: item.name,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={col.key === "actions" ? "text-right" : ""}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                Loading target domains...
              </TableCell>
            </TableRow>
          ) : !rows.length ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                No target domains available
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(row.createdAt)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(row.updatedAt)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-foreground"
                      onClick={() =>
                        onEdit?.({
                          _id: row.id,
                          name: row.name,
                          createdAt: row.createdAt,
                          updatedAt: row.updatedAt,
                        })
                      }
                      aria-label={`Edit ${row.name}`}
                    >
                      <LuPencilLine className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive"
                      onClick={() =>
                        onDelete?.({ _id: row.id, name: row.name })
                      }
                      aria-label={`Delete ${row.name}`}
                    >
                      <HiTrash className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TargetDomainTable;
