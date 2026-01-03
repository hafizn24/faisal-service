import { Badge } from "@/components/ui/badge"
import { PaymentStatus, WorkStatus } from "@/lib/enums"
import { Button } from "@/components/ui/button"
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"

/**
 * Payment status to badge variant mapping
 */
export const paymentStatusVariants: Record<
  PaymentStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [PaymentStatus.PENDING]: "outline",
  [PaymentStatus.APPROVED]: "default",
  [PaymentStatus.DECLINED]: "destructive",
}

/**
 * Work status to badge variant mapping
 */
export const workStatusVariants: Record<
  WorkStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [WorkStatus.WAITING]: "outline",
  [WorkStatus.IN_PROGRESS]: "secondary",
  [WorkStatus.COMPLETED]: "default",
}

/**
 * Format date string to readable format
 */
export function formatDate(value: string | undefined): string {
  if (!value) return "—"
  try {
    return new Date(value).toLocaleString()
  } catch {
    return value
  }
}

/**
 * Format time slot for display
 */
export function formatTimeSlot(value: string | undefined): string {
  if (!value) return "—"
  try {
    const date = new Date(value)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { 
      hour: "2-digit", 
      minute: "2-digit" 
    })
  } catch {
    return value
  }
}

/**
 * Truncate long text with ellipsis
 */
export function truncateText(text: string | undefined, maxLength: number = 30): string {
  if (!text) return "—"
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
}

/**
 * Sortable header component
 */
export function SortableHeader({ column, children }: { column: any; children: React.ReactNode }) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="-ml-3 h-8 data-[state=open]:bg-accent"
    >
      {children}
      {column.getIsSorted() === "asc" ? (
        <IconChevronUp className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "desc" ? (
        <IconChevronDown className="ml-2 h-4 w-4" />
      ) : (
        <IconChevronDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  )
}

/**
 * Custom column configuration for orders table
 * Columns are ordered: Order ID, Hostel, Name, Phone, Email, Work Status, Payment Status
 */
export const getOrdersColumnConfig = () => ({
  // Column 1: Order ID
  so_id: {
    header: ({ column }: any) => (
      <SortableHeader column={column}>Order ID</SortableHeader>
    ),
    type: "text" as const,
    enableSorting: true,
    sortingFn: "basic",
  },
  
  // Column 2: Hostel
  hostel_name: {
    header: ({ column }: any) => (
      <SortableHeader column={column}>Hostel</SortableHeader>
    ),
    type: "text" as const,
    cell: (value: string) => value || "—",
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  
  // Column 3: Customer Name
  customer_name: {
    header: ({ column }: any) => (
      <SortableHeader column={column}>Customer Name</SortableHeader>
    ),
    type: "text" as const,
    cell: (value: string) => <span className="font-medium">{value || "—"}</span>,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  
  // Column 4: Phone
  customer_phone: {
    header: ({ column }: any) => (
      <SortableHeader column={column}>Phone</SortableHeader>
    ),
    type: "text" as const,
    cell: (value: string) => (
      <a 
        href={`tel:${value}`} 
        className="text-blue-600 hover:underline"
      >
        {value || "—"}
      </a>
    ),
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  
  // Column 5: Email
  customer_email: {
    header: ({ column }: any) => (
      <SortableHeader column={column}>Email</SortableHeader>
    ),
    type: "text" as const,
    cell: (value: string) => (
      <a 
        href={`mailto:${value}`} 
        className="text-blue-600 hover:underline text-sm"
      >
        {truncateText(value, 25)}
      </a>
    ),
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  
  // Column 6: Work Status
  so_work_status: {
    header: ({ column }: any) => (
      <SortableHeader column={column}>Work Status</SortableHeader>
    ),
    type: "badge" as const,
    cell: (value: string) => (
      <Badge variant={workStatusVariants[value as WorkStatus]}>
        {value}
      </Badge>
    ),
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  
  // Column 7: Payment Status
  so_payment_status: {
    header: ({ column }: any) => (
      <SortableHeader column={column}>Payment Status</SortableHeader>
    ),
    type: "badge" as const,
    cell: (value: string) => (
      <Badge variant={paymentStatusVariants[value as PaymentStatus]}>
        {value}
      </Badge>
    ),
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  
  // Hidden columns
  so_time_slot: {
    header: ({ column }: any) => (
      <SortableHeader column={column}>Time Slot</SortableHeader>
    ),
    type: "text" as const,
    cell: (value: string) => formatTimeSlot(value),
    enableSorting: true,
    sortingFn: "datetime",
    hidden: true,
  },
  s_customer_id: {
    header: "Customer ID",
    type: "text" as const,
    enableSorting: false,
    hidden: true,
  },
  s_hostel_id: {
    header: "Hostel ID",
    type: "text" as const,
    enableSorting: false,
    hidden: true,
  },
  s_package_id: {
    header: "Package ID",
    type: "text" as const,
    enableSorting: false,
    hidden: true,
  },
  s_users_id: {
    header: "Assigned To",
    type: "text" as const,
    enableSorting: false,
    hidden: true,
  },
  created_at: {
    header: ({ column }: any) => (
      <SortableHeader column={column}>Created</SortableHeader>
    ),
    type: "text" as const,
    cell: (value: string) => formatDate(value),
    enableSorting: true,
    sortingFn: "datetime",
    hidden: true,
  },
  updated_at: {
    header: ({ column }: any) => (
      <SortableHeader column={column}>Updated</SortableHeader>
    ),
    type: "text" as const,
    cell: (value: string) => formatDate(value),
    enableSorting: true,
    sortingFn: "datetime",
    hidden: true,
  },
})