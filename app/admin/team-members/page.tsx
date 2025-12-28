import { DataTable } from "@/components/data-table"
import data from "./data.json"

export default function TeamMembersPage() {
  return <DataTable data={data} />
}
