import React from "react";
import { Card, CardContent } from "@/components/ui/card";
function ReportStatCards({ statCards }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full">
      {statCards.map((statCard, index) => (
        <Card key={index}>
          <CardContent>
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col items-start gap-2">
                <p className="text-lg font-semibold text-gray-500">
                  {statCard.statName}
                </p>
                <p className="text-2xl font-bold">{statCard.statValue}</p>
              </div>
              <div
                className={`flex items-center gap-2 bg-gray-100 rounded-lg p-2 ${statCard.bgColor} ${statCard.textColor}`}
              >
                {statCard.statIcon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ReportStatCards;
