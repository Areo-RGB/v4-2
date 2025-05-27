import Link from "next/link"
import { IconChartBar, IconDashboard } from "@tabler/icons-react"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { SidebarTrigger } from "@/registry/new-york-v4/ui/sidebar"
import { ModeToggle } from "@/app/dashboard/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />        <h1 className="text-base font-medium">QuoVadis</h1>
        <nav className="flex items-center gap-1 ml-4">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href="/dashboard">
              <IconDashboard className="size-4" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href="/dashboard/analytics">
              <IconChartBar className="size-4" />
              Analytics
            </Link>
          </Button>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
