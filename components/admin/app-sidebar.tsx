"use client"

import * as React from "react"
import {
  IconInnerShadowTop,
  IconListDetails,
  IconUsers,
  IconFileTime,
} from "@tabler/icons-react"

import { NavMain } from "@/components/admin/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navData = {
  navMain: [
    {
      title: "Orders",
      url: "/admin/orders",
      icon: IconListDetails,
    },
    {
      title: "Team Members",
      url: "/admin/team-members",
      icon: IconUsers,
    },
    {
      title: "Approval",
      url: "/admin/approval",
      icon: IconFileTime,
    },
  ],
}

export function AppSidebar({ 
  children,
  ...props 
}: React.ComponentProps<typeof Sidebar> & { children?: React.ReactNode }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">[placeholder]</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        {children}
      </SidebarFooter>
    </Sidebar>
  )
}
