import { Metadata } from "next"
import ExpandableCardDemo from "@/components/ui/expandable-card-demo-grid"

export const metadata: Metadata = {
  title: "Music Videos",
  description: "Explore our collection of music videos",
}

export default function VideosPage() {
  return <ExpandableCardDemo />
}