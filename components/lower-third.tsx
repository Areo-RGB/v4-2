"use client"

import { useEffect, useState } from "react"
import { VideoOverlayData, VideoOverlayStore } from "@/lib/data-overlay"
import { VideoOverlayUtils } from "@/lib/overlay-utils"
import { Card } from "@/registry/new-york-v4/ui/card"
import { Badge } from "@/registry/new-york-v4/ui/badge"

interface LowerThirdProps {
  playbackId: string
  show?: boolean
  duration?: number
  className?: string
}

export function LowerThird({ 
  playbackId, 
  show = true, 
  duration = 5000, 
  className = "" 
}: LowerThirdProps) {
  const [overlayData, setOverlayData] = useState<VideoOverlayData | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await VideoOverlayUtils.fetchOverlayByPlaybackId(playbackId)
      setOverlayData(data)
    }
    
    fetchData()
  }, [playbackId])

  useEffect(() => {
    if (show && overlayData) {
      setIsVisible(true)
      
      // Auto-hide after duration
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false)
        }, duration)
        
        return () => clearTimeout(timer)
      }
    } else {
      setIsVisible(false)
    }
  }, [show, overlayData, duration])

  if (!overlayData || !isVisible) {
    return null
  }

  const { primaryText, secondaryText, timeText } = VideoOverlayUtils.formatLowerThird(overlayData)

  return (
    <div className={`absolute bottom-16 left-4 z-10 ${className}`}>
      <Card className="bg-transparent border-transparent text-white p-4 min-w-[280px]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="font-semibold text-lg drop-shadow-lg">{primaryText}</div>
            <div className="text-sm text-gray-200 drop-shadow-lg">{secondaryText}</div>
          </div>
          <Badge variant="secondary" className="bg-black/40 text-white border-white/30 font-mono text-lg drop-shadow-lg">
            {timeText}
          </Badge>
        </div>
      </Card>
    </div>
  )
}

// Extended version with more controls
interface LowerThirdAdvancedProps {
  overlayData: VideoOverlayData
  show?: boolean
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right"
  theme?: "dark" | "light" | "transparent"
  showEvent?: boolean
  showTime?: boolean
  className?: string
}

export function LowerThirdAdvanced({ 
  overlayData,
  show = true,
  position = "bottom-left",
  theme = "dark",
  showEvent = true,
  showTime = true,
  className = ""
}: LowerThirdAdvancedProps) {
  if (!show) return null
  const positionClasses = {
    "bottom-left": "absolute bottom-16 left-4",
    "bottom-right": "absolute bottom-16 right-4",
    "top-left": "absolute top-4 left-4",
    "top-right": "absolute top-4 right-4"
  }
  const themeClasses = {
    dark: "bg-black/80 backdrop-blur-sm border-white/20 text-white",
    light: "bg-white/90 backdrop-blur-sm border-black/20 text-black",
    transparent: "bg-transparent border-transparent text-white"
  }

  const { primaryText, secondaryText, timeText } = VideoOverlayUtils.formatLowerThird(overlayData)

  return (
    <div className={`${positionClasses[position]} z-10 ${className}`}>
      <Card className={`${themeClasses[theme]} p-4 min-w-[280px]`}>        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className={`font-semibold text-lg ${theme === 'transparent' ? 'drop-shadow-lg' : ''}`}>
              {primaryText}
            </div>
            {showEvent && (
              <div className={`text-sm ${
                theme === 'light' 
                  ? 'text-gray-600' 
                  : theme === 'transparent' 
                    ? 'text-gray-200 drop-shadow-lg' 
                    : 'text-gray-300'
              }`}>
                {secondaryText}
              </div>
            )}
          </div>
          {showTime && (
            <Badge 
              variant="secondary" 
              className={`${
                theme === 'light' 
                  ? 'bg-black/10 text-black border-black/20' 
                  : theme === 'transparent'
                    ? 'bg-black/40 text-white border-white/30 drop-shadow-lg'
                    : 'bg-white/20 text-white border-white/30'
              } font-mono text-lg`}
            >
              {timeText}
            </Badge>
          )}
        </div>
      </Card>
    </div>
  )
}
