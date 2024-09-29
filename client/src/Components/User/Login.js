import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth, clearAuth } from '../../Features/Auth/authSlice';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here
        const data = new URLSearchParams();
        data.append('grant_type', 'password');
        data.append('client_id', 'dwh-manager');
        data.append('username', 'asafonin@edu.hse.ru');
        data.append('password', 'admin');

        console.log('Request Data:', data.toString());

        axios.post('http://detulie.space:8080/realms/auth/protocol/openid-connect/token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => {

            
            const token = response.data.access_token;
            const refresh_token = response.data.refresh_token;
            const data = response.data;
            const expiresInSeconds = response.data.expires_in;
            const refreshExpiresIn = response.data.refresh_expires_in;
            data.user = email;

            document.cookie = `access_token=${token}; path=/; max-age=${expiresInSeconds}; secure; samesite=strict`;
            document.cookie = `refresh_token=${refresh_token}; path=/; max-age=${refreshExpiresIn}; secure; samesite=strict`;
            
            dispatch(setAuth({ token, data }));
            console.log("User authenticated and token is set in cookies");


            console.log("response collected!!!!!!!!!!!!!!!!!!!!!");
            
            console.log('Response:', response.data);
            navigate('/');
        })
        .catch(error => {
            console.log("ERRRRRRRRRRRRRRRRRRRRRRORRRRRRRRRRRRRRRRRRRR");
            
            console.error('Error:', error.response ? error.response.data : error.message);
        });

        console.log('response');

        console.log('Email:', email, 'Password:', password);
    };
    
    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            {/* <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div> */}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
    )
}