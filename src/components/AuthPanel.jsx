import React, { useState } from 'react';
import { User, LogIn } from 'lucide-react';

export default function AuthPanel() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isRegister = mode === 'register';

  function handleSubmit(e) {
    e.preventDefault();
    // This is a static UI preview. Hook up to backend auth later.
    alert(`${isRegister ? 'Registered' : 'Logged in'} as ${isRegister ? name || email : email}`);
  }

  return (
    <section id="auth" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Welcome to YourGoals</h3>
                <p className="text-sm text-slate-500">Blue and white. Clean and focused.</p>
              </div>
            </div>
            <div className="flex overflow-hidden rounded-lg border border-slate-200">
              <button
                onClick={() => setMode('login')}
                className={`px-3 py-1.5 text-sm ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'}`}
              >
                Login
              </button>
              <button
                onClick={() => setMode('register')}
                className={`px-3 py-1.5 text-sm ${mode === 'register' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'}`}
              >
                Register
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                  required
                />
              </div>
            )}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              <LogIn className="h-4 w-4" />
              {isRegister ? 'Create account' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
