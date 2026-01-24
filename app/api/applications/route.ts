import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import JobApplication from '@/models/JobApplication';
import User from '@/models/User';

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await connectDB();
        // Find user to get ID
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        const applications = await JobApplication.find({ userId: user._id }).sort({ dateAdded: -1 });

        return NextResponse.json(applications);
    } catch (error) {
        console.error('[APPLICATIONS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const { company, position, location, salaryRange, status, dateApplied, tags, logo, notes, link } = body;

        await connectDB();
        let dbUser = await User.findOne({ email: session.user.email });

        if (!dbUser) {
            console.log(`[APPLICATIONS_POST] User not found for email: ${session.user.email}. Attempting to create.`);
            if (session.user.name && session.user.email) {
                dbUser = await User.create({
                    name: session.user.name,
                    email: session.user.email,
                    image: session.user.image,
                });
            } else {
                return new NextResponse('User not found', { status: 404 });
            }
        }

        const newApplication = await JobApplication.create({
            userId: dbUser._id,
            company,
            role: position, // Mapping API 'position' to DB 'role' if needed, or just use 'role' from body if UI sends 'role'
            location,
            salary: salaryRange,
            status,
            dateAdded: dateApplied || new Date(),
            tags,
            logo,
            notes,
            link
        });

        return NextResponse.json(newApplication);
    } catch (error: any) {
        console.error('[APPLICATIONS_POST]', error);
        return new NextResponse(error.message || 'Internal Error', { status: 500 });
    }
}
