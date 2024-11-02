'use client'
import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
<<<<<<< HEAD
import { CreateUser } from '@/lib/dynamodb';
=======
import Image from 'next/image';
>>>>>>> 59d7fb024d2e756980b62e18e17cb5c1e110784e

interface InputFieldProps {
    icon: React.ComponentType<any>;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ icon: Icon, type, placeholder, value, onChange }) => (
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

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, secondary = false }) => (
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

interface AuthFormProps {
    isSignUp: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let CreateUserResponse;

        if(email && password){
            CreateUserResponse = await CreateUser(email, password);
        }
        if(CreateUserResponse){
            console.log(CreateUserResponse);
            alert("User created successfully");
        }
        
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <form>
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
                    <div className="mt-8 text-center text-gray-400">
                        <p>Already have an account?</p>
                        <Link href="/login" className="text-blue-400 hover:underline">
                            <p>Login</p>
                        </Link>

                    </div>
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
