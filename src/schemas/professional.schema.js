import { z } from "zod";

export const experienceSchema = z.object({
    companyName: z.string().min(1, "Name is required"),
    companyAddress: z.string().optional(),
    position: z.string().optional(),
    dates: z
        .object({
            startDate: z
                .union([z.date(), z.string()])
                .nullable()
                .optional()
                .transform((v) => (v ? new Date(v) : null)),

            endDate: z
                .union([z.date(), z.string()])
                .nullable()
                .optional()
                .transform((v) => (v ? new Date(v) : null)),
        })
        .optional()
        .refine(
            (obj) => {
                if (!obj?.startDate || !obj?.endDate) return true;
                return obj.startDate < obj.endDate;
            },
            {
                message: "Enter valid dates",
            }
        ),
    workDescription: z.string().optional(),
});
