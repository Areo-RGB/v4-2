import Image from "next/image"
import { DataTable } from "@/app/dashboard/components/data-table"
import data from "@/app/dashboard/data.json"

export default function Page() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-border/60 shadow-sm min-h-32">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-3">
              <Image
                src="/dfb-logo.png"
                alt="DFB Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <h3 className="text-2xl font-bold tracking-tight">
                Spieler:Ergebnisse
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Techno-Motorische Leistungsdiagnostik
            </p>
          </div>
        </div>
        <DataTable data={data} />
      </div>
    </div>
  )
}
