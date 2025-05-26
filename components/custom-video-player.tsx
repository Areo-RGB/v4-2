'use client'

import Video from "next-video"
import { useEffect, useRef } from "react"

interface CustomVideoPlayerProps {
  src: string
  muted?: boolean
  playsInline?: boolean
  controls?: boolean
  className?: string
  style?: React.CSSProperties
  playbackRates?: number[]
}

export default function CustomVideoPlayer({ 
  src, 
  muted = false, 
  playsInline = true, 
  controls = true,
  className,
  style,
  playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2]
}: CustomVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Override next-video's Media Chrome configuration after it loads
    const container = containerRef.current
    if (!container) return

    const configurePlaybackRates = () => {
      // Find the media-controller created by next-video
      const mediaController = container.querySelector('media-controller')
      if (mediaController) {
        const ratesString = playbackRates.join(' ')
        
        // Set playback rates on the media controller
        mediaController.setAttribute('playback-rates', ratesString)
        
        // Find and configure playback rate controls
        const playbackRateButton = mediaController.querySelector('media-playback-rate-button')
        if (playbackRateButton) {
          playbackRateButton.setAttribute('rates', ratesString)
        }

        const playbackRateMenu = mediaController.querySelector('media-playback-rate-menu')
        if (playbackRateMenu) {
          playbackRateMenu.setAttribute('rates', ratesString)
        }

        return true // Configuration successful
      }
      return false // Media controller not found yet
    }

    // Try to configure immediately
    if (!configurePlaybackRates()) {
      // If not ready, use MutationObserver to wait for Media Chrome to load
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            if (configurePlaybackRates()) {
              observer.disconnect()
              break
            }
          }
        }
      })

      observer.observe(container, { 
        childList: true, 
        subtree: true 
      })

      // Cleanup observer after 5 seconds
      setTimeout(() => observer.disconnect(), 5000)
    }
  }, [playbackRates])

  return (
    <div ref={containerRef} className="relative">
      <style jsx>{`
        /* Override Media Chrome theme for custom playback rates */
        .media-chrome-theme {
          --media-control-background: rgba(0, 0, 0, 0.7);
          --media-control-hover-background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
      <Video
        src={src}
        muted={muted}
        playsInline={playsInline}
        controls={controls}
        className={className}
        style={style}
      />
    </div>
  )
}
