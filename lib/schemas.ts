import { z } from "zod";

export const applicationSchema = z.object({
    company: z.string().min(1, "Company name is required"),
    companyLogo: z.string().url().optional().or(z.literal("")),
    title: z.string().min(1, "Job title is required"),
    jobUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    salaryMin: z.coerce.number().min(0).optional(),
    salaryMax: z.coerce.number().min(0).optional(),
    currency: z.string().default("USD"),
    location: z.string().optional(),
    workType: z.enum(["Remote", "On-site", "Hybrid"]).optional(),
    status: z.enum([
        "WISHLIST",
        "APPLIED",
        "RECRUITER_SCREEN",
        "TECHNICAL_INTERVIEW",
        "FINAL_ROUND",
        "OFFER",
        "REJECTED",
        "ARCHIVED",
    ]).default("WISHLIST"),
    dateApplied: z.coerce.date().optional(),
    notes: z.string().optional(),
});

export type ApplicationValues = z.infer<typeof applicationSchema>;
