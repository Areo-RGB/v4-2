import React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/new-york-v4/ui/accordion"

export default function VideosPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Videos</h1>
        <p className="text-muted-foreground">Manage your video content here.</p>
      </div>

      <div className="flex justify-center w-full mb-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Video Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link href="/dashboard/videos" passHref legacyBehavior>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Video Library
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Browse and manage your entire video collection.
                          </p>
                        </a>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  <NavigationMenuLink asChild>
                    <a
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/dashboard/videos"
                    >
                      <div className="text-sm font-medium leading-none">Recent Uploads</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Videos uploaded in the last 30 days.
                      </p>
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <a
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/dashboard/videos"
                    >
                      <div className="text-sm font-medium leading-none">Featured Videos</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Highlighted and featured video content.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <Card className="col-span-1 md:col-span-2 lg:col-span-3"> 
        <CardHeader>
          <CardTitle>Video Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>10m Sprint</AccordionTrigger>
              <AccordionContent>
                Sprint performance data and videos for 10m distance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>20m Sprint</AccordionTrigger>
              <AccordionContent>
                Sprint performance data and videos for 20m distance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Gewandtheit</AccordionTrigger>
              <AccordionContent>
                Agility and movement performance videos and analysis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Ballkontrolle</AccordionTrigger>
              <AccordionContent>
                Ball control exercise videos and demonstrations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Balljonglieren</AccordionTrigger>
              <AccordionContent>
                Ball juggling skills and technique videos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Dribbling</AccordionTrigger>
              <AccordionContent>
                Dribbling technique videos and skills development.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
} 