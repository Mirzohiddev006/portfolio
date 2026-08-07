import { z } from "zod";

/**
 * Shared between the browser form and the /api/contact serverless function,
 * so the client and the server always agree on what a valid message is.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be at most 80 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(150, "Email must be at most 150 characters"),
  subject: z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .max(150, "Subject must be at most 150 characters"),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message must be at most 2000 characters"),
  // Honeypot: hidden from real users, filled in by naive spam bots. It is
  // accepted here and silently dropped server-side, so bots get no feedback.
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
