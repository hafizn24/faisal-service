# Orders Management Page Documentation

## Overview

The Orders Management Page is a comprehensive interface for managing service orders with support for filtering by payment status and work status. It features real-time updates, confirmation dialogs, and seamless switching between placeholder and real database data.

## Features

- **Three Tab Views**
  - Pending Payments
  - Pending Work
  - Completed Work

- **Full CRUD Operations**
  - View orders in paginated tables
  - Edit orders (ready for implementation)
  - Delete orders with confirmation
  - Add new orders (ready for implementation)

- **Real-time Updates**
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
