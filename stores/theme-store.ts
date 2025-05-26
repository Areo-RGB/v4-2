import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const COOKIE_NAME = "active_theme"
const DEFAULT_THEME = "blue"

function setThemeCookie(theme: string) {
  if (typeof window === "undefined") return

  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${window.location.protocol === "https:" ? "Secure;" : ""}`
}

export interface ThemeState {
  // State
  activeTheme: string
  
  // Actions
  setActiveTheme: (theme: string) => void
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    (set, get) => ({
      // Initial state
      activeTheme: DEFAULT_THEME,
      
      // Actions
      setActiveTheme: (theme: string) => {
        set({ activeTheme: theme })
        
        // Save to cookie
        setThemeCookie(theme)
        
        // Apply theme to DOM
        if (typeof document !== 'undefined') {
          // Remove existing theme classes
          Array.from(document.body.classList)
            .filter((className) => className.startsWith("theme-"))
            .forEach((className) => {
              document.body.classList.remove(className)
            })
          
          // Add new theme class
          document.body.classList.add(`theme-${theme}`)
          
          // Add scaled class if needed
          if (theme.endsWith("-scaled")) {
            document.body.classList.add("theme-scaled")
          }
        }
      }
    }),
    {
      name: 'theme-store',
    }
  )
)
