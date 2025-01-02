import { prisma } from "@/libs/prima";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
    const { id } = await params;
    const group = await prisma.group.findUnique({
        where: {
            id: Number(id) 
        }
    });
    if (!group) {
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }
    return NextResponse.json(group);
}

export async function PUT(request, { params }) {
    const data = await request.json();
    const { id } = await params;


    if (!data.name || !data.description || !data.userIds) {
        return NextResponse.json(
            { error: "Name, description and userIds are required" },
            { status: 400 }
        );
    }

    try {
        const groupUpdated = await prisma.group.update({
            where: {
                id: Number(id)
            },
            data: {
                ...data,
            }
        });

        return NextResponse.json(groupUpdated);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function DELETE(_request, { params }) {
    const { id } = params;

    try {
        const groupRemoved = await prisma.group.delete({
            where: {
                id: Number(id)
            }
        });

        return NextResponse.json(groupRemoved);
    } catch (error) {
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Group not found" }, { status: 404 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}