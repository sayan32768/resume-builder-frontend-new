import { z } from "zod";

export const forgetPassword = z.object({
    password: z.string().min(8, "Password must be at least 8 characters").default(),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters").default(),
});
