import { z } from "zod";

export const profileSchema = z
    .object({
        fullName: z.string().min(1, "Full name is required").default(""),

        email: z
            .string()
            .email("Invalid email")
            .transform((value) => value.toLowerCase())
            .default(""),

        password: z
            .string()
            .optional()
            .or(z.literal("")), // allow empty string

        confirmPassword: z.string().optional().or(z.literal("")),
    })
    .superRefine((data, ctx) => {
        const passwordEntered = data.password && data.password.length > 0;

        // If password entered → validate rules
        if (passwordEntered) {
            if (data.password.length < 8) {
                ctx.addIssue({
                    code: "custom",
                    message: "Password must be at least 8 characters",
                    path: ["password"],
                });
            }

            if (!data.confirmPassword || data.confirmPassword.length === 0) {
                ctx.addIssue({
                    code: "custom",
                    message: "Please confirm your password",
                    path: ["confirmPassword"],
                });
            }

            if (data.password !== data.confirmPassword) {
                ctx.addIssue({
                    code: "custom",
                    message: "Passwords do not match",
                    path: ["confirmPassword"],
                });
            }
        }
    });
