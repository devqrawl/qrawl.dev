'use client'
import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const InputField = ({ icon: Icon, type, placeholder, value, onChange }) => (
    <div className="mb-6 relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full border bg-gray-800 text-white px-10 py-3 rounded-lg focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
    </div>
);

const Button = ({ children, onClick, secondary = false }) => (
    <button
        className={`w-full py-3 rounded-lg text-lg font-semibold transition-colors ${secondary
            ? 'bg-gray-700 text-white hover:bg-gray-600'
            : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
        onClick={onClick}
    >
        {children}
    </button>
);

const AuthForm = ({ isSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', { email, password });
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <InputField
                        icon={Mail}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleSubmit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                </form>
                <div className="mt-6 flex items-center justify-between">
                    <span className="border-b border-gray-600 flex-grow"></span>
                    <span className="px-4 text-gray-400">or</span>
                    <span className="border-b border-gray-600 flex-grow"></span>
                </div>
                <div className="mt-6 space-y-4">
                    <Button secondary onClick={() => console.log('Google sign in')}>
                        <Image src="/api/placeholder/18/18" alt="Google" className="inline-block mr-2" />
                        Continue with Google
                    </Button>
                    <Button secondary onClick={() => console.log('GitHub sign in')}>
                        <User size={18} className="inline-block mr-2" />
                        Continue with GitHub
                    </Button>
                </div>
                <div>
                    <p className="mt-8 text-center text-gray-400">
                        <p>Already have an account?</p>
                        <Link href="/login" className="text-blue-400 hover:underline">
                            <p>Login</p>
                        </Link>

                    </p>
                </div>
            </div>
        </div>
    );
};

const SignIn = () => <AuthForm isSignUp={false} />;
const SignUp = () => <AuthForm isSignUp={true} />;

export default () => (
    <div>
        <SignUp />
    </div>
);
