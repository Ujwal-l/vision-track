import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/useAuth';
import type { Habit } from '../types/habits';
import HabitRow from './HabitRow';

export default function Habits() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  /* ---------- Load habits ---------- */
  useEffect(() => {
    if (!user) return;

    const loadHabits = async () => {
      const { data } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) setHabits(data);
    };

    loadHabits();
  }, [user]);

  /* ---------- Add habit ---------- */
  const addHabit = async () => {
    if (!title.trim()) return;

    setLoading(true);

    const { data } = await supabase
      .from('habits')
      .insert({
        title,
        user_id: user?.id,
        frequency: 'daily',
      })
      .select()
      .single();

    if (data) setHabits((prev) => [data, ...prev]);

    setTitle('');
    setLoading(false);
  };

  return (
    <div className='h-full flex flex-col'>
      <h1 className='text-2xl font-bold'>Habits</h1>
      <p className='text-zinc-600 mt-1'>
        Daily actions that move your visions forward
      </p>

      {/* Add habit */}
      <div className='mt-4 flex gap-2'>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='New habit'
          className='flex-1 border border-zinc-300 rounded-lg px-3 py-2'
        />
        <button
          onClick={addHabit}
          disabled={loading}
          className='bg-indigo-600 text-white px-4 rounded-lg'
        >
          Add
        </button>
      </div>

      {/* Habit list */}
      <div className='mt-6 space-y-3 overflow-y-auto'>
        {habits.map((habit) => (
          <HabitRow key={habit.id} habit={habit} date={today} />
        ))}

        {habits.length === 0 && (
          <p className='text-zinc-500 text-sm text-center mt-10'>
            No habits yet. Add your first daily habit.
          </p>
        )}
      </div>
    </div>
  );
}
