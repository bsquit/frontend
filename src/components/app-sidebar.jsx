import { Calendar, Home, Inbox, Search, Settings, ShoppingCart, Ticket, Plus } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
// Menu items.
const items = [
  {
    title: "My Tickets",
    url: "/user/my-tickets",
    icon: Ticket,
  },
  {
    title: "Purchases",
    url: "/user/purchases",
    icon: ShoppingCart,
  },
  {
    title: "Create New Ticket",
    url: "/user/create-new-ticket",
    icon: Plus,
  },
  { /** vv Testing only, remove when deploying vv */
    title: "Admin - Dashboard",
    url: "/admin/dashboard",
    icon: Plus,
  },
  {
    title: "Admin - All Tickets",
    url: "/admin/all-tickets",
    icon: Plus,
  },
  {
    title: "Admin - Purchases",
    url: "/admin/purchases",
    icon: Plus,
  }, /** ^^ Testing only, remove when deploying ^^ */
]
 
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
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
    </Sidebar>
  )
}