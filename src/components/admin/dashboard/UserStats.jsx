import React from "react";
import { Card } from "@/components/ui/card";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { CardDescription, CardAction } from "@/components/ui/card";
import { BiSolidUserPin } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserNurse } from "react-icons/fa";
import { RiSpeedUpFill } from "react-icons/ri";
function UserStats({ userStatsData }) {
  const { totalUsers, totalAppUsers, totalBhaUsers, totalBhaaUsers } =
    userStatsData;
  return (
    <Card className="p-4">
      <h1 className="text-xl font-semibold flex items-center gap-2">
        <RiSpeedUpFill /> User Stats
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>{totalUsers || "N/A"}</CardDescription>
            <CardAction>
              <FaUsers size={40} />
            </CardAction>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total App Users</CardTitle>
            <CardDescription>{totalAppUsers || "N/A"}</CardDescription>
            <CardAction>
              <BiSolidUserPin size={40} />
            </CardAction>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>BHA Users</CardTitle>
            <CardDescription>{totalBhaUsers || "N/A"}</CardDescription>
            <CardAction>
              <FaUserDoctor size={40} />
            </CardAction>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>BHAA Users</CardTitle>
            <CardDescription>{totalBhaaUsers || "N/A"}</CardDescription>
            <CardAction>
              <FaUserNurse size={40} />
            </CardAction>
          </CardHeader>
        </Card>
      </div>
    </Card>
  );
}

export default UserStats;
