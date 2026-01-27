import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/commonLayout/Sidebar";
import Header from "@/components/common/commonLayout/Header";
import AuthLayoutWrapper from "@/components/common/auth/AuthLayoutWrapper";

export default function Layout({ children }) {

  return (
    <AuthLayoutWrapper
      allowedRoles={["admin","super_admin"]}
      requireAuth={true}
      redirectOnMount={true}
    >
      <SidebarProvider>
        <AppSidebar />
        <main className="bg-gray-100 min-h-full w-screen flex flex-col ">
          <Header />

          {children}
        </main>
      </SidebarProvider>
    </AuthLayoutWrapper>
  );
}
