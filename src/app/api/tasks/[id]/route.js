import { prisma } from "@/libs/prima";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
    const { id } = params;
    const task = await prisma.task.findUnique({
        where: {
            id: Number(id) 
        }
    });
    if (!task) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task);
}

export async function PUT(request, { params }) {
    const data = await request.json();
    const { id } = params;

    if (!data.title || !data.priority || !data.status) {
        return NextResponse.json(
            { error: "Title, priority, and status are required" },
            { status: 400 }
        );
    }

    try {
        const taskUpdated = await prisma.task.update({
            where: {
                id: Number(id)
            },
            data: {
                ...data,
            }
        });

        return NextResponse.json(taskUpdated);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function DELETE(_request, { params }) {
    const { id } = params;

    try {
        const taskRemoved = await prisma.task.delete({
            where: {
                id: Number(id)
            }
        });

        return NextResponse.json(taskRemoved);
    } catch (error) {
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}