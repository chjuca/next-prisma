import TaskCard from "@/components/TaskCard";
import { prisma } from "@/libs/prima";

async function loadTasks() {
    const tasks = await prisma.task.findMany()
    return tasks
}


export const dynamic="force-dynamic"

export default async function HomePage() {

  const tasks = await loadTasks()
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
