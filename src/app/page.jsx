import TaskCard from "@/components/TaskCard";

async function loadTasks() {
    const res = await fetch("http://localhost:3000/api/tasks")
    const data = await res.json()
    return data
}
export default async function HomePage() {

  const tasks = await loadTasks()
  return (
    <section className="container mx-auto">
      <div className="grid grid-col-3">
        {
          tasks.map(task => (
            <TaskCard key={task.id} task={task}/>
          ))
        }
      </div>
    </section>
  );
}
