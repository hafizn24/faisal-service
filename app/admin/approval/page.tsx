"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { GenericDataTable } from "@/components/generic-data-table"
import { createApprovalColumnConfig, ApprovalUser } from "./approval-config"

export default function ApprovalPage() {
    const [data, setData] = useState<ApprovalUser[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            )

            const { data: service_users, error } = await supabase
                .from("service_users")
                .select("su_id, su_email, su_type, su_is_approve")
                .eq("su_is_approve", false)

            if (error) {
                console.error(error)
            } else {
                setData(service_users ?? [])
            }
        }

        fetchData()
    }, [])

    const customColumns = createApprovalColumnConfig()

    return <GenericDataTable<ApprovalUser>
        data={data}
        idField="su_id"
        customColumns={customColumns}
        enableDragDrop={false}
    />

}
