import React from "react";
import BackButton from "@/components/common/backButton/backButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FaStethoscope } from "react-icons/fa";
import BhaaAssignTaskList from "./BhaaAssignTaskList";

function BhaaClientDetailsLayout() {
  return (
    <div className="space-y-4">
      <BackButton showText={true} text="View Client Details" />
      <BhaaClientDetails />
      <BhaaAssignTaskList />
    </div>
  );
}

export default BhaaClientDetailsLayout;

const BhaaClientDetails = () => {
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 w-full justify-between px-4 md:px-10">
          {/* Left Section: User Profile */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/2 gap-4 px-4 md:px-10">
            <Avatar className="size-32">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SP</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center md:items-start gap-1">
              <h2 className="text-2xl font-bold text-gray-900">
                Sarah Peterson
              </h2>
              <p className="text-sm text-gray-500">sarahpeterson@gmail.com</p>
              <p className="text-sm text-gray-500">ID: #12311</p>
            </div>
            <div className="flex items-center gap-2 text-orange-500">
              <FaStethoscope size={16} />
              <span className="text-sm font-medium">BHA Anabella</span>
            </div>
          </div>

          {/* Right Section: Task Overview */}
          <div className="w-full md:w-2/3 bg-amber-50 rounded-lg p-4 md:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Task Overview
            </h3>

            {/* Daily Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Daily Progress</span>
                <span className="text-sm font-semibold text-orange-500">
                  32%
                </span>
              </div>
              <Progress
                value={32}
                className="h-2 bg-gray-200 [&>div]:bg-orange-500"
              />
            </div>

            {/* Total Tasks */}
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Total Tasks</span>
                <span className="text-base font-bold text-gray-900">22</span>
              </div>
            </div>

            {/* Completed and Remaining */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-gray-900">12</span>
                <span className="text-sm text-gray-700">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Remaining</span>
                <span className="text-base font-semibold text-red-500">8</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
