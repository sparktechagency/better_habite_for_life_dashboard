import React from "react";
import TasksList from "./TasksList";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import SearchFilterButton from "@/components/common/SearchFilterButton";

function TasksAndGoalsLayout() {
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Tasks and Goals"
        description="Here is an overview of your tasks and goals"
      />
      <SearchFilterButton />
      <TasksList />
    </div>
  );
}

export default TasksAndGoalsLayout;
