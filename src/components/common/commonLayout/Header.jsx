"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { deleteCookie, getCookie } from "@/utils/cookies";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { socket } from "@/socket/socket";
import { useEffect, useState } from "react"
import { useGetMyProfileQuery } from "@/redux/Apis/profileApi/profileApi";
import useToast from "@/hooks/useToast";
export default function Header() {
  const router = useRouter();
  const userRole = getCookie("userRole");
  const [notifications, setNotifications] = useState({});
  const {success} = useToast();
  const { data: myProfile } = useGetMyProfileQuery();
  const currentUserId = getCookie("user_id");
  useEffect(() => {
    socket.connect();
  
    const eventName =
      userRole === "admin" || userRole === "super_admin"
        ? "notification"
        : `notification::${currentUserId}`;
  
    socket.on(eventName, (notification) => {
      // store number only
      setNotifications(notification?.count || 0);
  
      // show message
      success(notification?.message);
  
      // log correct data
      console.log("notification object:", notification);
    });
  
    return () => {
      socket.off(eventName);
      socket.disconnect();
    };
  }, [currentUserId, userRole]);

  console.log("notifications 📡", notifications);


  const handleProfileRedirect = () => {
    if (userRole === "admin" || userRole === "super_admin") {
      router.push("/admin/my-profile");
    } else if (userRole === "doctor") {
      router.push("/bha/my-profile");
    } else if (userRole === "assistant") {
      router.push("/bhaa/my-profile");
    } else {
      router.push("/auth/login");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("userRole");
    deleteCookie("user_id");
    deleteCookie("userData");
    router.push("/auth/login");
  };
  return (
    <div className="w-full mx-auto px-4 bg-sidebar border-b">
      <header className="flex h-20 w-full shrink-0 items-center ">
        <SidebarTrigger />

        <div className="ml-auto flex gap-2">
          <Input type="text" placeholder="Search" className="w-full max-w-sm" />
          <Button
            variant="ghost"
            className="p-0 border bg-transparent relative"
            onClick={() => router.push(userRole === "admin" || userRole === "super_admin" ? "/admin/notifications" : userRole === "doctor" ? "/bha/notifications" : userRole === "assistant" ? "/bhaa/notifications" : "/auth/login")}
          >
            <IoIosNotificationsOutline size={28} className="text-black" />
            {notifications?.userId  && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-2 h-2 text-xs flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>
     

          {/* Shadcn Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex h-10 w-[180px] items-center justify-between px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={myProfile?.data?.profile || "https://github.com/shadcn.png"}  alt={myProfile?.data?.fullName || "User"} />
                    <AvatarFallback>{myProfile?.data?.fullName?.charAt(0) || "CN"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Profile</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px]" align="end">
              <DropdownMenuItem onClick={handleProfileRedirect}>
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={
                    userRole === "admin" || userRole === "super_admin"
                      ? "/admin/change-password"
                      : userRole === "doctor"
                      ? "/bha/change-password"
                      : userRole === "assistant"
                      ? "/bhaa/change-password"
                      : "/auth/login"
                  }
                  className="cursor-pointer"
                >
                  Change Password
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 focus:text-red-500">
                <Button  className="w-full justify-start bg-red-500 text-white hover:bg-red-600 cursor-pointer" onClick={handleLogout}>
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Log Out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
}
