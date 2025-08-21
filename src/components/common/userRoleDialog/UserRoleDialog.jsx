import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LuSquareUserRound } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { Button } from "@/components/ui/button";

function UserRoleDialog({ open, onRoleSelect }) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && onRoleSelect("admin")}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Select Your Role
          </DialogTitle>
          <DialogDescription className="text-center">
            Choose a role to continue to the dashboard
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          <RoleButton
            icon={RxDashboard}
            label="Admin"
            onClick={() => onRoleSelect("admin")}
          />
          <RoleButton
            icon={LuSquareUserRound}
            label="BHA"
            onClick={() => onRoleSelect("bha")}
          />
          <RoleButton
            icon={FaUsers}
            label="BHAA"
            onClick={() => onRoleSelect("bhaa")}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

const RoleButton = ({ icon: Icon, label, onClick }) => {
  return (
    <Button
      variant="outline"
      className="flex flex-col items-center justify-center h-28 hover:bg-primary/10 transition-all"
      onClick={onClick}
    >
      <Icon className="h-8 w-8 mb-2" />
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );
};

export default UserRoleDialog;
