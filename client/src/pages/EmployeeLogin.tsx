import { useState } from "react";
import { useLocation } from "wouter";

export default function EmployeeLogin() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "employee@example.com" && password === "employee123") {
      localStorage.setItem("userRole", "employee");
      navigate("/employee-dashboard");
    } else {
      setError("Invalid employee credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="bg-white/10 p-8 rounded-lg space-y-4 w-full max-w-sm">
        <h2 className="text-2xl font-bold">Employee Login</h2>
        <input
          type="email"
          placeholder="Employee Email"
          className="w-full p-2 rounded bg-white/5 border border-white/20"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-white/5 border border-white/20"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="btn-gradient w-full py-2 rounded">Login</button>
      </form>
    </div>
  );
}
