"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/registry/new-york-v4/ui/sidebar"
import { NavDocuments } from "@/app/dashboard/components/nav-documents"
import { NavMain } from "@/app/dashboard/components/nav-main"
import { NavSecondary } from "@/app/dashboard/components/nav-secondary"
import { NavUser } from "@/app/dashboard/components/nav-user"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },  
  navMain: [
    {
      title: "Analytics Dashboard",
      icon: IconChartBar,
      url: "/dashboard/analytics",
    },
    {
      title: "Leistungsanalyse",
      icon: IconChartBar,
      url: "/dashboard/analytics/performance",
    }
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
  players: [
    {
      name: "Bent",
      url: "/dashboard/bent",
      avatar: "/avatars/silas.webp",
    },
    {
      name: "Finley",
      url: "/dashboard/finley",
      avatar: "/avatars/Finley_portrait.webp",
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        
        {/* Players Section */}
        <SidebarGroup>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Spieler Profiles">
                  <IconFolder className="size-4" />
                  <span>Spieler Profiles</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {data.players.map((player) => (
                <SidebarMenuItem key={player.name}>
                  <SidebarMenuButton asChild tooltip={player.name}>
                    <Link href={player.url} className="flex items-center gap-2">
                      <div className="flex-shrink-0">
                        <Image
                          src={player.avatar}
                          alt={player.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      </div>
                      <span>{player.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
