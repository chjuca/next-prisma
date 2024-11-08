'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { use } from "react";

function NewPage({params}) {

    const router = useRouter();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const { id } = use(params);

    useEffect(()=> {
        if(id) {
            fetch(`/api/tasks/${id}`)
            .then(async res => {
                const data = await res.json()
                setTitle(data.title)
                setDescription(data.description)
            })
        }

    }, [])


    const onSubmit = async (e) => {
        e.preventDefault()

        if(id){
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                body: JSON.stringify({title, description}),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
        } else {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify({title, description}),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
        }
        router.refresh()
        router.push("/")
    }

    const deleteTask = async () => {
        const res = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        })
        router.refresh()
        router.push("/")
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form className="bg-slate-800 p-10 w1/4"
                onSubmit={onSubmit}
            >
                <label htmlFor="title"
                    className="font-bold text-sm"
                > Title:</label>
                <input type="text" 
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    placeholder="Title"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="description"
                    className="font-bold text-sm"
                > Description:</label>
                <textarea rows="3"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    placeholder="Write description"
                    id="description"
                    onChange={(e)=> setDescription(e.target.value)}
                    value={description}
                ></textarea>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save
                </button>
                {
                    id && (
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4" type="button"
                            onClick={deleteTask}>
                            Delete
                        </button>
                    )
                }
            </form>
        </div>
    )
}

export default NewPage