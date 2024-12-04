import { prisma } from "@/libs/prima";
import { NextResponse } from "next/server";

export async function GET() {
    const tasks = await prisma.task.findMany()
    return NextResponse.json(tasks)
}

export async function POST(request) {
    const { title, description, deadline, priority, status, userId, assignedToId} = await request.json()
    let assignedId = assignedToId

    if (!title || !priority || !status || !userId ) {
        return NextResponse.json({ error: "Title, priority, status and userId are required" }, { status: 400 });
    }
    
    if (!assignedId) {
        assignedId = userId
    }

    const newTask = await prisma.task.create({
        data: {
            title,
            description,
            deadline: deadline ? new Date(deadline) : null,
            priority,
            status,
            userId,
            assignedToId: assignedId
        }
    });

    return NextResponse.json(newTask);
}