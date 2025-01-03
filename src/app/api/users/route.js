import { prisma } from "@/libs/prima";
import { hashPassword } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}

export async function POST(request) {
    const { name, email, password, role } = await request.json()
    let { groupIds } = await request.json()

    if (!name || !email || !password || !role) {
        return NextResponse.json({ error: "Name, email, password and role are required" }, { status: 400 });
    }

    if(!groupIds) {
        groupIds = []
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
        data: {
            name, 
            email, 
            password: hashedPassword, 
            role,
            groups: {
                connect: selectedGroups.map(groupId => ({ id: groupId })),
            },
    
        }
    });

    return NextResponse.json(newUser);
}