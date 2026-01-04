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
function SearchFilterButton({
  showAddButton = true,
  selectOptions = ["All Status"],
  placeholder = "Search Client",
}) {
  return (
    <div className="flex items-center gap-2 ">
      <Input
        className="flex-1 bg-white border-gray-300"
        placeholder={placeholder}
      />
      <Select>
        <SelectTrigger className="bg-white border-gray-300">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          {selectOptions.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
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
