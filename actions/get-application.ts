"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export async function getApplicationBySlug(slug: string) {
    const session = await auth();
    if (!session?.user?.id) return null;

    const application = await prisma.application.findFirst({
        where: {
            slug,
            userId: session.user.id,
        },
        include: {
            contacts: true,
            stages: true,
            documents: true,
            checklists: true,
        },
    });

    return application;
}
