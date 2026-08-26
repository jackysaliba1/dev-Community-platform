import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  headline: z.string().trim().min(1, "Headline is required").max(100, "Headline is too long"),
  bio: z.string().trim().min(1, "Bio is required").max(500, "Bio is too long"),
  githubURL: z
    .string()
    .trim()
    .url("Must be a valid GitHub URL")
    .optional()
    .or(z.literal("")),
  linkedInURL: z
    .string()
    .trim()
    .url("Must be a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  skills: z.array(z.string().trim()).optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;