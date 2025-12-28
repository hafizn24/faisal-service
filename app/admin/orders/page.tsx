import { DataTable } from "@/components/data-table"
import data from "./data.json"

export default function OrdersPage() {
  return <DataTable data={data} />
}
