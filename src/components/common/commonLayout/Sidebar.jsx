import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { AiOutlineMessage } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { GrTask } from "react-icons/gr";
import { LuCalendarDays } from "react-icons/lu";
import { LuSquareUserRound } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/vha/dashboard",
    icon: RxDashboard,
  },
  {
    title: "Client",
    url: "/vha/clients",
    icon: LuSquareUserRound,
  },
  {
    title: "Calendar",
    url: "/vha/calendar",
    icon: LuCalendarDays,
  },
  {
    title: "Tasks and Goals",
    url: "/vha/task-and-goals",
    icon: GrTask,
  },
  {
    title: "Reports",
    url: "/vha/reports",
    icon: CgFileDocument,
  },
  {
    title: "Messages",
    url: "/vha/messages",
    icon: AiOutlineMessage,
  },
  {
    title: "Settings    ",
    url: "/vha/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-center items-center my-7 ">
            <Image
              src="/vha/vha.png"
              alt="logo"
              width={200}
              height={200}
              className="w-full h-auto object-contain "
            />
          </SidebarGroupLabel>

          <SidebarGroupContent className="mt-10">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroupLabel className=" mx-auto text-bold text-2xl mb-4">
          VHA Dashboard
        </SidebarGroupLabel>
      </SidebarFooter>
    </Sidebar>
  );
}
