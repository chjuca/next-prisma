import { prisma } from "@/libs/prima";
import { NextResponse } from "next/server";

export async function GET(request, {params}){

    const {id} = await params

    const task = await prisma.task.findUnique({
        where: {
            id: Number(id)
        }
    })
    return NextResponse.json(task)
}

export async function PUT(request, {params}) {

    const data = await request.json()
    const {id} = await params

    const taskUpdated= await prisma.task.update({
        where: {
            id: Number(id)
        },
        data: data
    })
    return NextResponse.json(taskUpdated)
}


export async function DELETE(request, {params}){

    const {id} = await params

    try{
        const taskRemoved = await prisma.task.delete({
            where: {
                id: Number(id)
            }
        })
        return NextResponse.json(taskRemoved)
    } catch(error) {
        return NextResponse.json(error.message)
    }
}