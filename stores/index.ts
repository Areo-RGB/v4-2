// Export all stores
export { useSidebarStore, useSidebarInit } from './sidebar-store'
export { useThemeStore, type ThemeState } from './theme-store'
export { useVideoPlayerStore, useVideoPlayerSync } from './video-player-store'

// Re-export zustand for convenience
export { create } from 'zustand'
export { devtools, persist } from 'zustand/middleware'
