import React, { useState } from 'react';
import { useAuthStore } from "../store/useAuthStore";

const LoginForm = () => {
    const {email, setEmail} = useState('');
    const {password, setPassword} = useState('');
    return (
    <form className='space-y-6'>
        <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email address
            </label>
            <div className='mt-1'>
                <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
                />
            </div>
        </div>
        <div>
				<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
					Password
				</label>
				<div className='mt-1'>
					<input
						id='password'
						name='password'
						type='password'
						autoComplete='current-password'
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
					/>
				</div>
			</div>
            </form>
    );
};

export default LoginForm