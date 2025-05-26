"use client"

import React from 'react'
import { useSidebarStore, useSidebarInit } from '@/stores/sidebar-store'
import { useIsMobile } from '@/registry/new-york-v4/hooks/use-mobile'

// Hook that integrates with the mobile detection
export const useSidebarWithMobileDetection = () => {
  const isMobile = useIsMobile()
  const setIsMobile = useSidebarStore(state => state.setIsMobile)
  
  // Update mobile state when it changes
  React.useEffect(() => {
    setIsMobile(isMobile)
  }, [isMobile, setIsMobile])
  
  // Initialize sidebar store
  useSidebarInit()
  
  // Return the sidebar state and actions
  return useSidebarStore()
}

// Component wrapper that provides sidebar context using Zustand
export const SidebarProvider: React.FC<{
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
  style?: React.CSSProperties
}> = ({ 
  children, 
  defaultOpen = true, 
  className,
  style,
  ...props 
}) => {
  const sidebar = useSidebarWithMobileDetection()
  
  // Set default open state on mount
  React.useEffect(() => {
    if (defaultOpen !== undefined) {
      sidebar.setOpen(defaultOpen)
    }
  }, [defaultOpen, sidebar.setOpen])
  
  const SIDEBAR_WIDTH = "16rem"
  const SIDEBAR_WIDTH_ICON = "3rem"
  
  return (
    <div
      data-slot="sidebar-wrapper"
      data-state={sidebar.state}
      style={
        {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style,
        } as React.CSSProperties
      }
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}

// Hook that mimics the original useSidebar but uses Zustand
export const useSidebar = () => {
  const sidebar = useSidebarStore()
  
  return {
    state: sidebar.state,
    open: sidebar.open,
    setOpen: sidebar.setOpen,
    openMobile: sidebar.openMobile,
    setOpenMobile: sidebar.setOpenMobile,
    isMobile: sidebar.isMobile,
    toggleSidebar: sidebar.toggleSidebar,
  }
}
