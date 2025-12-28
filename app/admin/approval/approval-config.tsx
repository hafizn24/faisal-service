"use client"

import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { IconCheck, IconX } from "@tabler/icons-react"

type UserType = "admin" | "super_admin" | "mechanic"

export interface ApprovalUser {
  su_id: string
  su_email: string
  su_type: UserType
  su_is_approve: boolean
}

// Custom cell renderers for approval page
export function createApprovalColumnConfig() {
  return {
    su_id: {
      hidden: true,
    },
    su_type: {
      header: "User Type",
      cell: (value: UserType, row: ApprovalUser) => (
        <SuTypeCell initialValue={value} row={row} />
      ),
      type: "select" as const,
      options: ["admin", "super_admin", "mechanic"],
    },
    su_is_approve: {
      header: "Status",
      cell: (value: boolean, row: ApprovalUser) => (
        <ApprovalActionCell isApproved={value} row={row} />
      ),
      type: "status" as const,
    },
  }
}

// Component for su_type dropdown
function SuTypeCell({
  initialValue,
  row,
}: {
  initialValue: UserType
  row: ApprovalUser
}) {
  const [value, setValue] = useState<UserType>(initialValue)
  const [isLoading, setIsLoading] = useState(false)

  const handleTypeChange = async (newType: UserType) => {
    setIsLoading(true)
    setValue(newType)

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { error } = await supabase
        .from("service_users")
        .update({ su_type: newType })
        .eq("su_id", row.su_id)

      if (error) {
        console.error("Error updating user type:", error)
        toast.error("Failed to update user type")
        setValue(initialValue) // Revert on error
      } else {
        toast.success(`User type updated to ${newType}`)
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An error occurred")
      setValue(initialValue) // Revert on error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Select value={value} onValueChange={handleTypeChange} disabled={isLoading}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="super_admin">Super Admin</SelectItem>
        <SelectItem value="mechanic">Mechanic</SelectItem>
      </SelectContent>
    </Select>
  )
}

// Component for su_is_approve accept/reject buttons
function ApprovalActionCell({
  isApproved,
  row,
}: {
  isApproved: boolean
  row: ApprovalUser
}) {
  const [status, setStatus] = useState(isApproved)
  const [isLoading, setIsLoading] = useState(false)

  const handleApproval = async (approved: boolean) => {
    setIsLoading(true)

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { error } = await supabase
        .from("service_users")
        .update({ su_is_approve: approved })
        .eq("su_id", row.su_id)

      if (error) {
        console.error("Error updating approval status:", error)
        toast.error(`Failed to ${approved ? "approve" : "reject"} user`)
      } else {
        setStatus(approved)
        toast.success(`User ${approved ? "approved" : "rejected"} successfully`)
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant={status ? "default" : "outline"}
        onClick={() => handleApproval(true)}
        disabled={isLoading}
        className="gap-1"
      >
        <IconCheck size={16} />
        Accept
      </Button>
      <Button
        size="sm"
        variant={!status ? "destructive" : "outline"}
        onClick={() => handleApproval(false)}
        disabled={isLoading}
        className="gap-1"
      >
        <IconX size={16} />
        Reject
      </Button>
    </div>
  )
}
