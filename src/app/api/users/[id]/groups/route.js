import { prisma } from "@/libs/prima";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
    const { id } = params;

    try {
        const userGroups = await prisma.group.findMany({
            where: {
                users: {
                    some: {
                        id: Number(id),
                    },
                },
            },
            include: {
                users: true,
            },
        });

        if (!userGroups.length) {
            return NextResponse.json({ error: "User is not part of any group" }, { status: 404 });
        }

        const groupMembers = userGroups.map(group => ({
            groupId: group.id,
            groupName: group.name,
            members: group.users,
        }));

        return NextResponse.json(groupMembers);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}