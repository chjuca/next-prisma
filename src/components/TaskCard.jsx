"use client"
import { useRouter } from "next/navigation"
import { format } from 'date-fns';

export default function TaskCard({task}){

    const router = useRouter()

    return (
        <div 
            className="bg-slate-900 p-4 rounded-lg shadow-md hover:bg-slate-800 hover:cursor-pointer transition duration-300 ease-in-out" 
            onClick={() => router.push(`/tasks/edit/${task.id}`)}
        >
            <h3 className="font-bold text-3xl mb-2 text-white">{task.title}</h3>
            <p className="text-gray-300 mb-2">{task.description || 'No description available'}</p>
            <div className="text-gray-400 text-sm">
                <p><span className="font-semibold">Created At:</span> {format(new Date(task.createdAt), 'PPpp')}</p>
                {task.deadline && (
                    <p><span className="font-semibold">Deadline:</span> {format(new Date(task.deadline), 'PPpp')}</p>
                )}
                <p><span className="font-semibold">Priority:</span> {['Low', 'Medium', 'High'][task.priority - 1]}</p>
                <p><span className="font-semibold">Status:</span> {task.status}</p>
            </div>
        </div>
    );
}