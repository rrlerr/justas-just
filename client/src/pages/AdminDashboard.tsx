// client/src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [sessions, setSessions] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/users/list')
      .then(res => res.json())
      .then(setUsers);

    fetch('http://localhost:3001/auth/sessions')
      .then(res => res.json())
      .then(setSessions);
  }, []);

  const toggleBlock = async (id: number, block: boolean) => {
    await fetch('http://localhost:3001/users/block', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: id, block }),
    });
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <h3 className="font-semibold mb-2">Users</h3>
      <ul className="mb-6">
        {users.map((u: any) => (
          <li key={u.id} className="border p-2 mb-2 flex justify-between">
            <span>{u.username} ({u.role}) {u.blocked ? '❌ Blocked' : '✅ Active'}</span>
            {u.role !== 'admin' && (
              <button
                className="text-sm bg-gray-200 px-2 py-1"
                onClick={() => toggleBlock(u.id, !u.blocked)}
              >
                {u.blocked ? 'Unblock' : 'Block'}
              </button>
            )}
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mb-2">Live Sessions</h3>
      <pre className="bg-gray-100 p-4 text-sm">{JSON.stringify(sessions, null, 2)}</pre>
    </div>
  );
}
