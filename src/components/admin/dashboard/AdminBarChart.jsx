"use client";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { BsBarChartFill } from "react-icons/bs";
function AdminBarChart() {
  const totalUsersByMonth = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 80 },
    { month: "Mar", users: 150 },
    { month: "Apr", users: 100 },
    { month: "May", users: 200 },
    { month: "Jun", users: 170 },
    { month: "Jul", users: 220 },
    { month: "Aug", users: 190 },
    { month: "Sep", users: 140 },
    { month: "Oct", users: 180 },
    { month: "Nov", users: 210 },
    { month: "Dec", users: 250 },
  ];

  return (
    <Card className="p-0">
      <div className="flex items-center gap-2 px-6 mt-5 relative">
        <BsBarChartFill size={20} className="text-green-500" />
        <h1 className="text-xl font-semibold">User Growth</h1>
      </div>

      <div className="w-full h-[400px] py-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={totalUsersByMonth}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              strokeWidth={0.2}
              vertical={false}
            />
            <XAxis dataKey="month" style={{ fontSize: "14px" }} />
            <YAxis style={{ fontSize: "14px" }} />
            <Tooltip
              content={<CustomTooltip />}
              isAnimationActive={true}
              cursor={false}
            />
            <Bar
              dataKey="users"
              fill="#000000"
              barSize={30}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default AdminBarChart;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative flex flex-col gap-1 p-2 bg-white border border-gray-200 rounded shadow-md text-sm">
        <div className="font-semibold text-gray-700 mb-1">Month: {label}</div>
        {payload.map((pld, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: pld.fill }}
            ></span>
            <span className="text-gray-800">Total Users: {pld.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
