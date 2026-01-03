"use client"

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
import type { ServiceOrderExtended } from "@/lib/types/order"

interface OrderDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: ServiceOrderExtended | null
  isDeleting: boolean
  onConfirm: () => void
}

export function OrderDeleteDialog({
  open,
  onOpenChange,
  order,
  isDeleting,
  onConfirm,
}: OrderDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Order</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete order #{order?.so_id} from{" "}
            <span className="font-semibold">{order?.customer_name || "Unknown"}</span>. 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
