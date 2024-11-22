import { prisma } from "@/libs/prima";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
    const { id } = await params;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id) 
        }
    });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
}

export async function PUT(request, { params }) {
    const data = await request.json();
    const { id } = await params;

    if (!data.name || !data.email || !data.password || !data.role) {
        return NextResponse.json(
            { error: "Name, email, password and role are required" },
            { status: 400 }
        );
    }

    try {
        const userUpdated = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                ...data,
            }
        });

        return NextResponse.json(userUpdated);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function DELETE(_request, { params }) {
    const { id } = params;

    try {
        const userRemoved = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        });

        return NextResponse.json(userRemoved);
    } catch (error) {
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}