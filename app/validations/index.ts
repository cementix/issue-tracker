import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(65535),
  assignedToUserId: z
    .string()
    .min(1, "User id is required")
    .max(255)
    .optional(),
});

export const updateIssueSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(65535).optional(),
  assignedToUserId: z.string().nullable().optional(),
});
