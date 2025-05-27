"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { IconChartBar, IconFolder } from "@tabler/icons-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/new-york-v4/ui/navigation-menu"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { SidebarTrigger } from "@/registry/new-york-v4/ui/sidebar"
import { ModeToggle } from "@/app/dashboard/components/mode-toggle"
import { cn } from "@/lib/utils"

// Custom Link component for NavigationMenu with Next.js routing
const NavLink = ({ href, children, className, ...props }: { 
  href: string, 
  children: React.ReactNode,
  className?: string 
}) => {
  const pathname = usePathname()
  const isActive = href === pathname

  return (
    <NavigationMenuLink asChild active={isActive}>
      <Link 
        href={href} 
        className={cn(navigationMenuTriggerStyle(), className)} 
        {...props}
      >
        {children}
      </Link>
    </NavigationMenuLink>
  )
}

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />        
        <h1 className="text-base font-medium">
          <Link href="/"></Link>
        </h1>
        
        <NavigationMenu className="ml-4">
          <NavigationMenuList>
            {/* Spieler (Players) Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="gap-2">
                <IconFolder className="size-4" />
                Spieler
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-4 p-6 w-[500px]">
                  <div className="grid gap-2">
                    <h4 className="text-base font-semibold leading-none">Spieler Profile</h4>
                    <p className="text-sm text-muted-foreground">
                      Detaillierte Analyse und Statistiken für jeden Spieler
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <NavigationMenuLink asChild>
                      <Link 
                        href="/dashboard/bent" 
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group"
                      >
                        <div className="flex-shrink-0">
                          <Image
                            src="/avatars/silas.webp"
                            alt="Bent"
                            width={50}
                            height={50}
                            className="rounded-full ring-2 ring-transparent group-hover:ring-accent-foreground/20 transition-all"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">Bent</div>
                          <div className="text-xs text-muted-foreground">Spieler Profil & Statistiken</div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    
                    <NavigationMenuLink asChild>
                      <Link 
                        href="/dashboard/finley" 
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group"
                      >
                        <div className="flex-shrink-0">
                          <Image
                            src="/avatars/Finley_portrait.webp"
                            alt="Finley"
                            width={50}
                            height={50}
                            className="rounded-full ring-2 ring-transparent group-hover:ring-accent-foreground/20 transition-all"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">Finley</div>
                          <div className="text-xs text-muted-foreground">Spieler Profil & Statistiken</div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {/* Analytics Link */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="gap-2">
                <IconChartBar className="size-4" />
                Analytics
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-4 p-6 w-[400px]">
                  <div className="grid gap-2">
                    <h4 className="text-base font-semibold leading-none">Analytics Dashboard</h4>
                    <p className="text-sm text-muted-foreground">
                      Umfassende Datenanalyse und Leistungsmetriken
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <NavigationMenuLink asChild>
                      <Link 
                        href="/dashboard/analytics" 
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <IconChartBar className="size-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">Hauptdashboard</div>
                          <div className="text-xs text-muted-foreground">Überblick über alle Metriken</div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    
                    <NavigationMenuLink asChild>
                      <Link 
                        href="/dashboard/analytics/performance" 
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <IconChartBar className="size-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">Leistungsanalyse</div>
                          <div className="text-xs text-muted-foreground">Detaillierte Performance-Daten</div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
