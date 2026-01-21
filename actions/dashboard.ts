"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function getDashboardMetrics() {
    const session = await auth();
    if (!session?.user?.id) {
        return {
            totalApplications: 0,
            interviewsScheduled: 0,
            offersReceived: 0,
            rejectionRate: 0,
            statusDistribution: [],
            monthlyApplications: []
        };
    }

    const userId = session.user.id;

    const totalApplications = await prisma.application.count({
        where: { userId },
    });

    const interviewsScheduled = await prisma.application.count({
        where: {
            userId,
            status: {
                in: ["TECHNICAL_INTERVIEW", "FINAL_ROUND", "RECRUITER_SCREEN"],
            },
        },
    });

    const offersReceived = await prisma.application.count({
        where: {
            userId,
            status: "OFFER",
        },
    });

    const rejectedCount = await prisma.application.count({
        where: {
            userId,
            status: "REJECTED",
        },
    });

    const completedApplications = await prisma.application.count({
        where: {
            userId,
            status: {
                in: ["OFFER", "REJECTED"],
            },
        },
    });

    const rejectionRate = completedApplications > 0
        ? Math.round((rejectedCount / completedApplications) * 100)
        : 0;

    const statusDistribution = await prisma.application.groupBy({
        by: ['status'],
        where: { userId },
        _count: {
            status: true
        }
    });

    // Get applications over time (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const recentApplications = await prisma.application.findMany({
        where: {
            userId,
            dateApplied: {
                gte: sixMonthsAgo
            }
        },
        select: {
            dateApplied: true
        },
        orderBy: {
            dateApplied: 'asc'
        }
    });

    // Group by month
    const monthlyApplications = recentApplications.reduce((acc, app) => {
        if (!app.dateApplied) return acc;
        const month = app.dateApplied.toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const monthlyData = Object.entries(monthlyApplications).map(([name, value]) => ({
        name,
        value
    }));

    return {
        totalApplications,
        interviewsScheduled,
        offersReceived,
        rejectionRate,
        statusDistribution: statusDistribution.map(item => ({
            name: item.status as string,
            value: item._count.status
        })),
        monthlyApplications: monthlyData
    };
}
