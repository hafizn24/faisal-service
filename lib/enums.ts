/**
 * Payment Status Enum
 * Represents the payment status of an order
 */
export enum PaymentStatus {
  PENDING = "pending",
  APPROVED = "approve",
  DECLINED = "decline",
}

/**
 * Work Status Enum
 * Represents the work status of an order
 */
export enum WorkStatus {
  WAITING = "waiting",
  IN_PROGRESS = "in progress",
  COMPLETED = "completed",
}

/**
 * User Type Enum
 * Represents the type/role of a service user
 */
export enum UserType {
  ADMIN = "admin",
  SUPER_ADMIN = "super admin",
  MECHANIC = "mechanic",
}

/**
 * Helper function to get enum values
 */
export const paymentStatusValues = Object.values(PaymentStatus);
export const workStatusValues = Object.values(WorkStatus);
export const userTypeValues = Object.values(UserType);
