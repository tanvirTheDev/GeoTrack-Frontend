import { z } from "zod";

// Organization Admin validation schemas
export const createOrganizationAdminSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain at least one number")
    .regex(
      /(?=.*[@$!%*?&])/,
      "Password must contain at least one special character (@$!%*?&)"
    ),
  organizationId: z.string().min(1, "Organization is required"),
  status: z.enum(["active", "inactive", "suspended"]).optional(),
  permissions: z.object({
    canManageUsers: z.boolean(),
    canViewReports: z.boolean(),
    canManageSettings: z.boolean(),
    canViewAnalytics: z.boolean(),
    canManageDeliveryUsers: z.boolean(),
    canViewLiveTracking: z.boolean(),
  }),
});

export const updateOrganizationAdminSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  status: z.enum(["active", "inactive", "suspended"]).optional(),
  permissions: z
    .object({
      canManageUsers: z.boolean().optional(),
      canViewReports: z.boolean().optional(),
      canManageSettings: z.boolean().optional(),
      canViewAnalytics: z.boolean().optional(),
      canManageDeliveryUsers: z.boolean().optional(),
      canViewLiveTracking: z.boolean().optional(),
    })
    .optional(),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(/(?=.*\d)/, "Password must contain at least one number")
      .regex(
        /(?=.*[@$!%*?&])/,
        "Password must contain at least one special character (@$!%*?&)"
      ),
    confirmPassword: z.string().min(8, "Password confirmation is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const updatePermissionsSchema = z.object({
  permissions: z.object({
    canManageUsers: z.boolean().optional(),
    canViewReports: z.boolean().optional(),
    canManageSettings: z.boolean().optional(),
    canViewAnalytics: z.boolean().optional(),
    canManageDeliveryUsers: z.boolean().optional(),
    canViewLiveTracking: z.boolean().optional(),
  }),
});

// Type exports for TypeScript
export type CreateOrganizationAdminFormData = z.infer<
  typeof createOrganizationAdminSchema
>;
export type UpdateOrganizationAdminFormData = z.infer<
  typeof updateOrganizationAdminSchema
>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type UpdatePermissionsFormData = z.infer<typeof updatePermissionsSchema>;
