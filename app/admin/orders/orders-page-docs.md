# Orders Management Documentation

## Overview

The Orders Management system provides a comprehensive interface for managing service orders with support for multiple filtering tabs, sortable columns, and CRUD operations. The system uses a component-based architecture with abstracted logic for maintainability and reusability.

## File Structure

```
app/admin/orders/
├── page.tsx                      # Main page component
├── data.json                     # Sample/placeholder data
├── _config/
│   └── columns.tsx              # Column configurations and utilities
├── _hooks/
│   └── use-orders.ts            # Custom React hooks for orders logic
├── _components/
│   └── order-delete-dialog.tsx  # Delete confirmation dialog component
└── orders-page-docs.md          # Documentation
```

## Tabs Overview

### 1. All Orders Tab
- Displays all orders regardless of status
- Total count shown in tab badge
- Useful for comprehensive reporting

### 2. Pending Payments Tab
- Orders with `so_payment_status === "pending"`
- For follow-up on payment collection
- Count of pending payments displayed

### 3. Pending Work Tab
- Orders with `so_work_status === "waiting"`
- For scheduling and assignment
- Count of pending work items shown

### 4. Completed Work Tab
- Orders with `so_work_status === "completed"`
- For historical review
- Count of completed orders displayed

## Column Display & Sorting

The following columns are available and sortable:

| Column | Type | Format | Details |
|--------|------|--------|---------|
| Order ID | Number | Plain | Unique identifier |
| Hostel | Text | Plain | Hostel name |
| Customer Name | Text | **Bold** | Customer full name |
| Phone | Link | Tel | Clickable phone number |
| Email | Link | Mailto | Truncated (25 chars) |
| Time Slot | DateTime | Formatted | Date + Time |
| Work Status | Badge | Colored | waiting, in progress, completed |
| Payment Status | Badge | Colored | pending, approve, decline |

### Sorting Features
- Click any column header to sort ascending/descending
- All columns support multi-key sorting via GenericDataTable
- Sorting state is managed in real-time

### Column Customization
- Toggle visibility via "Customize Columns" menu
- Column preferences apply to all tabs
- Hidden by default: Customer ID, Package ID, Hostel ID, Created/Updated dates

## Components & Architecture

### Main Page Component (`page.tsx`)

The entry point component that orchestrates the entire orders management interface.

**Responsibilities:**
- Data fetching from Supabase or placeholder data
- Tab management and filtering
- Row operation handlers (edit, delete, add new)
- Delete confirmation dialog state
- Loading state management

**State:**
```typescript
const [activeTab, setActiveTab] = useState("all-orders")
const [isLoading, setIsLoading] = useState(true)
```

### Column Configuration (`_config/columns.tsx`)

Centralized configuration for table column definitions with custom rendering utilities.

**Key Utilities:**
- `paymentStatusVariants`: Badge style mapping
- `workStatusVariants`: Badge style mapping
- `formatDate()`: Convert ISO dates to readable format
- `formatTimeSlot()`: Format timestamps with time
- `truncateText()`: Truncate long strings
- `getOrdersColumnConfig()`: Returns all column definitions

**Example Usage:**
```typescript
import { getOrdersColumnConfig, formatTimeSlot } from './_config/columns'

const columns = getOrdersColumnConfig()
const formatted = formatTimeSlot("2026-01-10T09:00:00Z")
// Output: "1/10/2026 09:00"
```

### Custom Hooks (`_hooks/use-orders.ts`)

Reusable hooks for orders logic separation and code organization.

#### `useOrdersData(initialData: ServiceOrderExtended[])`

Manages orders data and provides memoized filtered views.

```typescript
const {
  orders,                    // All orders array
  setOrders,                // Update orders
  isLoading,                // Loading state
  setIsLoading,             // Set loading
  allOrders,                // All orders (memoized)
  pendingPaymentOrders,     // Filtered by pending payment (memoized)
  pendingWorkOrders,        // Filtered by waiting work (memoized)
  completedWorkOrders       // Filtered by completed work (memoized)
} = useOrdersData(placeholderData)
```

#### `useOrderActions()`

Handles all row-level operations and dialogs.

```typescript
const {
  handleRowEdit,            // Edit handler
  handleRowDelete,          // Delete handler
  handleAddNew,             // Add new handler
  confirmDelete,            // Confirm delete with callback
  isDeleting,               // Deleting state
  deleteDialogOpen,         // Dialog open state
  setDeleteDialogOpen,      // Toggle dialog
  orderToDelete             // Order selected for deletion
} = useOrderActions()
```

#### `useOrdersTableState()`

Manages UI state for sorting, filtering, and selection.

```typescript
const {
  sorting,                  // Sort configuration
  setSorting,              // Update sorting
  columnVisibility,        // Visibility state
  setColumnVisibility,     // Update visibility
  columnFilters,           // Applied filters
  setColumnFilters,        // Update filters
  rowSelection,            // Selected rows
  setRowSelection          // Update selection
} = useOrdersTableState()
```

### Delete Dialog Component (`_components/order-delete-dialog.tsx`)

Reusable confirmation dialog for deleting orders.

**Props:**
```typescript
interface OrderDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: ServiceOrderExtended | null
  isDeleting: boolean
  onConfirm: () => void
}
```

**Usage:**
```tsx
<OrderDeleteDialog
  open={deleteDialogOpen}
  onOpenChange={setDeleteDialogOpen}
  order={orderToDelete}
  isDeleting={isDeleting}
  onConfirm={handleConfirmDelete}
/>
```

## Data Types

### ServiceOrderExtended

Core data type for orders with display fields:

```typescript
interface ServiceOrderExtended extends ServiceOrder {
  // Database fields
  so_id: number
  s_customer_id: number
  s_hostel_id: number
  s_package_id: number
  s_users_id: string
  so_time_slot: string
  so_work_status?: WorkStatus | null
  so_payment_status?: PaymentStatus | null
  created_at?: string
  updated_at?: string
  
  // Related entities (from joins)
  customer?: ServiceCustomer | ServiceCustomer[]
  package?: ServicePackage | ServicePackage[]
  hostel?: ServiceHostel | ServiceHostel[]
  user?: ServiceUser | ServiceUser[]
  
  // Display convenience fields
  customer_name?: string
  customer_email?: string
  customer_phone?: string
  hostel_name?: string
}
```

## Enums

### PaymentStatus
```typescript
enum PaymentStatus {
  PENDING = "pending",
  APPROVED = "approve",
  DECLINED = "decline"
}
```

**Badge Colors:**
- PENDING: outline (gray)
- APPROVED: default (green)
- DECLINED: destructive (red)

### WorkStatus
```typescript
enum WorkStatus {
  WAITING = "waiting",
  IN_PROGRESS = "in progress",
  COMPLETED = "completed"
}
```

**Badge Colors:**
- WAITING: outline (gray)
- IN_PROGRESS: secondary (blue)
- COMPLETED: default (green)

### UserType
```typescript
enum UserType {
  ADMIN = "admin",
  SUPER_ADMIN = "super admin",
  MECHANIC = "mechanic"
}
```

### TeamMemberRole (NEW)
```typescript
enum TeamMemberRole {
  MECHANIC = "mechanic",
  SUPERVISOR = "supervisor",
  MANAGER = "manager",
  ADMIN = "admin"
}
```

### ApprovalStatus (NEW)
```typescript
enum ApprovalStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  IN_REVIEW = "in_review"
}
```

## Features & Capabilities

### ✅ Column Sorting
- All columns sortable by clicking header
- Ascending/descending toggle
- Multi-column sorting support (via GenericDataTable)
- Sort state persistence (can be added)

### ✅ Column Customization
- Show/hide columns via "Customize Columns" menu
- Toggle individual columns
- Column preferences per tab (can be persisted)

### ✅ Row Actions
- **Edit**: Opens edit dialog (implementation pending)
- **Delete**: Opens delete confirmation with customer name
- **Add New**: Opens create form (implementation pending)

### ✅ Multi-Select
- Select individual rows
- Select all rows on current page
- Selected row highlighting
- Count of selected rows

### ✅ Pagination
- Configurable page size (default: 10)
- Navigate between pages
- Total record count display
- Records-per-page selector

### ✅ Responsive Design
- Mobile-friendly layout
- Responsive table with horizontal scroll
- Adaptive button labels

### ✅ Search & Filter
- Global search across all columns (via GenericDataTable)
- Column-specific filtering
- Real-time filter updates

## Data Source

### Configuration
```typescript
const USE_REAL_DATA = false  // Toggle: Supabase vs Placeholder
```

### Placeholder Data (`data.json`)
- 10 sample orders for development
- Includes all required fields
- Different statuses for testing all tabs
- Can be used offline

### Supabase Integration
Set `USE_REAL_DATA = true` to use real database:
```typescript
import { getOrders } from "@/app/actions/orders"

const orders = await getOrders()
```

## Sample Order Data

```json
{
  "so_id": 1,
  "s_customer_id": 101,
  "s_hostel_id": 1,
  "s_package_id": 1,
  "s_users_id": "550e8400-e29b-41d4-a716-446655440000",
  "so_time_slot": "2026-01-10T09:00:00Z",
  "so_work_status": "waiting",
  "so_payment_status": "pending",
  "created_at": "2026-01-03T10:00:00Z",
  "updated_at": "2026-01-03T10:00:00Z",
  "customer_name": "Ahmed Hassan",
  "customer_email": "ahmed.hassan@email.com",
  "customer_phone": "+20-123-456-7890",
  "hostel_name": "Al-Noor Hostel"
}
```

## CRUD Operations

All CRUD operations are available in `@/app/actions/orders`:

### Create
```typescript
import { createOrder } from "@/app/actions/orders"

const order = await createOrder({
  s_customer_id: 101,
  s_hostel_id: 1,
  s_package_id: 1,
  s_users_id: "user-uuid",
  so_time_slot: "2026-01-10T09:00:00Z"
})
```

### Read
```typescript
import { 
  getOrders, 
  getOrderById,
  getOrdersByPaymentStatus,
  getOrdersByWorkStatus 
} from "@/app/actions/orders"

const allOrders = await getOrders()
const order = await getOrderById(1)
const pending = await getOrdersByPaymentStatus("pending")
const waiting = await getOrdersByWorkStatus("waiting")
```

### Update
```typescript
import { updateOrder } from "@/app/actions/orders"

const updated = await updateOrder(1, {
  so_payment_status: "approve",
  so_work_status: "in progress"
})
```

### Delete
```typescript
import { deleteOrder } from "@/app/actions/orders"

const success = await deleteOrder(1)
```

## Performance

- **Memoization**: Filtered arrays prevent unnecessary recalculations
- **Lazy Loading**: Pagination limits rendered items
- **Virtualization**: Large datasets handled by GenericDataTable
- **Callback Optimization**: useCallback prevents function recreations
- **Code Splitting**: Components in subfolders (_config, _hooks, _components)

## Styling

Uses Shadcn/ui component library with Tailwind CSS:
- **Badge Component**: Status display with multiple variants
- **AlertDialog Component**: Delete confirmation
- **Tabs Component**: Tab navigation
- **Table Component**: Data display (via GenericDataTable)
- **Button Component**: Actions and interactions

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation (Tab, Enter, Delete)
- Screen reader friendly status badges
- High contrast text
- Focus indicators

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Bulk delete/update operations
- [ ] Advanced search with multiple criteria
- [ ] Export to CSV/PDF
- [ ] Order details view
- [ ] Order timeline/history
- [ ] Team member assignment UI
- [ ] Real-time WebSocket updates
- [ ] Offline mode with sync
- [ ] Custom column order persistence
- [ ] Filter presets/saved views

## Troubleshooting

**Q: Orders not loading?**
A: Check `USE_REAL_DATA` flag and Supabase connection if enabled.

**Q: Columns not sorting?**
A: Ensure column is visible and data type is compatible.

**Q: Delete not working?**
A: Verify Supabase RLS policies and user permissions.

**Q: Rows not selectable?**
A: Check that `enableSelection={true}` on GenericDataTable prop.
  - Optimistic UI updates
  - Toast notifications for all actions
  - Loading states for async operations

- **Data Management**
  - Easy switching between placeholder and real data
  - Proper error handling
  - State management with React hooks

## Quick Start

### 1. Switch Between Placeholder and Real Data

In `page.tsx`, modify the configuration flag:

```typescript
// Set to false to use placeholder data from data.json
// Set to true to fetch from Supabase database
const USE_REAL_DATA = false
```

### 2. File Structure

```
app/
├── admin/
│   └── orders/
│       ├── page.tsx           # Main orders page component
│       ├── data.json          # Placeholder data
│       └── README.md          # This documentation
├── actions/
│   └── orders.ts              # Server actions for CRUD operations
└── components/
    └── admin/
        └── generic-data-table.tsx  # Reusable table component
```

## Configuration

### Using Placeholder Data (Development)

```typescript
const USE_REAL_DATA = false
```

**Advantages:**
- No database connection required
- Instant development without backend setup
- Easy to test UI behavior
- Fast iteration

**Limitations:**
- Changes don't persist after page refresh
- Simulates API delays
- No real data validation

### Using Real Database (Production)

```typescript
const USE_REAL_DATA = true
```

**Requirements:**
- Supabase project configured
- Environment variables set:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Database tables created
- Row Level Security (RLS) policies configured

## Key Components

### State Management

```typescript
const [orders, setOrders] = useState<ServiceOrderExtended[]>([])
const [isLoading, setIsLoading] = useState(true)
const [isDeleting, setIsDeleting] = useState(false)
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
```

### Filtered Data (Memoized)

```typescript
const pendingPaymentOrders = useMemo(
  () => orders.filter((order) => order.so_payment_status === PaymentStatus.PENDING),
  [orders]
)
```

### CRUD Operations

#### Fetch Orders
```typescript
const fetchOrders = async () => {
  if (USE_REAL_DATA) {
    const data = await getOrders()
    setOrders(data)
  } else {
    setOrders(placeholderData)
  }
}
```

#### Delete Order
```typescript
const confirmDelete = async () => {
  if (USE_REAL_DATA) {
    await deleteOrder(orderToDelete.so_id)
  }
  setOrders(prev => prev.filter(order => order.so_id !== orderToDelete.so_id))
}
```

## Extending the Component

### Add Edit Dialog

1. Create a new dialog component:

```typescript
// components/admin/edit-order-dialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function EditOrderDialog({ order, open, onOpenChange, onSave }) {
  // Form implementation
}
```

2. Update `handleRowEdit`:

```typescript
const [editDialogOpen, setEditDialogOpen] = useState(false)
const [orderToEdit, setOrderToEdit] = useState<ServiceOrderExtended | null>(null)

const handleRowEdit = (row: ServiceOrderExtended) => {
  setOrderToEdit(row)
  setEditDialogOpen(true)
}
```

### Add Create Dialog

1. Create a form dialog:

```typescript
// components/admin/create-order-dialog.tsx
export function CreateOrderDialog({ open, onOpenChange, onSave }) {
  // Form implementation with validation
}
```

2. Update `handleAddNew`:

```typescript
const [createDialogOpen, setCreateDialogOpen] = useState(false)

const handleAddNew = () => {
  setCreateDialogOpen(true)
}
```

### Add Bulk Actions

```typescript
const handleBulkDelete = async (selectedRows: ServiceOrderExtended[]) => {
  const ids = selectedRows.map(row => row.so_id)
  
  if (USE_REAL_DATA) {
    await Promise.all(ids.map(id => deleteOrder(id)))
  }
  
  setOrders(prev => prev.filter(order => !ids.includes(order.so_id)))
}
```

## Customizing Columns

Modify the `customColumns` object to customize how columns are displayed:

```typescript
const customColumns = {
  so_id: {
    header: "Order ID",
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
  // Add more column configurations
}
```

### Column Configuration Options

- `header`: Display name for the column
- `type`: Data type (text, number, badge, etc.)
- `cell`: Custom render function
- `hidden`: Hide column by default
- `editable`: Enable inline editing (requires implementation)

## Error Handling

### Network Errors

```typescript
try {
  const data = await getOrders()
  setOrders(data)
} catch (error) {
  toast({
    title: "Error",
    description: "Failed to load orders",
    variant: "destructive",
  })
}
```

### Delete Errors

```typescript
try {
  const success = await deleteOrder(id)
  if (!success) throw new Error("Delete failed")
} catch (error) {
  toast({
    title: "Error",
    description: "Failed to delete order",
    variant: "destructive",
  })
}
```

## Performance Optimization

### Memoization

All filter operations are memoized to prevent unnecessary recalculations:

```typescript
const pendingPaymentOrders = useMemo(
  () => orders.filter(/* ... */),
  [orders]
)
```

### Callback Optimization

Event handlers are wrapped in `useCallback` to prevent unnecessary re-renders:

```typescript
const handleRowEdit = useCallback((row) => {
  // Implementation
}, [toast])
```

## Testing

### Test with Placeholder Data

1. Set `USE_REAL_DATA = false`
2. Modify `data.json` with test cases
3. Test all CRUD operations
4. Verify UI updates correctly

### Test with Real Data

1. Set `USE_REAL_DATA = true`
2. Ensure database is populated
3. Test actual API calls
4. Verify data persistence
5. Test error scenarios

## Common Issues

### Issue: Orders not loading

**Solution:** Check the `USE_REAL_DATA` flag and ensure:
- Placeholder data: `data.json` exists and is valid JSON
- Real data: Supabase credentials are correct

### Issue: Delete not working

**Solution:** Verify:
- Delete confirmation dialog appears
- Check browser console for errors
- Ensure `deleteOrder` action is imported correctly

### Issue: State not updating

**Solution:** 
- Check that `setOrders` is called with correct filter
- Verify order IDs match between deletion and state update
- Use React DevTools to inspect state changes

## Migration Checklist

### From Placeholder to Real Data

- [ ] Configure Supabase environment variables
- [ ] Create database tables and relationships
- [ ] Set up Row Level Security policies
- [ ] Test `getOrders()` function
- [ ] Test `deleteOrder()` function
- [ ] Update `USE_REAL_DATA` to `true`
- [ ] Test all CRUD operations
- [ ] Remove or archive `data.json`

## Future Enhancements

1. **Search & Filters**
   - Add search bar for order IDs
   - Filter by date range
   - Advanced filtering options

2. **Bulk Operations**
   - Bulk status updates
   - Bulk delete with confirmation
   - Export selected orders

3. **Real-time Updates**
   - Supabase real-time subscriptions
   - Live order status changes
   - Notification system

4. **Analytics Dashboard**
   - Revenue tracking
   - Status distribution charts
   - Performance metrics

5. **Export Functionality**
   - Export to CSV
   - Export to Excel
   - PDF reports

## Support

For issues or questions:
1. Check this documentation
2. Review the code comments
3. Check the browser console for errors
4. Review Supabase logs (for real data mode)

## Version History

- **v1.0.0** - Initial implementation with placeholder/real data switching
- Features: CRUD operations, confirmation dialogs, toast notifications, loading states
