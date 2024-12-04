import TaskCard from "@/components/TaskCard";
import { prisma } from "@/libs/prima";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function loadTasks(id) {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { userId: id },
          { assignedToId: id },
        ],
      },      
      include: {
          assignedTo: true,
        },
  })
    return tasks
}

export const dynamic="force-dynamic"

export default async function HomePage() {

  const session = await getServerSession(authOptions);

  if(!session) {
    redirect("/login")
  }

  const {user} = session

  const tasks = await loadTasks(user.id)
  return (
    <section className="container mx-auto">
      <div className="grid gap-5 mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {
          tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow" 
            />
          ))
        }
      </div>
    </section>
  );
}
