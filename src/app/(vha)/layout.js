import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/commonLayout/Sidebar";
import Header from "@/components/common/commonLayout/Header";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-gray-100 min-h-full w-screen flex flex-col ">
        <Header />

        {children}
      </main>
    </SidebarProvider>
  );
}
