import React from "react";
import TodaySession from "./TodaySession";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { HiPlus } from "react-icons/hi";

function CalendarLayout() {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <SmallPageInfo
          title="Calendar"
          description="Here is an overview of your calendar"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 w-full  ">
        <CalenderComponent />
        <TodaySession />
      </div>
    </div>
  );
}

export default CalendarLayout;

const CalenderComponent = () => {
  return (
    <>
      <Calendar
        className="rounded-lg border w-auto aspect-square size-190"
        classNames={{
          today:
            "bg-yellow-500 text-accent-foreground rounded-md data-[selected=true]:rounded-none",
        }}
      />
    </>
  );
};
