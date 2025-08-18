import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CardComponent({
  title,
  value,
  icon,
  status,
  goto,
  underline,
  footer,
  iconTextColor = "text-gray-500",
  iconBgColor = "bg-gray-100",
}) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-2xl font-bold text-gray-500 mt-2">
            {value}
          </CardDescription>
          <CardAction
            className={`p-4 rounded-lg ${iconBgColor} ${iconTextColor}`}
          >
            {icon}
          </CardAction>
        </CardHeader>
        {footer && (
          <CardFooter>
            {status && <p className="text-sm text-green-500">{status}</p>}
            {goto && (
              <p
                className={`${
                  underline
                    ? "text-sm underline cursor-pointer text-green-600"
                    : "text-sm"
                }`}
              >
                {goto}
              </p>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export default CardComponent;

export const CardSection = ({ cards, footer }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {cards?.map((card, index) => (
        <CardComponent key={index} {...card} footer={footer} />
      ))}
    </div>
  );
};
