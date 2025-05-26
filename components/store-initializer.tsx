"use client"

import { useEffect } from "react"
import { useSidebarInit } from "@/stores/sidebar-store"
import { useThemeStore } from "@/stores/theme-store"

interface StoreInitializerProps {
  initialTheme?: string
}

export function StoreInitializer({ initialTheme }: StoreInitializerProps) {
  // Initialize sidebar store
  useSidebarInit()
  
  // Initialize theme store with initial theme from server
  const { activeTheme, setActiveTheme } = useThemeStore()
  
  useEffect(() => {
    if (initialTheme && initialTheme !== activeTheme) {
      setActiveTheme(initialTheme)
    }
  }, [initialTheme, activeTheme, setActiveTheme])
  
  return null
}
