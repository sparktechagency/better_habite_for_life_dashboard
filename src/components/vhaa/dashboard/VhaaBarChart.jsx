"use client";
import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function VhaaBarChart({ taskEngagementData = [] }) {
  // Transform API data to match chart structure
  const chartData = taskEngagementData.map(item => ({
    month: item.month,
    totalTasks: item.totalTask,
    pendingTasks: item.pendingTask,
    completedTasks: item.completedTask
  }));

  // If no data, show empty state
  if (taskEngagementData.length === 0) {
    return (
      <Card className="p-0">
        <div className="flex items-center justify-between px-6 mt-5">
          <h1 className="text-2xl font-semibold">Task Engagement</h1>
        </div>
        <div className="w-full h-[400px] flex items-center justify-center">
          <p className="text-gray-500">No task engagement data available</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-0">
      <div className="flex items-center justify-between px-6 mt-5 relative">
        <h1 className="text-2xl font-semibold">Task Engagement</h1>
      </div>

      <div className="w-full h-[400px] py-1 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              strokeWidth={0.2}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              style={{ fontSize: "14px" }}
            />
            <YAxis style={{ fontSize: "14px" }} />
            <Tooltip
              content={<CustomTooltip />}
              isAnimationActive={true}
              cursor={false}
            />
            {/* <Legend /> */}
            
            <Bar
            dataKey="completedTasks"
            name="Completed Tasks"
            fill="#bde680"
            barSize={25}
            radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="pendingTasks"
              name="Pending Tasks"
              fill="#e39a3a"
              barSize={25}
              radius={[4, 4, 0, 0]}
            />
           <Bar
              dataKey="totalTasks"
              name="Total Tasks"
              fill="#5c3b1c"
              barSize={25}
              radius={[4, 4, 0, 0]}
            /> 
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default VhaaBarChart;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Find the data point for the current index (label is the month)
    // Order: Total Tasks, Completed Tasks, Pending Tasks
    const totalTasks = payload.find(p => p.dataKey === "totalTasks");
    const completedTasks = payload.find(p => p.dataKey === "completedTasks");
    const pendingTasks = payload.find(p => p.dataKey === "pendingTasks");

    return (
      <div className="relative flex flex-col gap-1 p-4 bg-white border border-gray-200 rounded-lg shadow-lg text-sm">
        <div className="font-semibold text-gray-700 mb-2">Month: {label}</div>

         {/* Completed Tasks */}
         {completedTasks && (
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: completedTasks.fill }}
            ></span>
            <span className="text-gray-800 font-medium">{completedTasks.name}: </span>
            <span className="text-gray-600">{completedTasks.value}</span>
          </div>
        )}
        
        


         {/* Pending Tasks */}
         {pendingTasks && (
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: pendingTasks.fill }}
            ></span>
            <span className="text-gray-800 font-medium">{pendingTasks.name}: </span>
            <span className="text-gray-600">{pendingTasks.value}</span>
          </div>
        )}
        
       
        {/* Total Tasks */}
        {totalTasks && (
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: totalTasks.fill }}
            ></span>
            <span className="text-gray-800 font-medium">{totalTasks.name}: </span>
            <span className="text-gray-600">{totalTasks.value}</span>
          </div>
        )}
       
      </div>
    );
  }

  return null;
};