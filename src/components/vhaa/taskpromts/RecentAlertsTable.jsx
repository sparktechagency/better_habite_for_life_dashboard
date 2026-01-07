"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { AiFillAlert } from "react-icons/ai";
import BhaaNewTaskPromptAddEdit from "./BhaaNewTaskPromptAddEdit";
import BhaaTaskPromtViewModal from "./BhaaTaskPromtViewModal";
const tableData = [
  {
    id: 1,
    prompt: "Good Morning! Hope...",
    category: "Morning Meditations",
    responseType: "Yes/No",
    status: "Active",
    response: "Daily",
    frequency: 21,
  },
  {
    id: 2,
    prompt: "Good Morning! Hope...",
    category: "Morning Meditations",
    responseType: "Yes/No",
    status: "Active",
    response: "Daily",
    frequency: 21,
  },
  {
    id: 3,
    prompt: "Good Morning! Hope...",
    category: "Morning Meditations",
    responseType: "Yes/No",
    status: "Active",
    response: "Daily",
    frequency: 21,
  },
  {
    id: 4,
    prompt: "Good Morning! Hope...",
    category: "Morning Meditations",
    responseType: "Yes/No",
    status: "Active",
    response: "Daily",
    frequency: 21,
  },
  {
    id: 5,
    prompt: "Good Morning! Hope...",
    category: "Morning Meditations",
    responseType: "Yes/No",
    status: "Active",
    response: "Daily",
    frequency: 21,
  },
  {
    id: 6,
    prompt: "Good Morning! Hope...",
    category: "Morning Meditations",
    responseType: "Yes/No",
    status: "Active",
    response: "Daily",
    frequency: 21,
  },
  {
    id: 7,
    prompt: "Good Morning! Hope...",
    category: "Morning Meditations",
    responseType: "Yes/No",
    status: "Active",
    response: "Daily",
    frequency: 21,
  },
];

export function RecentAlertsTable() {
  const [isAddPromptModalOpen, setIsAddPromptModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [selectedViewPrompt, setSelectedViewPrompt] = useState(null);

  const handleEdit = (data) => {
    setSelectedPrompt(data);
    setIsAddPromptModalOpen(true);
  };

  const handleView = (data) => {
    setSelectedViewPrompt(data);
    setIsViewModalOpen(true);
  };

  const handleSave = (promptData) => {
    console.log("Saving prompt:", promptData);
    // Add your save logic here
    setIsAddPromptModalOpen(false);
    setSelectedPrompt(null);
  };

  return (
    <>
      <ScrollArea className="w-full rounded-md border whitespace-nowrap">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={6} className="py-2">
                <div className="flex items-center gap-2">
                  <AiFillAlert size={20} />
                  <p className="text-sm font-medium">Recent Task Alerts</p>
                </div>
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/6">Promts</TableHead>
              <TableHead className="w-1/6">Category</TableHead>
              <TableHead className="w-1/6">Response Type</TableHead>
              <TableHead className="w-1/6">Status</TableHead>
              <TableHead className="w-1/6">Response</TableHead>
              <TableHead className="w-1/6">Frequency</TableHead>
              <TableHead className="w-1/6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium w-1/6">
                  {data.prompt}
                </TableCell>
                <TableCell className="w-1/6">{data.category}</TableCell>
                <TableCell className="w-1/6">{data.responseType}</TableCell>
                <TableCell className="w-1/6">
                  <p
                    className={`${
                      data.status === "Active"
                        ? "bg-lime-500/50 text-gray-500"
                        : "bg-yellow-500/55 text-gray-500"
                    } px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20`}
                  >
                    {data.status}
                  </p>
                </TableCell>
                <TableCell className="w-1/6">{data.response}</TableCell>
                <TableCell className="w-1/6">{data.frequency}</TableCell>
                <TableCell className="w-1/6  text-right flex gap-2">
                  <Button
                    variant="outline"
                    className="border border-gray-400 h-8"
                    onClick={() => handleEdit(data)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className="border border-gray-400 h-8"
                    onClick={() => handleView(data)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
        <Scrollbar orientation="horizontal" className="h-2 w-full" />
      </ScrollArea>
      <BhaaNewTaskPromptAddEdit
        openModal={isAddPromptModalOpen}
        setOpenModal={setIsAddPromptModalOpen}
        onSave={handleSave}
        initialData={selectedPrompt}
      />
      <BhaaTaskPromtViewModal
        openModal={isViewModalOpen}
        setOpenModal={setIsViewModalOpen}
        promptData={selectedViewPrompt}
      />
    </>
  );
}

export default RecentAlertsTable;
