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
 * Team Member Role Enum
 * Represents different team member roles for assignment
 */
export enum TeamMemberRole {
  MECHANIC = "mechanic",
  SUPERVISOR = "supervisor",
  MANAGER = "manager",
  ADMIN = "admin",
}

/**
 * Approval Status Enum
 * Represents the approval status of orders or tasks
 */
export enum ApprovalStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  IN_REVIEW = "in_review",
}

/**
 * Helper function to get enum values
 */
export const paymentStatusValues = Object.values(PaymentStatus);
export const workStatusValues = Object.values(WorkStatus);
export const userTypeValues = Object.values(UserType);
export const teamMemberRoleValues = Object.values(TeamMemberRole);
export const approvalStatusValues = Object.values(ApprovalStatus);
