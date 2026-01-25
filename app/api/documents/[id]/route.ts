import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import DocumentModel from '@/models/Document';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const { id } = await params;
        const body = await req.json();
        await dbConnect();

        const updatedDoc = await DocumentModel.findOneAndUpdate(
            { _id: id, userId: session.user.email },
            { $set: body },
            { new: true }
        );

        if (!updatedDoc) {
            return NextResponse.json({ error: 'Document not found' }, { status: 404 });
        }

        return NextResponse.json(updatedDoc);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const { id } = await params;
        await dbConnect();

        const deletedDoc = await DocumentModel.findOneAndDelete({ _id: id, userId: session.user.email });

        if (!deletedDoc) {
            return NextResponse.json({ error: 'Document not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
    }
}
