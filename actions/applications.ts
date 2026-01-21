"use server";

import prisma from "@/lib/prisma";
import { applicationSchema, ApplicationValues } from "@/lib/schemas";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createApplication(data: ApplicationValues) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const validatedFields = applicationSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const {
        company,
        companyLogo,
        title,
        jobUrl,
        salaryMin,
        salaryMax,
        currency,
        location,
        workType,
        status,
        notes,
        dateApplied
    } = validatedFields.data;

    // Generate a simple slug
    const slug = `${company.toLowerCase().replace(/\s+/g, '-')}-${title.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(7)}`;

    try {
        await prisma.application.create({
            data: {
                userId: session.user.id,
                company,
                companyLogo,
                title,
                jobUrl,
                salaryMin,
                salaryMax,
                currency,
                location,
                workType,
                status,
                notes,
                slug,
                dateApplied: dateApplied || new Date(),
            },
        });

        revalidatePath("/dashboard/applications");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to create application:", error);
        return { error: "Failed to create application" };
    }
}

export async function getUserApplications() {
    const session = await auth();
    if (!session?.user?.id) {
        return [];
    }

    const applications = await prisma.application.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: 'desc' },
    });

    return applications;
}

export async function updateApplicationStatus(id: string, status: string) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    try {
        await prisma.application.update({
            where: {
                id,
                userId: session.user.id
            },
            data: {
                status: status as any
            },
        });

        revalidatePath("/dashboard/applications");
        return { success: true };
    } catch (error) {
        return { error: "Failed to update status" };
    }
}

export async function updateApplication(id: string, data: ApplicationValues) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const validatedFields = applicationSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    try {
        await prisma.application.update({
            where: {
                id,
                userId: session.user.id
            },
            data: {
                ...validatedFields.data,
                updatedAt: new Date()
            },
        });

        revalidatePath("/dashboard/applications");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to update application:", error);
        return { error: "Failed to update application" };
    }
}
