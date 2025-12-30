import { getCurrentUser } from "@/lib/auth"
import { NavUser } from "@/components/admin/nav-user"

export async function UserFooter() {
  const user = await getCurrentUser()

  return (
    <NavUser
      user={{
        name: user?.user_metadata?.name || "User",
        email: user?.email || "user@example.com",
        avatar: user?.user_metadata?.avatar_url || "",
      }}
    />
  )
}

export function UserSkeleton() {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5">
      <div className="h-8 w-8 rounded-lg bg-muted animate-pulse" />
      <div className="flex-1">
        <div className="h-4 bg-muted animate-pulse rounded" />
      </div>
    </div>
  )
}
