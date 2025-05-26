'use client'

import { ReactNode } from 'react'

interface CustomVideoThemeProps {
  children: ReactNode
}

export function CustomVideoTheme({ children }: CustomVideoThemeProps) {
  return (
    <div className="custom-video-theme">
      <style jsx global>{`
        /* Custom Media Chrome theme for extended playback rates */
        media-controller {
          --media-control-background: rgba(0, 0, 0, 0.7);
          --media-control-hover-background: rgba(255, 255, 255, 0.2);
        }
        
        /* Override playback rate button to include custom rates */
        media-playback-rate-button {
          --media-playback-rates: "0.25 0.5 0.75 1 1.25 1.5 2";
        }
        
        /* Style the playback rate menu */
        media-playback-rate-menu {
          --media-playback-rates: "0.25 0.5 0.75 1 1.25 1.5 2";
        }
        
        /* Ensure the video controls are visible and functional */
        media-control-bar {
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
        }
      `}</style>
      {children}
    </div>
  )
}
