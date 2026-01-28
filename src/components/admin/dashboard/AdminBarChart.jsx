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
function AdminBarChart({ totalUsersByMonth }) {
  const totalUsersByMonthData =
    totalUsersByMonth &&
    Array.isArray(totalUsersByMonth) &&
    totalUsersByMonth.length > 0
      ? [
          ...totalUsersByMonth.map((item) => ({
            month: item.month,
            users: item.count,
          })),
        ]
      : [];

  // Check if there's no data or all values are 0
  const totalValue = totalUsersByMonthData.reduce(
    (sum, item) => sum + (item.users || 0),
    0
  );
  const hasData = totalUsersByMonthData.length > 0 && totalValue > 0;

  return (
    <Card className="p-0">
      <div className="flex items-center gap-2 px-6 mt-5 relative">
        <BsBarChartFill size={20} className="text-green-500" />
        <h1 className="text-xl font-semibold">User Growth</h1>
      </div>

      <div className="w-full h-[400px] py-1">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={totalUsersByMonthData}
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
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <BsBarChartFill size={48} className="mb-2 opacity-50" />
            <p className="text-sm font-medium">No user growth data available</p>
            <p className="text-xs mt-1">All user counts are zero</p>
          </div>
        )}
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
