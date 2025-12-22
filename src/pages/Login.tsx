import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }

    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-zinc-50 to-zinc-100'>
      <div className='w-full max-w-md bg-white border border-zinc-200 rounded-2xl shadow-sm p-8'>
        {/* Logo / Brand */}
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-indigo-600'>VisionTrack</h1>
          <p className='text-sm text-zinc-500 mt-2'>Sign in to continue</p>
        </div>

        {/* Form */}
        <div className='mt-8 space-y-4'>
          <input
            type='email'
            placeholder='Email address'
            className='w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900
            focus:outline-none focus:ring-2 focus:ring-indigo-500'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type='password'
            placeholder='Password'
            className='w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900
            focus:outline-none focus:ring-2 focus:ring-indigo-500'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className='text-sm text-red-500 text-center'>{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className='w-full bg-indigo-600 text-white py-2 rounded-lg
            hover:bg-indigo-500 transition font-medium'
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>

          <button
            onClick={handleSignup}
            disabled={loading}
            className='w-full border border-zinc-300 py-2 rounded-lg
            hover:bg-zinc-100 transition font-medium text-zinc-700'
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}
