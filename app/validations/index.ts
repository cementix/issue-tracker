import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(255, "Title length exceeds the maximum limit of 255 characters."),
  description: z.string().min(1, "Description is required."),
  orgId: z.string().min(1),
});
