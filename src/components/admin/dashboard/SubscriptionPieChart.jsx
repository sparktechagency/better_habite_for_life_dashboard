"use client";
import React from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/card";
import { BiSolidNetworkChart } from "react-icons/bi";

const renderCustomizedLabel = (props) => <CustomLabel {...props} />;

const subscriptionColors = [
  { name: "free", color: "#9ca3af" }, // Gray for free
  { name: "ascend", color: "#3b82f6" }, // Blue
  { name: "accelerate", color: "#4ecdc4" }, // Teal
  { name: "elevate", color: "#f4a261" }, // Orange
  { name: "ignite", color: "#84cc16" }, // Green
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const total = payload.reduce((sum, item) => sum + item.value, 0);
    const percentage = ((data.value / total) * 100).toFixed(2);
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
        <p className="font-medium text-gray-900">{data.name}</p>
        <p className="text-sm text-gray-700">
          <span className="font-bold">{data.value}</span> subscribers
        </p>
        <p className="text-xs text-gray-500">{percentage}% of total</p>
      </div>
    );
  }
  return null;
};

export default function SubscriptionPieChart({ subscriptionData }) {
  const subscriptionDataPieChart =
    subscriptionData && Array.isArray(subscriptionData)
      ? subscriptionData.map((item) => {
          const subscriptionName = item.subscription.toLowerCase();
          const colorData = subscriptionColors.find(
            (colorItem) => colorItem.name === subscriptionName
          );
          // Capitalize first letter for display
          const displayName =
            subscriptionName.charAt(0).toUpperCase() +
            subscriptionName.slice(1);

          return {
            name: displayName,
            value: item.purchaseCount,
            color: colorData?.color || "#9ca3af", // Default gray if not found
          };
        })
      : [];

  // Check if all values are 0
  const totalValue = subscriptionDataPieChart.reduce(
    (sum, item) => sum + item.value,
    0
  );
  const hasData = totalValue > 0;

  // console.log("subscriptionDataPieChart:", subscriptionDataPieChart);
  return (
    <Card className="p-0 h-full w-full ">
      <div className="flex items-center gap-2 px-6 mt-5 relative">
        <BiSolidNetworkChart size={20} className="text-orange-500" />
        <h1 className="text-xl font-semibold">Subscription Distribution</h1>
      </div>
      <div
        style={{ width: "100%", height: 350 }}
        className="flex justify-center items-center"
      >
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={subscriptionDataPieChart}
                cx="50%"
                cy="50%"
                outerRadius={80}
                labelLine={true}
                label={renderCustomizedLabel}
              >
                {subscriptionDataPieChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>

              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                iconType="circle"
                wrapperStyle={{ paddingLeft: "20px" }}
              />
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <BiSolidNetworkChart size={48} className="mb-2 opacity-50" />
            <p className="text-sm font-medium">
              No subscription data available
            </p>
            <p className="text-xs mt-1">All subscription counts are zero</p>
          </div>
        )}
      </div>
    </Card>
  );
}

const CustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
  value,
  payload,
}) => {
  const RADIAN = Math.PI / 180;
  // Position the text outside the pie for better readability
  const radius = outerRadius * 1.15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Get the color from the payload to match the segment color
  const fill = payload.color;

  // Position the percentage value separately
  const percentX = cx + (outerRadius + 15) * Math.cos(-midAngle * RADIAN);
  const percentY = cy + (outerRadius + 15) * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      {/* Line connecting slice to label */}
      <path
        d={`M${cx + outerRadius * 0.95 * Math.cos(-midAngle * RADIAN)},${
          cy + outerRadius * 0.95 * Math.sin(-midAngle * RADIAN)
        }L${x},${y}`}
        stroke={fill}
        fill="none"
        strokeWidth={1.5}
      />

      {/* Name label */}
      <text
        x={x}
        y={y}
        fill={fill}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="500"
      >
        {name}
      </text>

      {/* Value label */}
      <text
        x={x}
        y={y + 16}
        fill="#666"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="hanging"
        fontSize="11"
        fontWeight="400"
      >
        {value} {(percent * 100).toFixed(0)}%
      </text>
    </g>
  );
};
