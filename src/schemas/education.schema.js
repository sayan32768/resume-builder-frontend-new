import { z } from "zod";

export const educationFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    degree: z.string().optional(),

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


    location: z.string().optional(),

    grades: z
        .object({
            type: z.enum(["Percentage", "CGPA"]).optional().nullable(),
            score: z.string().optional().nullable(),
            message: z.string().optional(),
        })
        .optional()
        .refine(
            (grade) => {
                if (!grade?.score && !grade?.type) return true;   // empty is OK
                if (grade?.score && !grade?.type) return false;
                if (grade?.type && !grade?.score) return false;

                const n = parseFloat(grade.score || "");
                if (isNaN(n)) return false;
                if (grade.type === "CGPA" && (n < 0 || n > 10)) return false;
                if (grade.type === "Percentage" && (n < 0 || n > 100)) return false;

                return true;
            },
            { message: "Enter a valid score based on the selected type" }
        ),
});
