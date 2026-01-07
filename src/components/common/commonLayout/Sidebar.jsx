"use client";

import { Calendar, Home, Inbox, LogOut, Search, Settings } from "lucide-react";
import Link from "next/link";
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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { AiOutlineMessage } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { GrTask } from "react-icons/gr";
import { LuBookOpen, LuCalendarDays } from "react-icons/lu";
import { LuSquareUserRound } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { TiGift } from "react-icons/ti";
import { LuFileCheck } from "react-icons/lu";
import { LuFileLock2 } from "react-icons/lu";
import { RiArticleLine } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { FaQuoteRight } from "react-icons/fa6";
import { LuBotMessageSquare } from "react-icons/lu";
const sidebars = {
  admin: [
    { name: "Dashboard", path: "/admin/dashboard", icon: RxDashboard },
    {
      name: "BHA Management",
      path: "/admin/bha-management",
      icon: LuSquareUserRound,
    },
    {
      name: "BHAA Management",
      path: "/admin/bhaa-management",
      icon: LuSquareUserRound,
    },
    {
      name: "Client Management",
      path: "/admin/client-management",
      icon: LuSquareUserRound,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: CgFileDocument,
    },
    {
      name: "Community",
      path: "/admin/community",
      icon: FaUsers,
    },
    {
      name: "Learning Management",
      path: "/admin/learning-management",
      icon: LuBookOpen,
    },
    {
      name: "Article Management",
      path: "/admin/article-management",
      icon: RiArticleLine,
    },
    {
      name: "Category Management",
      path: "/admin/category-management",
      icon: BiCategory,
    },
    {
      name: "Subscriptions",
      path: "/admin/subscriptions",
      icon: TiGift,
    },
    {
      name: "Terms and Conditions",
      path: "/admin/terms-and-conditions",
      icon: LuFileCheck,
    },
    {
      name: "Privacy Policy",
      path: "/admin/privacy-policy",
      icon: LuFileLock2,
    },
    {
      name: "Faqs",
      path: "/admin/faqs",
      icon: FaQuoteRight,
    },

    { name: "Settings", path: "/admin/settings", icon: Settings },
  ],
  bha: [
    { name: "Dashboard", path: "/bha/dashboard", icon: RxDashboard },
    {
      name: "Session Management",
      path: "/bha/clients",
      icon: LuSquareUserRound,
    },
    { name: "Calendar", path: "/bha/calendar", icon: LuCalendarDays },
    { name: "VHA Schedule", path: "/bha/bha-schedule", icon: LuCalendarDays },
    { name: "Tasks and Goals", path: "/bha/tasks-and-goals", icon: GrTask },
    { name: "Reports", path: "/bha/reports", icon: CgFileDocument },
    { name: "Messages", path: "/bha/messages", icon: AiOutlineMessage },
    {
      name: "Settings",
      icon: Settings,
      subItems: [
        { name: "Faqs", path: "/bha/faqs", icon: FaQuoteRight },
        {
          name: "Terms and Conditions",
          path: "/bha/terms-and-conditions",
          icon: LuFileCheck,
        },
        {
          name: "Privacy Policy",
          path: "/bha/privacy-policy",
          icon: LuFileLock2,
        },
      ],
    },
  ],
  bhaa: [
    { name: "Dashboard", path: "/bhaa/dashboard", icon: RxDashboard },
    { name: "Clients", path: "/bhaa/client-overview", icon: LuSquareUserRound },
    // { name: "Reports", path: "/bhaa/reports", icon: CgFileDocument }, // this page removed from bhaa app because it is not used
    { name: "Task Monitor", path: "/bhaa/task-monitor", icon: GrTask },
    {
      name: "Reminder Prompts",
      path: "/bhaa/task-promts",
      icon: LuBotMessageSquare,
    },
    { name: "Messages", path: "/bhaa/messages", icon: AiOutlineMessage },
    {
      name: "Settings",
      path: "/bhaa/settings",
      icon: Settings,
      subItems: [
        { name: "Faqs", path: "/bha/faqs", icon: FaQuoteRight },
        {
          name: "Terms and Conditions",
          path: "/bhaa/terms-and-conditions",
          icon: LuFileCheck,
        },
        {
          name: "Privacy Policy",
          path: "/bhaa/privacy-policy",
          icon: LuFileLock2,
        },
      ],
    },
  ],
};
import { useSelector } from "react-redux";

export function AppSidebar() {
  // Get role from Redux store
  const currentRole = useSelector((state) => state.userRole.role);

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
              {sidebars[currentRole].map((item) => (
                <SidebarMenuItem key={item.name}>
                  {item.subItems ? (
                    <>
                      <SidebarMenuButton>
                        <item.icon />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.name}>
                            <SidebarMenuButton asChild>
                              <Link href={subItem.path}>
                                <subItem.icon />
                                <span>{subItem.name}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.path}>
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroupLabel className="mx-auto text-bold text-2xl mb-4">
          {currentRole.toUpperCase()} Dashboard
        </SidebarGroupLabel>
      </SidebarFooter>
    </Sidebar>
  );
}
