import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import React from 'react'

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

interface SidebarState {
  // State
  open: boolean
  openMobile: boolean
  isMobile: boolean
  
  // Computed state
  state: "expanded" | "collapsed"
  
  // Actions
  setOpen: (open: boolean) => void
  setOpenMobile: (open: boolean) => void
  setIsMobile: (isMobile: boolean) => void
  toggle: () => void
  toggleSidebar: () => void
  
  // Internal methods
  initializeFromCookie: () => void
  setupKeyboardShortcut: () => () => void
}

export const useSidebarStore = create<SidebarState>()(
  devtools(
    (set, get) => ({
      // Initial state
      open: true,
      openMobile: false,
      isMobile: false,
      
      // Computed state
      get state() {
        return get().open ? "expanded" : "collapsed"
      },
      
      // Actions
      setOpen: (open: boolean) => {
        set({ open })
        
        // Save to cookie
        if (typeof document !== 'undefined') {
          document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
        }
      },
      
      setOpenMobile: (openMobile: boolean) => {
        set({ openMobile })
      },
      
      setIsMobile: (isMobile: boolean) => {
        set({ isMobile })
      },
      
      toggle: () => {
        const { open, setOpen } = get()
        setOpen(!open)
      },
      
      toggleSidebar: () => {
        const { isMobile, openMobile, setOpenMobile, setOpen, open } = get()
        if (isMobile) {
          setOpenMobile(!openMobile)
        } else {
          setOpen(!open)
        }
      },
      
      // Initialize from cookie
      initializeFromCookie: () => {
        if (typeof document !== 'undefined') {
          const cookies = document.cookie.split(';')
          const sidebarCookie = cookies.find(cookie => 
            cookie.trim().startsWith(`${SIDEBAR_COOKIE_NAME}=`)
          )
          
          if (sidebarCookie) {
            const value = sidebarCookie.split('=')[1]
            const open = value === 'true'
            set({ open })
          }
        }
      },
      
      // Setup keyboard shortcut
      setupKeyboardShortcut: () => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (
            event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
            (event.metaKey || event.ctrlKey)
          ) {
            event.preventDefault()
            get().toggleSidebar()
          }
        }

        if (typeof window !== 'undefined') {
          window.addEventListener("keydown", handleKeyDown)
          
          // Return cleanup function
          return () => window.removeEventListener("keydown", handleKeyDown)
        }
        
        return () => {}
      },
    }),
    {
      name: 'sidebar-store',
    }
  )
)

// Hook to initialize sidebar store on client-side
export const useSidebarInit = () => {
  const initializeFromCookie = useSidebarStore(state => state.initializeFromCookie)
  const setupKeyboardShortcut = useSidebarStore(state => state.setupKeyboardShortcut)
  
  // Initialize from cookie on mount
  React.useEffect(() => {
    initializeFromCookie()
  }, [initializeFromCookie])
  
  // Setup keyboard shortcut
  React.useEffect(() => {
    const cleanup = setupKeyboardShortcut()
    return cleanup
  }, [setupKeyboardShortcut])
}

// Simple hook for easy component migration
export const useSidebar = () => {
  const open = useSidebarStore(state => state.open)
  const openMobile = useSidebarStore(state => state.openMobile)
  const isMobile = useSidebarStore(state => state.isMobile)
  const state = useSidebarStore(state => state.state)
  const setOpen = useSidebarStore(state => state.setOpen)
  const setOpenMobile = useSidebarStore(state => state.setOpenMobile)
  const setIsMobile = useSidebarStore(state => state.setIsMobile)
  const toggle = useSidebarStore(state => state.toggle)
  const toggleSidebar = useSidebarStore(state => state.toggleSidebar)
  
  return {
    open,
    openMobile,
    isMobile,
    state,
    setOpen,
    setOpenMobile,
    setIsMobile,
    toggle,
    toggleSidebar
  }
}
