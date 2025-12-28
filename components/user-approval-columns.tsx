// user-approval-columns.tsx

// ============================================================================
// IMPORTS
// ============================================================================

// TanStack Table types - the library that powers the data table
import { ColumnDef } from "@tanstack/react-table"

// Zod - for schema validation and TypeScript type inference
import { z } from "zod"

// UI Components from shadcn/ui
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Icon for the actions menu
import { IconDotsVertical } from "@tabler/icons-react"

// ============================================================================
// SCHEMA DEFINITION
// ============================================================================

/**
 * This schema defines the structure of your Supabase user data
 * It matches your database columns:
 * - su_id: UUID primary key
 * - su_is_approve: Boolean for approval status (can be null)
 * - su_email: User's email address
 * - su_type: Type of user (can be null)
 */
export const userApprovalSchema = z.object({
  su_id: z.string().uuid(),           // Must be a valid UUID string
  su_is_approve: z.boolean().nullable(), // Can be true, false, or null
  su_email: z.string().email(),       // Must be a valid email format
  su_type: z.string().nullable(),     // Can be a string or null
})

// TypeScript type inferred from the schema
// You can use this type elsewhere: z.infer<typeof userApprovalSchema>
// This ensures type safety across your application

// ============================================================================
// COLUMN DEFINITIONS
// ============================================================================

/**
 * Columns define how each piece of data is displayed in the table
 * Each column has:
 * - id or accessorKey: Identifies the column
 * - header: What appears in the table header
 * - cell: How to render each cell's data
 * - Additional options: enableSorting, enableHiding, etc.
 */
export const userApprovalColumns: ColumnDef<z.infer<typeof userApprovalSchema>>[] = [
  
  // --------------------------------------------------------------------------
  // COLUMN 1: SELECT CHECKBOX
  // --------------------------------------------------------------------------
  {
    id: "select", // Unique identifier (not tied to data)
    
    // Header checkbox - controls all rows
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          // Check if all rows are selected OR some rows are selected (indeterminate state)
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          // When clicked, toggle all rows on/off
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    
    // Individual row checkbox
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    
    // Disable sorting and hiding for this column
    enableSorting: false,
    enableHiding: false,
  },

  // --------------------------------------------------------------------------
  // COLUMN 2: EMAIL
  // --------------------------------------------------------------------------
  {
    accessorKey: "su_email", // Links to the su_email property in your data
    header: "Email",         // Column header text
    
    cell: ({ row }) => (
      // Display email in medium font weight
      <div className="font-medium">{row.original.su_email}</div>
    ),
    
    enableHiding: false, // This column cannot be hidden by users
  },

  // --------------------------------------------------------------------------
  // COLUMN 3: USER TYPE
  // --------------------------------------------------------------------------
  {
    accessorKey: "su_type",
    header: "User Type",
    
    cell: ({ row }) => (
      // Display as a badge with outline style
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {/* Show "Not Specified" if su_type is null/undefined */}
        {row.original.su_type || "Not Specified"}
      </Badge>
    ),
  },

  // --------------------------------------------------------------------------
  // COLUMN 4: APPROVAL STATUS
  // --------------------------------------------------------------------------
  {
    accessorKey: "su_is_approve",
    header: "Status",
    
    cell: ({ row }) => {
      const isApproved = row.original.su_is_approve
      
      return (
        <Badge 
          // Green badge if approved, secondary (gray) otherwise
          variant={isApproved ? "default" : "secondary"}
          // Add custom green styling for approved status
          className={isApproved ? "bg-green-500 hover:bg-green-600" : ""}
        >
          {/* Display text based on approval status:
              - null = "Pending Review"
              - true = "Approved"
              - false = "Rejected"
          */}
          {isApproved === null 
            ? "Pending Review" 
            : isApproved 
              ? "Approved" 
              : "Rejected"
          }
        </Badge>
      )
    },
  },

  // --------------------------------------------------------------------------
  // COLUMN 5: USER ID (TRUNCATED)
  // --------------------------------------------------------------------------
  {
    accessorKey: "su_id",
    header: "User ID",
    
    cell: ({ row }) => (
      // Display first 8 characters of UUID in monospace font
      <div className="font-mono text-xs text-muted-foreground">
        {row.original.su_id.slice(0, 8)}...
      </div>
    ),
  },

  // --------------------------------------------------------------------------
  // COLUMN 6: ACTIONS DROPDOWN
  // --------------------------------------------------------------------------
  {
    id: "actions", // Not tied to any data field
    
    cell: ({ row }) => (
      <DropdownMenu>
        {/* Three-dot menu button */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        
        {/* Dropdown menu content */}
        <DropdownMenuContent align="end" className="w-40">
          {/* Action items - you'll need to implement the onClick handlers */}
          <DropdownMenuItem>Approve</DropdownMenuItem>
          <DropdownMenuItem>Reject</DropdownMenuItem>
          <DropdownMenuItem>View Details</DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {/* Destructive action (red text) */}
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/**
 * How to use this in your page:
 * 
 * import { DataTable } from "@/components/data-table"
 * import { userApprovalColumns } from "@/components/user-approval-columns"
 * 
 * export default function UserApprovalPage() {
 *   const data = [
 *     {
 *       su_id: "123e4567-e89b-12d3-a456-426614174000",
 *       su_email: "user@example.com",
 *       su_type: "Admin",
 *       su_is_approve: true,
 *     },
 *   ]
 * 
 *   return (
 *     <DataTable 
 *       data={data} 
 *       columns={userApprovalColumns}
 *       getRowId={(row) => row.su_id}
 *     />
 *   )
 * }
 */