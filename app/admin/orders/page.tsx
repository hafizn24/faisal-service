"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GenericDataTable } from "@/components/admin/generic-data-table"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { PaymentStatus, WorkStatus } from "@/lib/enums"
import type { ServiceOrderExtended } from "@/lib/types/order"
import { getOrders, deleteOrder } from "@/app/actions/orders"
import placeholderData from "./data.json"

// Configuration flag - set to true to use real database, false for placeholder data
const USE_REAL_DATA = false

// Map payment status to badge variant
const paymentStatusVariants: Record<PaymentStatus, "default" | "secondary" | "destructive" | "outline"> = {
  [PaymentStatus.PENDING]: "outline",
  [PaymentStatus.APPROVED]: "default",
  [PaymentStatus.DECLINED]: "destructive",
}

// Map work status to badge variant
const workStatusVariants: Record<WorkStatus, "default" | "secondary" | "destructive" | "outline"> = {
  [WorkStatus.WAITING]: "outline",
  [WorkStatus.IN_PROGRESS]: "secondary",
  [WorkStatus.COMPLETED]: "default",
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("payment-pending")
  const [orders, setOrders] = useState<ServiceOrderExtended[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<ServiceOrderExtended | null>(null)

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders()
  }, [])

  // Fetch orders from database or use placeholder data
  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true)
      
      if (USE_REAL_DATA) {
        const data = await getOrders()
        setOrders(data)
      } else {
        // Simulate API delay for placeholder data
        await new Promise(resolve => setTimeout(resolve, 500))
        setOrders(placeholderData as ServiceOrderExtended[])
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Failed to load orders", {
        description: "Please refresh the page.",
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Memoized filtered data
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

  // Handle row edit
  const handleRowEdit = useCallback((row: ServiceOrderExtended) => {
    console.log("Edit order:", row)
    // TODO: Open edit dialog/modal with the selected order
    toast.info("Edit Order", {
      description: `Opening editor for order #${row.so_id}`,
    })
  }, [])

  // Open delete confirmation dialog
  const handleRowDelete = useCallback((row: ServiceOrderExtended) => {
    setOrderToDelete(row)
    setDeleteDialogOpen(true)
  }, [])

  // Confirm and execute delete
  const confirmDelete = useCallback(async () => {
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
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      // Remove order from local state
      setOrders((prevOrders) => 
        prevOrders.filter((order) => order.so_id !== orderToDelete.so_id)
      )
      
      toast.success("Order deleted successfully", {
        description: `Order #${orderToDelete.so_id} has been removed`,
      })
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
  }, [orderToDelete, isDeleting])

  // Handle adding new order
  const handleAddNew = useCallback(() => {
    console.log("Add new order")
    // TODO: Open create dialog/modal
    toast.info("Add New Order", {
      description: "Opening order creation form",
    })
  }, [])

  // Custom column configurations
  const customColumns = useMemo(() => ({
    so_id: {
      header: "Order ID",
      type: "text" as const,
    },
    s_customer_id: {
      header: "Customer ID",
      type: "text" as const,
    },
    s_package_id: {
      header: "Package ID",
      type: "text" as const,
    },
    so_payment_status: {
      header: "Payment Status",
      type: "badge" as const,
      cell: (value: string) => (
        <Badge variant={paymentStatusVariants[value as PaymentStatus]}>
          {value}
        </Badge>
      ),
    },
    so_work_status: {
      header: "Work Status",
      type: "badge" as const,
      cell: (value: string) => (
        <Badge variant={workStatusVariants[value as WorkStatus]}>
          {value}
        </Badge>
      ),
    },
    so_time_slot: {
      header: "Time Slot",
      type: "text" as const,
      cell: (value: string) => {
        try {
          return new Date(value).toLocaleString()
        } catch {
          return value
        }
      },
    },
    s_users_id: {
      header: "Assigned To",
      type: "text" as const,
      hidden: true,
    },
    s_hostel_id: {
      header: "Hostel ID",
      type: "text" as const,
      hidden: true,
    },
    created_at: {
      header: "Created",
      type: "text" as const,
      cell: (value: string) => {
        try {
          return new Date(value).toLocaleDateString()
        } catch {
          return value
        }
      },
      hidden: true,
    },
    updated_at: {
      header: "Updated",
      type: "text" as const,
      cell: (value: string) => {
        try {
          return new Date(value).toLocaleDateString()
        } catch {
          return value
        }
      },
      hidden: true,
    },
  }), [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading orders...</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="px-4 lg:px-6">
          {!USE_REAL_DATA && (
            <Badge variant="outline" className="mt-2">
              Using placeholder data
            </Badge>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 px-4 lg:px-6">
            <TabsTrigger value="payment-pending" className="relative">
              Pending Payments
              <Badge variant="outline" className="ml-2 rounded-full">
                {pendingPaymentOrders.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="work-pending" className="relative">
              Pending Work
              <Badge variant="outline" className="ml-2 rounded-full">
                {pendingWorkOrders.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="work-completed" className="relative">
              Completed Work
              <Badge variant="outline" className="ml-2 rounded-full">
                {completedWorkOrders.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payment-pending">
            <GenericDataTable
              data={pendingPaymentOrders}
              idField="so_id"
              enableDragDrop={false}
              enableSelection={true}
              enablePagination={true}
              enableActions={true}
              pageSize={10}
              customColumns={customColumns}
              onRowEdit={handleRowEdit}
              onRowDelete={handleRowDelete}
              onAddNew={handleAddNew}
              addButtonLabel="New Order"
            />
          </TabsContent>

          <TabsContent value="work-pending">
            <GenericDataTable
              data={pendingWorkOrders}
              idField="so_id"
              enableDragDrop={false}
              enableSelection={true}
              enablePagination={true}
              enableActions={true}
              pageSize={10}
              customColumns={customColumns}
              onRowEdit={handleRowEdit}
              onRowDelete={handleRowDelete}
              onAddNew={handleAddNew}
              addButtonLabel="New Order"
            />
          </TabsContent>

          <TabsContent value="work-completed">
            <GenericDataTable
              data={completedWorkOrders}
              idField="so_id"
              enableDragDrop={false}
              enableSelection={true}
              enablePagination={true}
              enableActions={true}
              pageSize={10}
              customColumns={customColumns}
              onRowEdit={handleRowEdit}
              onRowDelete={handleRowDelete}
              onAddNew={handleAddNew}
              addButtonLabel="New Order"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete order #{orderToDelete?.so_id}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}