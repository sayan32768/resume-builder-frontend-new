import { z } from "zod";

export const skillSchema = z.object({
    skillName: z.string().min(1, "Skill name is required"),
});
