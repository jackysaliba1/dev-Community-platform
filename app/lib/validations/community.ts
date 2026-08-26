import { z } from "zod";

export const CommunitySchema = z.object({
  name: z.string().min(3).max(100),

  description: z.string().min(10),

  category: z.string().min(2),

  image: z.string().url().optional().or(z.literal("")),
});