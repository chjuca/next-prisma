import { prisma } from "@/libs/prima";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function GET() {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}

export async function POST(request) {
    const { name, email, password, role } = await request.json()

    if (!name || !email || !password || !role) {
        return NextResponse.json({ error: "Name, email, password and role are required" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name, 
            email, 
            password: hashedPassword, 
            role
        }
    });

    return NextResponse.json(newUser);
}