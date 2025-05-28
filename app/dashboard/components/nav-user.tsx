"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  IconDotsVertical,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york-v4/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/registry/new-york-v4/ui/sidebar"

const users = [
  {
    name: "Bent",
    avatar: "/avatars/bent_attr1_subject.png",
  },
  {
    name: "Finley",
    avatar: "/avatars/Finley_portrait.webp",
  },
]

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const [currentUser, setCurrentUser] = useState(users[0]) // Default to Bent

  const router = useRouter();

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="rounded-lg">{getUserInitials(currentUser.name)}</AvatarFallback>
              </Avatar>              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{currentUser.name}</span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback className="rounded-lg">{getUserInitials(currentUser.name)}</AvatarFallback>
                </Avatar>                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{currentUser.name}</span>
                </div>
              </div>            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Switch Account
              </DropdownMenuLabel>
              {users.filter(user => user.name !== currentUser.name).map((user) => (                <DropdownMenuItem
                  key={user.name}
                  onClick={() => {
                    setCurrentUser(user);
                    if (user.name === "Bent") {
                      router.push("/dashboard/videos");
                    }
                  }}
                  className="gap-2"
                ><Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-xs">{getUserInitials(user.name)}</AvatarFallback>
                  </Avatar>                  <div className="flex flex-col">
                    <span className="text-sm">{user.name}</span>
                  </div>
                </DropdownMenuItem>
              ))}</DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
