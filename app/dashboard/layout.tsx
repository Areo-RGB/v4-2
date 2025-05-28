"use client"

import { useSidebarInit } from "@/stores/sidebar-store"

import {
  SidebarInset,
  SidebarProvider,
} from "@/registry/new-york-v4/ui/sidebar"
import { AppSidebar } from "@/app/dashboard/components/app-sidebar"
import { SiteHeader } from "@/app/dashboard/components/site-header"

import "@/app/dashboard/theme.css"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Initialize sidebar state
  useSidebarInit();
  
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
