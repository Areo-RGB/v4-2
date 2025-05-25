import React from "react"

interface AnalyticsLayoutProps {
  children: React.ReactNode
}

export default function AnalyticsLayout({ children }: AnalyticsLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">{children}</div>
    </div>
  )
} 