import { useCallback, useState, useMemo } from "react"
import { toast } from "sonner"
import { PaymentStatus, WorkStatus } from "@/lib/enums"
import type { ServiceOrderExtended } from "@/lib/types/order"
import { deleteOrder } from "@/app/actions/orders"

// Configuration flag - set to true to use real database, false for placeholder data
const USE_REAL_DATA = false

/**
 * Hook for managing orders data and operations
 */
export function useOrdersData(initialData: ServiceOrderExtended[]) {
  const [orders, setOrders] = useState<ServiceOrderExtended[]>(initialData)
  const [isLoading, setIsLoading] = useState(false)

  // Memoized filtered data for different tabs
  const allOrders = useMemo(() => orders, [orders])

  const pendingPaymentOrders = useMemo(
    () => orders.filter((order) => order.so_payment_status === PaymentStatus.PENDING),
    [orders]
  )

  const pendingWorkOrders = useMemo(
    () => orders.filter((order) => order.so_work_status === WorkStatus.WAITING),
    [orders]
  )

  const completedWorkOrders = useMemo(
    () => orders.filter((order) => order.so_work_status === WorkStatus.COMPLETED),
    [orders]
  )

  return {
    orders,
    setOrders,
    isLoading,
    setIsLoading,
    allOrders,
    pendingPaymentOrders,
    pendingWorkOrders,
    completedWorkOrders,
  }
}

/**
 * Hook for handling order row operations (edit, delete, add)
 */
export function useOrderActions() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<ServiceOrderExtended | null>(null)

  const handleRowEdit = useCallback((row: ServiceOrderExtended) => {
    console.log("Edit order:", row)
    toast.info("Edit Order", {
      description: `Opening editor for order #${row.so_id}`,
    })
  }, [])

  const handleRowDelete = useCallback((row: ServiceOrderExtended) => {
    setOrderToDelete(row)
    setDeleteDialogOpen(true)
  }, [])

  const handleAddNew = useCallback(() => {
    console.log("Add new order")
    toast.info("Add New Order", {
      description: "Opening order creation form",
    })
  }, [])

  const confirmDelete = useCallback(
    async (onSuccess?: () => void) => {
      if (!orderToDelete || isDeleting) return

      try {
        setIsDeleting(true)

        if (USE_REAL_DATA) {
          const success = await deleteOrder(orderToDelete.so_id)

          if (!success) {
            throw new Error("Delete operation failed")
          }
        } else {
          // Simulate API delay for placeholder data
          await new Promise((resolve) => setTimeout(resolve, 500))
        }

        toast.success("Order deleted successfully", {
          description: `Order #${orderToDelete.so_id} has been removed`,
        })

        onSuccess?.()
      } catch (error) {
        console.error("Error deleting order:", error)
        toast.error("Failed to delete order", {
          description: "Please try again.",
        })
      } finally {
        setIsDeleting(false)
        setDeleteDialogOpen(false)
        setOrderToDelete(null)
      }
    },
    [orderToDelete, isDeleting]
  )

  return {
    handleRowEdit,
    handleRowDelete,
    handleAddNew,
    confirmDelete,
    isDeleting,
    deleteDialogOpen,
    setDeleteDialogOpen,
    orderToDelete,
  }
}

/**
 * Hook for sorting and filtering state
 */
export function useOrdersTableState() {
  const [sorting, setSorting] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnFilters, setColumnFilters] = useState([])
  const [rowSelection, setRowSelection] = useState({})

  return {
    sorting,
    setSorting,
    columnVisibility,
    setColumnVisibility,
    columnFilters,
    setColumnFilters,
    rowSelection,
    setRowSelection,
  }
}
