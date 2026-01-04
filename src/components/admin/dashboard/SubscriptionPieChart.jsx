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

const data = [
  { name: "Ascend", value: 60, color: "#3b82f6" },
  { name: "Accelerate", value: 20, color: "#4ecdc4" },
  { name: "Elevate", value: 20, color: "#f4a261" },
  { name: "Ignite", value: 60, color: "#84cc16" },
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

export default function SubscriptionPieChart() {
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
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              labelLine={true}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
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
