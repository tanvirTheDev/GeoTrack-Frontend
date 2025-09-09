import { z } from "zod";

// Organization validation schemas
export const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(1, "Organization name is required")
    .max(100, "Organization name must be less than 100 characters"),
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name must be less than 100 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[\d\s\-()]+$/, "Invalid phone number format"),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
  }),
  packageType: z.enum(["basic", "premium", "platinum"], {
    message: "Please select a valid package type",
  }),
  maxUsers: z
    .number()
    .min(1, "Maximum users must be at least 1")
    .max(10000, "Maximum users cannot exceed 10,000"),
  endDate: z
    .string()
    .min(1, "Subscription end date is required")
    .refine(
      (date) => {
        const dateObj = new Date(date);
        return !isNaN(dateObj.getTime()) && dateObj > new Date();
      },
      {
        message: "Subscription end date must be a valid future date",
      }
    ),
});

export const updateOrganizationSchema = z.object({
  name: z
    .string()
    .min(1, "Organization name is required")
    .max(100, "Organization name must be less than 100 characters"),
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name must be less than 100 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[\d\s\-()]+$/, "Invalid phone number format"),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
  }),
});

export const updateSubscriptionSchema = z.object({
  packageType: z.enum(["basic", "premium", "platinum"], {
    message: "Please select a valid package type",
  }),
  maxUsers: z
    .number()
    .min(1, "Maximum users must be at least 1")
    .max(10000, "Maximum users cannot exceed 10,000"),
  endDate: z
    .string()
    .min(1, "Subscription end date is required")
    .refine(
      (date) => {
        const dateObj = new Date(date);
        return !isNaN(dateObj.getTime()) && dateObj > new Date();
      },
      {
        message: "Subscription end date must be a valid future date",
      }
    ),
});

// Type exports for TypeScript
export type CreateOrganizationFormData = z.infer<
  typeof createOrganizationSchema
>;
export type UpdateOrganizationFormData = z.infer<
  typeof updateOrganizationSchema
>;
export type UpdateSubscriptionFormData = z.infer<
  typeof updateSubscriptionSchema
>;
