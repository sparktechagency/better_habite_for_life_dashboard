import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { IoIosNotificationsOutline } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Header() {
  return (
    <div className="w-full mx-auto px-4 bg-sidebar border-b">
      <header className="flex h-20 w-full shrink-0 items-center ">
        <SidebarTrigger />

        <div className="ml-auto flex gap-2">
          <Input type="text" placeholder="Search" className="w-full max-w-sm" />
          <Button className="p-0 border bg-transparent">
            <IoIosNotificationsOutline size={28} className="text-black" />
          </Button>
          <Select>
            <SelectTrigger className="w-[180px]">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
    </div>
  );
}
