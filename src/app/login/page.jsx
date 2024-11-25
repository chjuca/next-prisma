"use client"
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { FaExclamationCircle, FaSave, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function LoginPage(){

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });
      
          if (res?.error) {
            setError("Invalid credentials");
          } else {
            router.push("/");
          }
      };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <form
                className="bg-white p-8 w-96 rounded-lg shadow-lg border border-gray-300"
                onSubmit={onSubmit}
            >

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


                {/* Boton */}
                <div className="flex justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center">
                    <FaSignInAlt className="mr-2" /> Sign In
                </button>
                </div>

                        {/* Sección de Registro */}
                <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/users/new" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
                </div>

            </form>
        </div>
    )
}


export default LoginPage