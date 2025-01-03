import { prisma } from "@/libs/prima";
import { NextResponse } from "next/server";

export async function GET() {
    const groups = await prisma.group.findMany()
    return NextResponse.json(groups)
}

export async function POST(request) {

    const {name, description, userIds} = await request.json()

    if (!name || !description || !userIds) {
        return NextResponse.json({ error: "Name, description and userIds are required" }, { status: 400 });
    }

    const newGroup = await prisma.group.create({
      data: {
        name,
        description,
        users: {
          connect: userIds.map(id => ({ id })),
        },
      },
    });
  
    return NextResponse.json(newGroup);
  }