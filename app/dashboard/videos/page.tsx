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
                <div className="space-y-4">
                  <p className="font-medium">Sprint performance data and videos for 10m distance.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Player/Percentile</th>
                          <th className="py-2 px-4 text-left">Time (s)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-100 dark:bg-green-900/20"><td className="py-2 px-4">DFB-97</td><td className="py-2 px-4">1.99</td></tr>
                        <tr><td className="py-2 px-4">Finley</td><td className="py-2 px-4 font-bold">2.00</td></tr>
                        <tr><td className="py-2 px-4">DFB-90</td><td className="py-2 px-4">2.05</td></tr>
                        <tr><td className="py-2 px-4">DFB-80</td><td className="py-2 px-4">2.10</td></tr>
                        <tr><td className="py-2 px-4">DFB-70</td><td className="py-2 px-4">2.13</td></tr>
                        <tr><td className="py-2 px-4">DFB-60</td><td className="py-2 px-4">2.16</td></tr>
                        <tr><td className="py-2 px-4">DFB-50</td><td className="py-2 px-4">2.18</td></tr>
                        <tr><td className="py-2 px-4">DFB-40</td><td className="py-2 px-4">2.21</td></tr>
                        <tr><td className="py-2 px-4">DFB-30</td><td className="py-2 px-4">2.24</td></tr>
                        <tr><td className="py-2 px-4">DFB-20</td><td className="py-2 px-4">2.28</td></tr>
                        <tr><td className="py-2 px-4">DFB-10</td><td className="py-2 px-4">2.33</td></tr>
                        <tr><td className="py-2 px-4">DFB-3</td><td className="py-2 px-4">2.39</td></tr>
                        <tr className="bg-red-100 dark:bg-red-900/20"><td className="py-2 px-4">Bent</td><td className="py-2 px-4 font-bold">2.87</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>20m Sprint</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="font-medium">Sprint performance data and videos for 20m distance.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Player/Percentile</th>
                          <th className="py-2 px-4 text-left">Time (s)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-100 dark:bg-green-900/20"><td className="py-2 px-4">DFB-97</td><td className="py-2 px-4">3.47</td></tr>
                        <tr><td className="py-2 px-4">DFB-90</td><td className="py-2 px-4">3.57</td></tr>
                        <tr><td className="py-2 px-4">Finley</td><td className="py-2 px-4 font-bold">3.59</td></tr>
                        <tr><td className="py-2 px-4">DFB-80</td><td className="py-2 px-4">3.64</td></tr>
                        <tr><td className="py-2 px-4">DFB-70</td><td className="py-2 px-4">3.69</td></tr>
                        <tr><td className="py-2 px-4">DFB-60</td><td className="py-2 px-4">3.74</td></tr>
                        <tr><td className="py-2 px-4">DFB-50</td><td className="py-2 px-4">3.78</td></tr>
                        <tr><td className="py-2 px-4">DFB-40</td><td className="py-2 px-4">3.82</td></tr>
                        <tr><td className="py-2 px-4">DFB-30</td><td className="py-2 px-4">3.87</td></tr>
                        <tr><td className="py-2 px-4">DFB-20</td><td className="py-2 px-4">3.93*</td></tr>
                        <tr><td className="py-2 px-4">Bent</td><td className="py-2 px-4 font-bold">3.95</td></tr>
                        <tr><td className="py-2 px-4">DFB-10</td><td className="py-2 px-4">4.01</td></tr>
                        <tr><td className="py-2 px-4">DFB-3</td><td className="py-2 px-4">4.14</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Gewandtheit</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="font-medium">Agility and movement performance videos and analysis.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Player/Percentile</th>
                          <th className="py-2 px-4 text-left">Time (s)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-100 dark:bg-green-900/20"><td className="py-2 px-4">DFB-97</td><td className="py-2 px-4">7.91</td></tr>
                        <tr><td className="py-2 px-4">Finley</td><td className="py-2 px-4 font-bold">7.81</td></tr>
                        <tr><td className="py-2 px-4">Bent</td><td className="py-2 px-4 font-bold">7.92</td></tr>
                        <tr><td className="py-2 px-4">DFB-90</td><td className="py-2 px-4">8.11</td></tr>
                        <tr><td className="py-2 px-4">DFB-80</td><td className="py-2 px-4">8.28</td></tr>
                        <tr><td className="py-2 px-4">DFB-70</td><td className="py-2 px-4">8.42</td></tr>
                        <tr><td className="py-2 px-4">DFB-60</td><td className="py-2 px-4">8.54</td></tr>
                        <tr><td className="py-2 px-4">DFB-50</td><td className="py-2 px-4">8.66</td></tr>
                        <tr><td className="py-2 px-4">DFB-40</td><td className="py-2 px-4">8.77</td></tr>
                        <tr><td className="py-2 px-4">DFB-30</td><td className="py-2 px-4">8.90</td></tr>
                        <tr><td className="py-2 px-4">DFB-20</td><td className="py-2 px-4">9.07</td></tr>
                        <tr><td className="py-2 px-4">DFB-10</td><td className="py-2 px-4">9.33</td></tr>
                        <tr><td className="py-2 px-4">DFB-3</td><td className="py-2 px-4">9.66</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Ballkontrolle</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="font-medium">Ball control exercise videos and demonstrations.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Player/Percentile</th>
                          <th className="py-2 px-4 text-left">Time (s)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-100 dark:bg-green-900/20"><td className="py-2 px-4">DFB-97</td><td className="py-2 px-4">9.00</td></tr>
                        <tr><td className="py-2 px-4">Bent</td><td className="py-2 px-4 font-bold">8.95</td></tr>
                        <tr><td className="py-2 px-4">DFB-90</td><td className="py-2 px-4">9.66</td></tr>
                        <tr><td className="py-2 px-4">DFB-80</td><td className="py-2 px-4">10.18</td></tr>
                        <tr><td className="py-2 px-4">DFB-70</td><td className="py-2 px-4">10.59</td></tr>
                        <tr><td className="py-2 px-4">DFB-60</td><td className="py-2 px-4">10.99</td></tr>
                        <tr><td className="py-2 px-4">Finley</td><td className="py-2 px-4 font-bold">10.82</td></tr>
                        <tr><td className="py-2 px-4">DFB-50</td><td className="py-2 px-4">11.36</td></tr>
                        <tr><td className="py-2 px-4">DFB-40</td><td className="py-2 px-4">11.78</td></tr>
                        <tr><td className="py-2 px-4">DFB-30</td><td className="py-2 px-4">12.28</td></tr>
                        <tr><td className="py-2 px-4">DFB-20</td><td className="py-2 px-4">12.86</td></tr>
                        <tr><td className="py-2 px-4">DFB-10</td><td className="py-2 px-4">13.81</td></tr>
                        <tr><td className="py-2 px-4">DFB-3</td><td className="py-2 px-4">15.29</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Balljonglieren</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="font-medium">Ball juggling skills and technique videos.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Player/Percentile</th>
                          <th className="py-2 px-4 text-left">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="py-2 px-4">Finley</td><td className="py-2 px-4 font-bold">0</td></tr>
                        <tr><td className="py-2 px-4">DFB</td><td className="py-2 px-4">1</td></tr>
                        <tr><td className="py-2 px-4">DFB-80</td><td className="py-2 px-4">2</td></tr>
                        <tr><td className="py-2 px-4">DFB-90</td><td className="py-2 px-4">3</td></tr>
                        <tr><td className="py-2 px-4">DFB-97</td><td className="py-2 px-4">6</td></tr>
                        <tr className="bg-green-100 dark:bg-green-900/20"><td className="py-2 px-4">Bent</td><td className="py-2 px-4 font-bold">11</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Dribbling</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="font-medium">Dribbling technique videos and skills development.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Player/Percentile</th>
                          <th className="py-2 px-4 text-left">Time (s)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-green-100 dark:bg-green-900/20"><td className="py-2 px-4">DFB-97</td><td className="py-2 px-4">10.43</td></tr>
                        <tr><td className="py-2 px-4">Finley</td><td className="py-2 px-4 font-bold">10.27</td></tr>
                        <tr><td className="py-2 px-4">DFB-90</td><td className="py-2 px-4">10.84</td></tr>
                        <tr><td className="py-2 px-4">DFB-80</td><td className="py-2 px-4">11.16</td></tr>
                        <tr><td className="py-2 px-4">DFB-70</td><td className="py-2 px-4">11.44</td></tr>
                        <tr><td className="py-2 px-4">DFB-60</td><td className="py-2 px-4">11.68</td></tr>
                        <tr><td className="py-2 px-4">DFB-50</td><td className="py-2 px-4">11.90</td></tr>
                        <tr><td className="py-2 px-4">DFB-40</td><td className="py-2 px-4">12.15</td></tr>
                        <tr><td className="py-2 px-4">Bent</td><td className="py-2 px-4 font-bold">12.15</td></tr>
                        <tr><td className="py-2 px-4">DFB-30</td><td className="py-2 px-4">12.50</td></tr>
                        <tr><td className="py-2 px-4">DFB-20</td><td className="py-2 px-4">12.84</td></tr>
                        <tr><td className="py-2 px-4">DFB-10</td><td className="py-2 px-4">13.42</td></tr>
                        <tr><td className="py-2 px-4">DFB-3</td><td className="py-2 px-4">14.37</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
} 