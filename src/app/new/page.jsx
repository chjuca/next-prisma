'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";

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

    const onSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            deadline: deadline ? new Date(deadline).toISOString() : null,
            priority: parseInt(priority, 10),
            status,
        };

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
        <div className="h-screen flex justify-center items-center">
            <form
                className="bg-slate-800 p-10 w-1/4"
                onSubmit={onSubmit}
            >
                <label htmlFor="title" className="font-bold text-sm">
                    Title:
                </label>
                <input
                    type="text"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    placeholder="Title"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="description" className="font-bold text-sm">
                    Description:
                </label>
                <textarea
                    rows="3"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    placeholder="Write description"
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>

                <label htmlFor="deadline" className="font-bold text-sm">
                    Deadline:
                </label>
                <input
                    type="date"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    id="deadline"
                    onChange={(e) => setDeadline(e.target.value)}
                    value={deadline}
                />

                <label htmlFor="priority" className="font-bold text-sm">
                    Priority:
                </label>
                <select
                    id="priority"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    onChange={(e) => setPriority(Number(e.target.value))}
                    value={priority}
                >
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                </select>

                <label htmlFor="status" className="font-bold text-sm">
                    Status:
                </label>
                <select
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    id="status"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                >
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETED">Completed</option>
                </select>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save
                </button>
                {id && (
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                        type="button"
                        onClick={deleteTask}
                    >
                        Delete
                    </button>
                )}
            </form>
        </div>
    );
}

export default NewPage;
