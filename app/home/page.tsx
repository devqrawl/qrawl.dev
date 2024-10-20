'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, SpaceIcon, ChevronRight } from 'lucide-react';
import Image from 'next/image'

const ColorfulText = ({ children, gradient }) => (
  <span className={`font-bold bg-clip-text text-transparent ${gradient}`}>
    {children}
  </span>
);

const GlowButton = ({ children, color, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${color}` }}
    whileTap={{ scale: 0.95 }}
    className={`bg-white text-${color} border-2 border-${color} px-6 py-3 rounded-full text-lg shadow-lg hover:bg-${color} hover:text-white transition-colors duration-300 w-full mb-4`}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

const InputField = ({ icon: Icon, type, placeholder }) => (
  <div className="mb-4 relative">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-10 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
    />
  </div>
);

export default function AuthForm ({ isSignUp }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted', { email, password, confirmPassword });
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log('Google sign in');
  };

  const handleGitHubSignIn = () => {
    // Handle GitHub sign in
    console.log('GitHub sign in');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">
          <ColorfulText gradient="bg-gradient-to-r from-blue-600 to-purple-600">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </ColorfulText>
        </h2>
        <form onSubmit={handleSubmit}>
          <InputField icon={Mail} type="email" placeholder="Email" />
          <InputField icon={Lock} type="password" placeholder="Password" />
          {isSignUp && (
            <InputField icon={Lock} type="password" placeholder="Confirm Password" />
          )}
          <GlowButton color="blue-600" onClick={handleSubmit}>
            {isSignUp ? 'Sign Up' : 'Sign In'} <ChevronRight className="inline-block ml-2" size={16} />
          </GlowButton>
        </form>
        <div className="mt-4 text-center text-gray-600">or</div>
        <GlowButton color="red-600" onClick={handleGoogleSignIn}>
          <Image src="/api/placeholder/20/20" alt="Google" className="inline-block mr-2" />
          Continue with Google
        </GlowButton>
        <GlowButton color="gray-800" onClick={handleGitHubSignIn}>
          <SpaceIcon className="inline-block mr-2" size={20} />
          Continue with GitHub
        </GlowButton>
        <p className="mt-6 text-center text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <a href="#" className="text-blue-600 hover:underline">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </a>
        </p>
      </div>
    </div>
  );
};

