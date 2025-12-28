"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { GenericDataTable } from "@/components/generic-data-table"

export default function TeamMembersPage() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data: users, error } = await supabase
        .from("service_users")
        .select("su_email, su_type")
        .eq("su_is_approve", true)

      if (error) {
        console.error("Supabase error:", error)
      } else {
        setData(users ?? [])
      }
    }

    fetchData()
  }, [])

  return (
    <GenericDataTable
      data={data}
      idField="su_id"
      enableDragDrop={false}
    />
  )
}
