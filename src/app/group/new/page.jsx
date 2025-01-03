'use client'

import { useState, useEffect } from 'react';
import { FaExclamationCircle, FaSave } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function CreateGroupPage() {
    const router = useRouter();
    const [name, setGroupName] = useState('');
    const [description, setDescription] = useState(''); 
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Error fetching users');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        const groupData = {
            name,
            description,
            userIds: selectedUsers.map(userId => Number(userId)),
        };

        setLoading(true);

        try {
            const response = await fetch('/api/groups', {
                method: 'POST',
                body: JSON.stringify(groupData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error during fetch operation:', errorData);
                alert(`Error: ${errorData.message}`);
                return;
            }

            alert('Group created successfully!');
            router.push('/');
        } catch (error) {
            console.error('Error creating group:', error);
            alert('Failed to create the group. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <form
                className="bg-white p-8 w-96 rounded-lg shadow-lg border border-gray-300"
                onSubmit={onSubmit}
            >
                {/* Group Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <FaExclamationCircle className="text-blue-500" /> Group Name:
                    </label>
                    <input
                        type="text"
                        className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                        placeholder="Group Name"
                        id="name"
                        onChange={(e) => setGroupName(e.target.value)}
                        value={name}
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <FaExclamationCircle className="text-blue-500" /> Description:
                    </label>
                    <textarea
                        id="description"
                        className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your group"
                        rows={4}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>

                {/* Select Users */}
                <div className="mb-4">
                    <label htmlFor="users" className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <FaExclamationCircle className="text-blue-500" /> Select Users:
                    </label>
                    <select
                        id="users"
                        className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                        multiple
                        onChange={(e) => setSelectedUsers(Array.from(e.target.selectedOptions, (option) => option.value))}
                        value={selectedUsers}
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name} ({user.email})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center"
                        disabled={loading}
                    >
                        <FaSave className="mr-2" /> {loading ? 'Saving...' : 'Save Group'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateGroupPage;
