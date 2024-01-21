'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'


export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your API
        setError('');


        console.log(`Email: ${email}, Password: ${password}`);

        // const result = await signIn('credentials', {
        //     redirect: false,
        //     email,
        //     password
        // });
        try {
            const response = await axios.post('http://localhost:8000/api/user/token/', {
                email,
                password
            });

            if (response.data) {
                // Handle successful response here, e.g. by storing the token and redirecting
                console.log(response.data); // This will log the response data (token)
                Cookies.set('token', response.data.token);
                const token = Cookies.get('token');
                console.log(token); // Add this line
                router.push('/');
            } else {
                setError('Invalid username/password');
            }
        } catch (error) {
            // Handle error here
            console.error(error);
            setError('An error occurred');
        }

        router.push('/')


    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-black text-green-400 font-mono">
            <div className="w-full max-w-xs ">
                <form onSubmit={handleSubmit} className="border-green-500 border-2 bg-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="mb-4 ">
                        <label className="block text-green-400 text-sm font-bold mb-2" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="shadow appearance-none border border-green-500 border-2 bg-transparent w-full py-2 px-3 text-green-400 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-green-400 text-sm font-bold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="shadow appearance-none border border-green-500 border-2 bg-transparent  w-full py-2 px-3 text-green-400 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className='border-green-400 border-2 hover:bg-green-400 hover:text-black text-green-400 font-bold py-2 px-4 ' type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}