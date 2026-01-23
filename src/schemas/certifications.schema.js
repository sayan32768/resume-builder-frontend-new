import { z } from "zod";

export const certificationSchema = z.object({
    issuingAuthority: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    issueDate: z
        .union([z.date(), z.string()])
        .nullable()
        .optional()
        .transform((value) => {
            if (!value) return null;
            return value instanceof Date ? value : new Date(value);
        })
        .refine(
            (date) => {
                if (!date) return true;

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                return date < today;
            },
            { message: "Issue date must be in the past" }
        ),

    link: z.url().optional().or(z.literal("")),
});
