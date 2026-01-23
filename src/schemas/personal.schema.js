import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const personalFormSchema = z.object({
    fullName: z
        .string()
        // .min(1, "Full name is required")
        .transform(v =>
            v.trim().replace(/\s+/g, " ").replace(/\b\w/g, c => c.toUpperCase())
        )
        // .refine(v => /^[a-zA-Z\s]+$/.test(v), {
        //     message: "Only letters and spaces are allowed",
        // }).optional(),
        .optional(),

    email: z
        .string()
        // .min(1, "Email is required")
        .transform(v => v.toLowerCase().trim())
        // .refine((v) => !v || /^\S+@\S+$/.test(v), { message: "Invalid email address" }).optional(),
        .optional(),

    phone: z
        .string()
        // .min(1, "Phone number is required")
        // .refine(v => {
        //     const phone = parsePhoneNumberFromString(v);
        //     return phone?.isValid() ?? false;
        // }, { message: "Invalid phone number" }).optional(),
        .optional(),

    address: z.string().optional(),
    about: z.string().optional(),

    socials: z.array(
        z.object({
            name: z.enum(["LINKEDIN", "INSTAGRAM", "GITHUB"]).optional(),
            link: z.string().url("Invalid link").optional(),
        })
    ).optional(),
});
