import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import JobApplication from '@/models/JobApplication';
import User from '@/models/User';

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Await params first (Next.js 15+ requirement/pattern)
        const { id } = await params;
        const body = await req.json();

        await connectDB();
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        // Ensure user owns the application
        const application = await JobApplication.findOne({ _id: id, userId: user._id });

        if (!application) {
            return new NextResponse('Not found', { status: 404 });
        }

        // Update fields
        // Mapping: If body has 'position', map to 'role'. If body has 'salaryRange', map to 'salary'.
        const updateData: any = { ...body };
        if (body.position) updateData.role = body.position;
        if (body.salaryRange) updateData.salary = body.salaryRange;
        if (body.dateApplied) updateData.dateAdded = body.dateApplied;

        const updatedApplication = await JobApplication.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        return NextResponse.json(updatedApplication);
    } catch (error) {
        console.error('[APPLICATION_PUT]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { id } = await params;

        await connectDB();
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        const application = await JobApplication.findOneAndDelete({ _id: id, userId: user._id });

        if (!application) {
            return new NextResponse('Not found', { status: 404 });
        }

        return new NextResponse('Deleted', { status: 200 });
    } catch (error) {
        console.error('[APPLICATION_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
