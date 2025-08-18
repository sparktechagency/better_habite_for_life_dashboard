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

function VhaaBarChart() {
  const totalUsersByMonth = [
    { month: "Jan", users: 120, guest: 80 },
    { month: "Feb", users: 80, guest: 90 },
    { month: "Mar", users: 150, guest: 130 },
    { month: "Apr", users: 100, guest: 70 },
    { month: "May", users: 200, guest: 160 },
    { month: "Jun", users: 170, guest: 120 },
    { month: "Jul", users: 220, guest: 150 },
    { month: "Aug", users: 190, guest: 140 },
    { month: "Sep", users: 140, guest: 100 },
    { month: "Oct", users: 180, guest: 130 },
    { month: "Nov", users: 210, guest: 160 },
    { month: "Dec", users: 250, guest: 190 },
  ];

  return (
    <Card className="p-0">
      <div className="flex items-center justify-between px-6 mt-5 relative">
        <h1 className="text-2xl font-semibold">User Engagements</h1>
      </div>

      <div className="w-full h-[400px] py-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={totalUsersByMonth}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
              fill="#5c3b1c"
              barSize={35}
              radius={[4, 4, 0, 0]}
            />{" "}
            <Bar
              dataKey="guest"
              fill="#dc8c45"
              barSize={35}
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
