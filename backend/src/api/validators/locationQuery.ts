import { z } from "zod";

export const locationQuerySchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, "Location is required")
    .max(120, "Location is too long")
    .regex(/^[a-zA-Z0-9 ,\-']+$/, "Location contains invalid characters"),
});

export type LocationQuery = z.infer<typeof locationQuerySchema>;
