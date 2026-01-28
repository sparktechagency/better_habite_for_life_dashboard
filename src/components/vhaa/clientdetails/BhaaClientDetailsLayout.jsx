"use client";
import BackButton from "@/components/common/backButton/backButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FaStethoscope } from "react-icons/fa";
import { useGetSingleClientQuery } from '../../../redux/Apis/bhaa/client/clientApi';
import BhaaAssignTaskList from "./BhaaAssignTaskList";

function BhaaClientDetailsLayout({ id }) {
  const { data, isLoading } = useGetSingleClientQuery(id, { skip: !id });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <BackButton showText={true} text="View Client Details" />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading client details...</div>
        </div>
      </div>
    );
  }

  // Extract user data from API response - CORRECTED
  const firstItem = data.data;
  const clientData = firstItem?.user;
  const tasks = firstItem?.tasks || [];

  return (
    <div className="space-y-4">
      <BackButton showText={true} text="View Client Details" />
      <BhaaClientDetails clientData={clientData} tasks={tasks} />
      <BhaaAssignTaskList tasks={tasks} />
    </div>
  );
}

export default BhaaClientDetailsLayout;

const BhaaClientDetails = ({ clientData, tasks }) => {
  if (!clientData) {
    return (
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">No client data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed' || task.status === 'Completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending' || task.status === 'Pending').length;
  const overdueTasks = tasks.filter(task => task.status === 'overdue').length;

  // Calculate progress percentage
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 w-full justify-between px-4 md:px-10">
          {/* Left Section: User Profile */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/2 gap-4 px-4 md:px-10">
            <Avatar className="size-32">
              <AvatarImage src={clientData.profile || "https://github.com/shadcn.png"} />
              <AvatarFallback>
                {clientData.fullName?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center md:items-start gap-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {clientData.fullName || "No Name"}
              </h2>
              <p className="text-sm text-gray-500">{clientData.email || "No Email"}</p>
              <p className="text-sm text-gray-500">ID: {clientData._id?.substring(0, 8) || "#N/A"}</p>
              <p className="text-sm text-gray-500">Joined: {formatDate(clientData.createdAt)}</p>
            </div>
            <div className="flex items-center gap-2 text-orange-500">
              <FaStethoscope size={16} />
              <span className="text-sm font-medium">
                Status: {clientData.isActive ? "Active" : "Inactive"}
              </span>
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
                <span className="text-sm text-gray-700">Task Completion</span>
                <span className="text-sm font-semibold text-orange-500">
                  {progressPercentage}%
                </span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-2 bg-gray-200 [&>div]:bg-orange-500"
              />
            </div>

            {/* Total Tasks */}
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Total Tasks</span>
                <span className="text-base font-bold text-gray-900">{totalTasks}</span>
              </div>
            </div>

            {/* Completed and Remaining */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-green-600">{completedTasks}</span>
                  <span className="text-sm text-gray-700">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Pending</span>
                  <span className="text-base font-semibold text-yellow-600">{pendingTasks}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-red-600">{overdueTasks}</span>
                  <span className="text-sm text-gray-700">Overdue</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Phone</span>
                  <span className="text-base font-semibold text-gray-700">{clientData.phone || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};