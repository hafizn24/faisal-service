"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type {
  ServiceOrder,
  ServiceOrderExtended,
  CreateServiceOrderInput,
  UpdateServiceOrderInput,
} from "@/lib/types/order"
import { WorkStatus, PaymentStatus } from "@/lib/enums"

/**
 * Create Supabase client for server-side operations
 */
async function getSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore errors in setAll
          }
        },
      },
    }
  )
}

/**
 * Create a new service order
 */
export async function createOrder(
  input: CreateServiceOrderInput
): Promise<ServiceOrder | null> {
  try {
    const supabase = await getSupabaseClient()

    const { data, error } = await supabase
      .from("service_order")
      .insert([
        {
          s_customer_id: input.s_customer_id,
          s_hostel_id: input.s_hostel_id,
          s_package_id: input.s_package_id,
          s_users_id: input.s_users_id,
          so_time_slot: input.so_time_slot,
          so_work_status: input.so_work_status || WorkStatus.WAITING,
          so_payment_status: input.so_payment_status || PaymentStatus.PENDING,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating order:", error)
      return null
    }

    return data as ServiceOrder
  } catch (error) {
    console.error("Error in createOrder:", error)
    return null
  }
}

/**
 * Fetch all service orders
 */
export async function getOrders(): Promise<ServiceOrderExtended[]> {
  try {
    const supabase = await getSupabaseClient()

    const { data, error } = await supabase
      .from("service_order")
      .select(
        `
        so_id,
        s_customer_id,
        s_hostel_id,
        s_package_id,
        s_users_id,
        so_time_slot,
        so_work_status,
        so_payment_status,
        created_at,
        updated_at,
        customer:s_customer_id(sc_id, sc_name, sc_email, sc_phone, sc_number_plate, sc_brand_model),
        package:s_package_id(sp_id, sp_name, sp_price, sp_description),
        hostel:s_hostel_id(sh_id, sh_name),
        user:s_users_id(su_id, su_email, su_type, su_is_approve)
      `
      )
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching orders:", error)
      return []
    }

    return data as unknown as ServiceOrderExtended[]
  } catch (error) {
    console.error("Error in getOrders:", error)
    return []
  }
}

/**
 * Fetch a single service order by ID
 */
export async function getOrderById(
  id: number
): Promise<ServiceOrderExtended | null> {
  try {
    const supabase = await getSupabaseClient()

    const { data, error } = await supabase
      .from("service_order")
      .select(
        `
        so_id,
        s_customer_id,
        s_hostel_id,
        s_package_id,
        s_users_id,
        so_time_slot,
        so_work_status,
        so_payment_status,
        created_at,
        updated_at,
        customer:s_customer_id(sc_id, sc_name, sc_email, sc_phone, sc_number_plate, sc_brand_model),
        package:s_package_id(sp_id, sp_name, sp_price, sp_description),
        hostel:s_hostel_id(sh_id, sh_name),
        user:s_users_id(su_id, su_email, su_type, su_is_approve)
      `
      )
      .eq("so_id", id)
      .single()

    if (error) {
      console.error("Error fetching order:", error)
      return null
    }

    return data as unknown as ServiceOrderExtended
  } catch (error) {
    console.error("Error in getOrderById:", error)
    return null
  }
}

/**
 * Fetch orders filtered by payment status
 */
export async function getOrdersByPaymentStatus(
  status: PaymentStatus
): Promise<ServiceOrderExtended[]> {
  try {
    const supabase = await getSupabaseClient()

    const { data, error } = await supabase
      .from("service_order")
      .select(
        `
        so_id,
        s_customer_id,
        s_hostel_id,
        s_package_id,
        s_users_id,
        so_time_slot,
        so_work_status,
        so_payment_status,
        created_at,
        updated_at,
        customer:s_customer_id(sc_id, sc_name, sc_email, sc_phone, sc_number_plate, sc_brand_model),
        package:s_package_id(sp_id, sp_name, sp_price, sp_description),
        hostel:s_hostel_id(sh_id, sh_name),
        user:s_users_id(su_id, su_email, su_type, su_is_approve)
      `
      )
      .eq("so_payment_status", status)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching orders by payment status:", error)
      return []
    }

    return data as unknown as ServiceOrderExtended[]
  } catch (error) {
    console.error("Error in getOrdersByPaymentStatus:", error)
    return []
  }
}

/**
 * Fetch orders filtered by work status
 */
export async function getOrdersByWorkStatus(
  status: WorkStatus
): Promise<ServiceOrderExtended[]> {
  try {
    const supabase = await getSupabaseClient()

    const { data, error } = await supabase
      .from("service_order")
      .select(
        `
        so_id,
        s_customer_id,
        s_hostel_id,
        s_package_id,
        s_users_id,
        so_time_slot,
        so_work_status,
        so_payment_status,
        created_at,
        updated_at,
        customer:s_customer_id(sc_id, sc_name, sc_email, sc_phone, sc_number_plate, sc_brand_model),
        package:s_package_id(sp_id, sp_name, sp_price, sp_description),
        hostel:s_hostel_id(sh_id, sh_name),
        user:s_users_id(su_id, su_email, su_type, su_is_approve)
      `
      )
      .eq("so_work_status", status)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching orders by work status:", error)
      return []
    }

    return data as unknown as ServiceOrderExtended[]
  } catch (error) {
    console.error("Error in getOrdersByWorkStatus:", error)
    return []
  }
}

/**
 * Update a service order
 */
export async function updateOrder(
  id: number,
  input: UpdateServiceOrderInput
): Promise<ServiceOrder | null> {
  try {
    const supabase = await getSupabaseClient()

    const updateData: Record<string, any> = {}

    if (input.so_work_status !== undefined) {
      updateData.so_work_status = input.so_work_status
    }
    if (input.so_payment_status !== undefined) {
      updateData.so_payment_status = input.so_payment_status
    }
    if (input.so_time_slot !== undefined) {
      updateData.so_time_slot = input.so_time_slot
    }

    const { data, error } = await supabase
      .from("service_order")
      .update(updateData)
      .eq("so_id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating order:", error)
      return null
    }

    return data as ServiceOrder
  } catch (error) {
    console.error("Error in updateOrder:", error)
    return null
  }
}

/**
 * Delete a service order
 */
export async function deleteOrder(id: number): Promise<boolean> {
  try {
    const supabase = await getSupabaseClient()

    const { error } = await supabase
      .from("service_order")
      .delete()
      .eq("so_id", id)

    if (error) {
      console.error("Error deleting order:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in deleteOrder:", error)
    return false
  }
}
