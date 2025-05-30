// import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Link from "next/link";
import { UserCircle } from "lucide-react";
import SharedLayout from "@/components/shared/SharedLayout";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// `${geistSans.variable} ${geistMono.variable} antialiased

export const metadata = {
  title: "Admin Dashboard - LC SIGN HELPDESK",
  description: "Admin dashboard for LC SIGN HELPDESK",
};

export default function AdminLayout({ children }) {
  return (
    <SharedLayout
      username="Admin"
      title="LC SIGN HELPDESK - Admin"
      profileLink="/admin/profile"
    >
      {children}
    </SharedLayout>
  );
}
