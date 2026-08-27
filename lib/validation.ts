import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional().or(z.literal("")),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;

export const leadApiSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional().or(z.literal("")),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  referrer: z.string().optional(),
});

export type LeadApiInput = z.infer<typeof leadApiSchema>;
