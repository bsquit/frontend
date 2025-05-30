import Link from "next/link";
import { UserCircle } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function SharedLayout({ 
  children, 
  username = "User",
  title = "LC SIGN HELPDESK",
  profileLink = "/user/profile"
}) {
  return (
    <html lang="en">
      <body>
        <header className="text-right p-4 flex justify-between bg-gradient-to-br from-orange-400 to-orange-700 items-center drop-shadow-lg">
          <span></span>
          <span className="font-bold text-white text-3xl">{title}</span>
          <div className="text-white flex items-center gap-4">
            <div className="text-right">
              Logged in as <br />
              <span className="font-bold text-2xl">{username}</span>
            </div>
            <Link href={profileLink} className="hover:opacity-80 transition-opacity">
              <UserCircle className="w-12 h-12 text-white" />
            </Link>
            <Link 
              href="/auth/login"
              className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded-2xl h-14 flex items-center justify-center gap-2 transition-colors"
            >
              Log Out
            </Link>
          </div>
        </header>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
} 