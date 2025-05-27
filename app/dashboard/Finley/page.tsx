import Timeline from "@/components/comp-537"

export default function FinleyPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">            <h3 className="text-2xl font-bold tracking-tight">
              Finley:Ball
            </h3>
            <p className="text-sm text-muted-foreground">
              Track your project progress with the timeline below.
            </p>
          </div>
        </div>        <div className="rounded-lg border shadow-sm p-6">
          <Timeline />
        </div>
      </div>
    </div>
  )
} 