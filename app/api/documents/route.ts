import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import DocumentModel from '@/models/Document';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const docs = await DocumentModel.find({ userId: session.user.email }).sort({ updatedAt: -1 });
        return NextResponse.json(docs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        await dbConnect();

        const newDoc = await DocumentModel.create({
            userId: session.user.email,
            title: body.title || 'Untitled',
            content: body.content || '',
            type: body.type || 'note',
        });

        return NextResponse.json(newDoc);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
    }
}
