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
      <div className="grid grid-cols-3 gap-3 mt-10">
        {
          tasks.map(task => (
            <TaskCard key={task.id} task={task}/>
          ))
        }
      </div>
    </section>
  );
}
