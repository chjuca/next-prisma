'use client'

import { useRouter } from "next/navigation";
import { FaCalendarAlt, FaExclamationCircle, FaCheckCircle, FaTrashAlt, FaSave } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { use } from "react";
import { useSession } from "next-auth/react";

function NewPage({ params }) {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState(1);
    const [status, setStatus] = useState('PENDING');

    const { id } = use(params);

    useEffect(() => {
        if (id) {
            fetch(`/api/tasks/${id}`)
                .then(async (res) => {
                    const data = await res.json();
                    setTitle(data.title);
                    setDescription(data.description || '');
                    setDeadline(data.deadline ? new Date(data.deadline).toISOString().substring(0, 10) : '');
                    setPriority(data.priority || 1);
                    setStatus(data.status || 'PENDING');
                })
                .catch((err) => console.error("Error fetching task:", err));
        }
    }, [id]);

    const { data: session, status: isLoading } = useSession(); 

    if (isLoading === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg font-semibold text-gray-700">Loading, please wait...</p>
                </div>
            </div>
        );
    }

    if (isLoading === "unauthenticated") {
        router.push("/login");
    }

    const {user} = session

    const onSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            deadline: deadline ? new Date(deadline).toISOString() : null,
            priority: parseInt(priority, 10),
            status,
        };
        
        if(!id){
            taskData.userId = user.id
        }

        try {
            const response = await fetch(id ? `/api/tasks/${id}` : '/api/tasks', {
                method: id ? 'PUT' : 'POST',
                body: JSON.stringify(taskData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error during fetch operation:', errorData);
                alert(`Error: ${errorData.message}`);
                return;
            }

            router.push("/");
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to save the task. Please try again.');
        }
    };

    const deleteTask = async () => {
        if (id) {
            await fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
            });
            router.push("/");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <form
                className="bg-white p-8 w-96 rounded-lg shadow-lg border border-gray-300"
                onSubmit={onSubmit}
            >

                {/* Título */}
                <div className="mb-4">
                    <label htmlFor="title" className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <FaExclamationCircle className="text-blue-500" /> Title:
                    </label>
                    <input
                        type="text"
                        className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                        placeholder="Task Title"
                        id="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>

                {/* Descripción */}
                <div className="mb-4">
                    <label htmlFor="description" className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <FaExclamationCircle className="text-blue-500" /> Description:
                    </label>
                    <textarea
                        rows="4"
                        className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                        placeholder="Write the task description"
                        id="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    ></textarea>
                </div>

                {/* Deadline */}
                <div className="mb-4">
                    <label htmlFor="deadline" className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-500" /> Deadline:
                    </label>
                    <input
                        type="date"
                        className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                        id="deadline"
                        onChange={(e) => setDeadline(e.target.value)}
                        value={deadline}
                    />
                </div>

                {/* Prioridad */}
                <div className="mb-4">
                    <label htmlFor="priority" className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <FaExclamationCircle className="text-blue-500" /> Priority:
                    </label>
                    <select
                        id="priority"
                        className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setPriority(Number(e.target.value))}
                        value={priority}
                    >
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                    </select>
                </div>

                {/* Estado */}
                <div className="mb-6">
                    <label htmlFor="status" className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <FaCheckCircle className="text-blue-500" /> Status:
                    </label>
                    <select
                        className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                        id="status"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                    >
                        <option value="PENDING">Pending</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>

                {/* Botones */}
                <div className="flex justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center">
                    <FaSave className="mr-2" /> Save
                </button>
                    {id && (
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                            type="button"
                            onClick={deleteTask}
                        >
                            <FaTrashAlt className="inline mr-2" />
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default NewPage;
