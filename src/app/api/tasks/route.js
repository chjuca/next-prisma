import { prisma } from "@/libs/prima";
import { NextResponse } from "next/server";

export async function GET() {
    const tasks = await prisma.task.findMany()
    return NextResponse.json(tasks)
}

export async function POST(request) {
    const { title, description, deadline, priority, status, userId } = await request.json()

    if (!title || !priority || !status || !userId ) {
        return NextResponse.json({ error: "Title, priority, status and userId are required" }, { status: 400 });
    }

    const newTask = await prisma.task.create({
        data: {
            title,
            description,
            deadline: deadline ? new Date(deadline) : null,
            priority,
            status,
            userId
        }
    });

    return NextResponse.json(newTask);
}