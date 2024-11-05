'use client'
import { useRouter } from "next/navigation"
function NewPage() {

    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const description = e.target.description.value

        const res = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({title, description}),
            headers: {
                "Content-Type": 'application/json'
            }
        })

        const data = await res.json()
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
                />
                <label htmlFor="description"
                    className="font-bold text-sm"
                > Description:</label>
                <textarea rows="3"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    placeholder="Write description"
                    id="description"
                ></textarea>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px4 rounded">
                    Create
                </button>
            </form>
        </div>
    )
}

export default NewPage