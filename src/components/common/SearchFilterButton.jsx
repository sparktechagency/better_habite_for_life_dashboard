import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { HiPlus } from "react-icons/hi";
function SearchFilterButton({ showAddButton = true }) {
  return (
    <div className="flex items-center gap-2 ">
      <Input
        className="flex-1 bg-gray-200 border-gray-300"
        placeholder="Search Client"
      />
      <Select>
        <SelectTrigger className="bg-gray-200 border-gray-300">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
      {showAddButton && (
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <HiPlus /> Add New Client
        </Button>
      )}
    </div>
  );
}

export default SearchFilterButton;
