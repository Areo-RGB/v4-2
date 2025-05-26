"use client"

import * as React from "react"
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconPlus,
} from "@tabler/icons-react"
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { z } from "zod"
import Video from "next-video"

import { useIsMobile } from "@/registry/new-york-v4/hooks/use-mobile"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Card } from "@/registry/new-york-v4/ui/card"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/new-york-v4/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Label } from "@/registry/new-york-v4/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/new-york-v4/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york-v4/ui/popover"
import CustomVideoPlayer from "@/components/custom-video-player"

export const schema = z.object({
  id: z.number(),
  name: z.string(),
  result: z.string(),
  exercise: z.string(),
  category: z.string(),
  videoUrl: z.string().nullable().optional(),
  isplayer: z.string(),
})

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Name
          {column.getIsSorted() === "asc" ? (
            <IconChevronDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <IconChevronDown className="ml-2 h-4 w-4 rotate-180" />
          ) : null}
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <TableCellViewer item={row.original}>
          {row.original.name}
        </TableCellViewer>
      )
    },
    enableHiding: false,
    enableSorting: true,
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "result",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Ergebnis
          {column.getIsSorted() === "asc" ? (
            <IconChevronDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <IconChevronDown className="ml-2 h-4 w-4 rotate-180" />
          ) : null}
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>{row.original.result}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "exercise",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Übung
          {column.getIsSorted() === "asc" ? (
            <IconChevronDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <IconChevronDown className="ml-2 h-4 w-4 rotate-180" />
          ) : null}
        </Button>
      )
    },
    cell: ({ row }) => row.original.exercise,
    enableSorting: true,
    enableHiding: true,
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Kategorie
          {column.getIsSorted() === "asc" ? (
            <IconChevronDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <IconChevronDown className="ml-2 h-4 w-4 rotate-180" />
          ) : null}
        </Button>
      )
    },
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.category}
      </Badge>
    ),
    enableSorting: true,
    filterFn: "arrIncludesSome",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const videoUrl = row.original.videoUrl;
      
      if (!videoUrl) return null;
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem asChild>
              <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                Video
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[]
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      exercise: false,
      category: false,
    })
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [selectedNames, setSelectedNames] = React.useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
  const [selectedExercises, setSelectedExercises] = React.useState<string[]>([])
  const [includeDfbData, setIncludeDfbData] = React.useState<boolean>(false)
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const uniqueNames = React.useMemo(() => {
    const names = new Set<string>();
    data.forEach((item) => {
      if (item.isplayer === "YES") {
        names.add(item.name);
      }
    });
    return Array.from(names);
  }, [data]);
  
  const uniqueCategories = React.useMemo(() => {
    const categories = new Set<string>();
    data.forEach((item) => categories.add(item.category));
    return Array.from(categories);
  }, [data]);

  const uniqueExercises = React.useMemo(() => {
    const exercises = new Set<string>();
    data.forEach((item) => exercises.add(item.exercise));
    return Array.from(exercises);
  }, [data]);

  // Filter data based on DFB checkbox - exclude isplayer="NO" entries unless checkbox is checked
  const filteredData = React.useMemo(() => {
    if (includeDfbData) {
      return data; // Show all data including DFB benchmarks
    } else {
      return data.filter((item) => item.isplayer === "YES"); // Only show players
    }
  }, [data, includeDfbData]);

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => filteredData?.map(({ id }) => id) || [],
    [filteredData]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
  
  // Handle multi-select name filtering
  React.useEffect(() => {
    if (selectedNames.length === 0) {
      table.getColumn("name")?.setFilterValue(undefined);
    } else {
      table.getColumn("name")?.setFilterValue(selectedNames);
    }
  }, [selectedNames, table]);
  
  // Handle multi-select category filtering
  React.useEffect(() => {
    if (selectedCategories.length === 0) {
      table.getColumn("category")?.setFilterValue(undefined);
    } else {
      table.getColumn("category")?.setFilterValue(selectedCategories);
    }
  }, [selectedCategories, table]);

  // Handle multi-select exercise filtering
  React.useEffect(() => {
    if (selectedExercises.length === 0) {
      table.getColumn("exercise")?.setFilterValue(undefined);
    } else {
      table.getColumn("exercise")?.setFilterValue(selectedExercises);
    }
  }, [selectedExercises, table]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="name-filter">Name:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 w-[200px] justify-between">
                    {selectedNames.length > 0
                      ? `${selectedNames.length} ausgewählt`
                      : "Filter nach Name..."}
                    <IconChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Namen suchen..." />
                    <CommandList>
                      <CommandEmpty>Keine Namen gefunden.</CommandEmpty>
                      <CommandGroup>
                        {uniqueNames.map((name) => (
                          <CommandItem
                            key={name}
                            onSelect={() => {
                              setSelectedNames((prev) =>
                                prev.includes(name)
                                  ? prev.filter((n) => n !== name)
                                  : [...prev, name]
                              )
                            }}
                          >
                            <div
                              className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
                                selectedNames.includes(name)
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            {name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="exercise-filter">Übung:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 w-[200px] justify-between">
                    {selectedExercises.length > 0
                      ? `${selectedExercises.length} ausgewählt`
                      : "Filter nach Übung..."}
                    <IconChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Übungen suchen..." />
                    <CommandList>
                      <CommandEmpty>Keine Übungen gefunden.</CommandEmpty>
                      <CommandGroup>
                        {uniqueExercises.map((exercise) => (
                          <CommandItem
                            key={exercise}
                            onSelect={() => {
                              setSelectedExercises((prev) =>
                                prev.includes(exercise)
                                  ? prev.filter((e) => e !== exercise)
                                  : [...prev, exercise]
                              )
                            }}
                          >
                            <div
                              className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
                                selectedExercises.includes(exercise)
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            {exercise}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="category-filter">Kategorie:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 w-[200px] justify-between">
                    {selectedCategories.length > 0
                      ? `${selectedCategories.length} ausgewählt`
                      : "Filter nach Kategorie..."}
                    <IconChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Kategorien suchen..." />
                    <CommandList>
                      <CommandEmpty>Keine Kategorien gefunden.</CommandEmpty>
                      <CommandGroup>
                        {uniqueCategories.map((category) => (
                          <CommandItem
                            key={category}
                            onSelect={() => {
                              setSelectedCategories((prev) =>
                                prev.includes(category)
                                  ? prev.filter((c) => c !== category)
                                  : [...prev, category]
                              )
                            }}
                          >
                            <div
                              className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
                                selectedCategories.includes(category)
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            {category}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dfb-data-filter"
                checked={includeDfbData}
                onCheckedChange={(checked) => setIncludeDfbData(!!checked)}
              />
              <Label htmlFor="dfb-data-filter">mit DFB Daten</Label>
            </div>
          </div>
          {/* Display selected filters */}
          {(selectedNames.length > 0 || selectedExercises.length > 0 || selectedCategories.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {selectedNames.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Namen:</span>
                  {selectedNames.map((name) => (
                    <Badge key={name} variant="secondary" className="text-xs">
                      {name}
                      <button
                        onClick={() => setSelectedNames((prev) => prev.filter((n) => n !== name))}
                        className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full w-3 h-3 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              {selectedExercises.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Übungen:</span>
                  {selectedExercises.map((exercise) => (
                    <Badge key={exercise} variant="secondary" className="text-xs">
                      {exercise}
                      <button
                        onClick={() => setSelectedExercises((prev) => prev.filter((e) => e !== exercise))}
                        className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full w-3 h-3 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              {selectedCategories.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Kategorien:</span>
                  {selectedCategories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                      <button
                        onClick={() => setSelectedCategories((prev) => prev.filter((c) => c !== category))}
                        className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full w-3 h-3 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="overflow-hidden rounded-lg border h-[400px] flex flex-col">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <div className="overflow-auto flex-1">
              <Table className="relative">
                <TableHeader className="bg-muted sticky top-0 z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} colSpan={header.colSpan}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody className="**:data-[slot=table-cell]:first:w-8 overflow-y-auto">
                  {table.getRowModel().rows?.length ? (
                    <SortableContext
                      items={dataIds}
                      strategy={verticalListSortingStrategy}
                    >
                      {table.getRowModel().rows.map((row) => (
                        <DraggableRow key={row.id} row={row} />
                      ))}
                    </SortableContext>
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        Keine Ergebnisse.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} von{" "}
            {table.getFilteredRowModel().rows.length} Zeile(n) ausgewählt.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Zeilen pro Seite
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Seite {table.getState().pagination.pageIndex + 1} von{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Zur ersten Seite</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Zur vorherigen Seite</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Zur nächsten Seite</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Zur letzten Seite</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TableCellViewer({ item, children }: { item: z.infer<typeof schema>, children: React.ReactNode }) {
  const isMobile = useIsMobile()
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [playbackRate, setPlaybackRate] = React.useState(1)
  
  // Frame by frame navigation (approximately 1/30 second per frame)
  const frameStep = 1/30
  
  // Use useEffect to get the video element from next-video
  React.useEffect(() => {
    if (!item.videoUrl) return;
    
    const findVideoElement = () => {
      // Find the video element inside the next-video component
      const videoElement = document.querySelector('.video-container video');
      if (videoElement) {
        videoRef.current = videoElement as HTMLVideoElement;
        return true;
      }
      return false;
    };
    
    // Try immediately
    if (!findVideoElement()) {
      // If not ready, use MutationObserver to wait for the video to load
      const observer = new MutationObserver(() => {
        if (findVideoElement()) {
          observer.disconnect();
        }
      });
      
      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      });
      
      // Cleanup observer after 5 seconds
      setTimeout(() => observer.disconnect(), 5000);
    }
  }, [item.videoUrl]);
  
  const stepForward = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime += frameStep
    }
  }
  
  const stepBackward = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime -= frameStep
    }
  }
  
  // Change playback speed
  const changeSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
      setPlaybackRate(speed)
    }
  }

  return (
    <Drawer direction={isMobile ? "top" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {children}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-0">
        {item.videoUrl ? (
          <div className="flex flex-col h-full p-4">
            <Card className="border border-border shadow-lg mb-4 overflow-hidden">
              <Video 
                src={item.videoUrl}
                controls 
                autoPlay
                className="w-full aspect-video bg-black"
                poster="/avatars/01.png"
              />
            </Card>
            <div className="p-2 bg-background">
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" onClick={stepBackward} title="Previous Frame">
                    ◀|
                  </Button>
                  <Button variant="outline" size="sm" onClick={stepForward} title="Next Frame">
                    |▶
                  </Button>
                </div>
                
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium">Speed:</span>
                  {[0.25, 0.5, 1, 1.5, 2].map((speed) => (
                    <Button 
                      key={speed} 
                      variant={playbackRate === speed ? "default" : "outline"} 
                      size="sm"
                      onClick={() => changeSpeed(speed)}
                    >
                      {speed}x
                    </Button>
                  ))}
                </div>
              </div>
              
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">Schließen</Button>
              </DrawerClose>
            </div>
          </div>
        ) : (
          <>
            <DrawerHeader className="gap-1">
              <DrawerTitle>{item.name}</DrawerTitle>
              <DrawerDescription>
                Übung: {item.exercise} ({item.category})
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Schließen</Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
