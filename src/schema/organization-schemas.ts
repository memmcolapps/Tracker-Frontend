import * as z from "zod";

export const organizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  adminEmail: z.string().email("Invalid email address"),
  adminPhone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export const editOrganizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  adminPhone: z.string().min(1, "Phone number is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export type OrganizationFormData = z.infer<typeof organizationSchema>;
export type EditOrganizationFormData = z.infer<typeof editOrganizationSchema>;
