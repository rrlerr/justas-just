import { useState } from "react";

export default function EmployeeLogin() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle employee login logic here
    alert(`Employee login:\nID: ${employeeId}\nPassword: ${password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--midnight)] text-white">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Employee Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="employeeId" className="block text-sm mb-1">Employee ID</label>
            <input
              id="employeeId"
              type="text"
              value={employeeId}
              onChange={e => setEmployeeId(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
              placeholder="EMP1234"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--electric)] text-[var(--midnight)] py-2 rounded-lg font-bold hover:opacity-90 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
