'use client'

import { useRouter } from "next/navigation";
import { FaExclamationCircle, FaTrashAlt, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from "react";
import { use } from "react";

function NewUserPage({ params }) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('USER');

    const { id } = use(params);

    const onSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
            role,
        };

        try {
            const response = await fetch(id ? `/api/users/${id}` : '/api/users', {
                method: id ? 'PUT' : 'POST',
                body: JSON.stringify(userData),
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

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <form
                className="bg-white p-8 w-96 rounded-lg shadow-lg border border-gray-300"
                onSubmit={onSubmit}
            >

                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <FaExclamationCircle className="text-blue-500" /> Name:
                    </label>
                    <input
                        type="text"
                        className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                        placeholder="Name"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <FaExclamationCircle className="text-blue-500" /> Email:
                    </label>
                    <input
                        type="text"
                        className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                {/* Contraseña */}
                <div className="mb-4">
                    <label htmlFor="password" className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <FaExclamationCircle className="text-blue-500" /> Password:
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>



                {/* Role */}
                <div className="mb-4">
                    <label htmlFor="role" className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <FaExclamationCircle className="text-blue-500" /> Role:
                    </label>
                    <select
                        id="role"
                        className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                    >
                        <option value="USER">User</option>
                        <option value="ADMIN">Administrator</option>
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

export default NewUserPage;
