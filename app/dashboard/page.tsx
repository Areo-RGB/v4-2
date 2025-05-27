import { DataTable } from "@/app/dashboard/components/data-table"
import data from "@/app/dashboard/data.json"

export default function Page() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-32">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Welcome to Dashboard
            </h3>
            <p className="text-sm text-muted-foreground">
              View and manage your data with the table below.
            </p>
          </div>
        </div>
        <DataTable data={data} />
      </div>
    </div>
  )
}
