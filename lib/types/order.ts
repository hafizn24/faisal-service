import { PaymentStatus, WorkStatus, UserType } from "@/lib/enums"

/**
 * Service User Type
 * Maps to service_users table in Supabase
 */
export interface ServiceUser {
  su_id: string // UUID
  su_email: string
  su_is_approve?: boolean | null
  su_type?: UserType | null
  created_at?: string
  updated_at?: string
}

/**
 * Service Package Type
 * Maps to service_package table in Supabase
 */
export interface ServicePackage {
  sp_id: number
  sp_name: string
  sp_price: number
  sp_description?: string | null
  created_at?: string
  updated_at?: string
}

/**
 * Service Hostel Type
 * Maps to service_hostel table in Supabase
 */
export interface ServiceHostel {
  sh_id: number
  sh_name: string
  created_at?: string
  updated_at?: string
}

/**
 * Service Customer Type
 * Maps to service_customer table in Supabase
 */
export interface ServiceCustomer {
  sc_id: number
  sc_name: string
  sc_email: string
  sc_phone?: string | null
  sc_number_plate?: string | null
  sc_brand_model?: string | null
  created_at?: string
  updated_at?: string
}

/**
 * Service Order Type
 * Maps to service_order table in Supabase
 * This is the main order entity combining customer, package, hostel, and user data
 */
export interface ServiceOrder {
  so_id: number
  s_customer_id: number
  s_hostel_id: number
  s_package_id: number
  s_users_id: string // UUID - the mechanic/admin who handled the order
  so_time_slot: string // ISO timestamp
  so_work_status?: WorkStatus | null
  so_payment_status?: PaymentStatus | null
  created_at?: string
  updated_at?: string
}

/**
 * Extended Service Order Type
 * Includes related entity data for display
 * Used in the admin dashboard and data tables
 */
export interface ServiceOrderExtended extends ServiceOrder {
  // Customer details (can be array from Supabase join)
  customer?: ServiceCustomer | ServiceCustomer[]
  // Package details (can be array from Supabase join)
  package?: ServicePackage | ServicePackage[]
  // Hostel details (can be array from Supabase join)
  hostel?: ServiceHostel | ServiceHostel[]
  // User (mechanic/admin) details (can be array from Supabase join)
  user?: ServiceUser | ServiceUser[]
  // Display fields for UI convenience
  customer_name?: string
  customer_email?: string
  customer_phone?: string
  hostel_name?: string
}

/**
 * Create Service Order Input
 * Used for creating new orders
 */
export interface CreateServiceOrderInput {
  s_customer_id: number
  s_hostel_id: number
  s_package_id: number
  s_users_id: string
  so_time_slot: string
  so_work_status?: WorkStatus
  so_payment_status?: PaymentStatus
}

/**
 * Update Service Order Input
 * Used for updating existing orders
 */
export interface UpdateServiceOrderInput {
  so_work_status?: WorkStatus
  so_payment_status?: PaymentStatus
  so_time_slot?: string
}
