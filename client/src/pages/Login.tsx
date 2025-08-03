// client/src/pages/Login.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Login() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin-login';
  const isEmployee = location.pathname === '/employee-login';

  const title = isAdmin ? 'Admin Login' : isEmployee ? 'Employee Login' : 'Login';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            {title}
          </button>
        </form>
      </div>
    </div>
  );
}
