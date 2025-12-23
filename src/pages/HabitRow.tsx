import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/useAuth';
import type { Habit } from '../types/habits';

export default function HabitRow({
  habit,
  date,
}: {
  habit: Habit;
  date: string;
}) {
  const { user } = useAuth();
  const [done, setDone] = useState(false);

  /* ---------- Check if completed today ---------- */
  useEffect(() => {
    const checkCompletion = async () => {
      const { data } = await supabase
        .from('habit_completions')
        .select('id')
        .eq('habit_id', habit.id)
        .eq('completed_on', date)
        .single();

      setDone(!!data);
    };

    checkCompletion();
  }, [habit.id, date]);

  /* ---------- Toggle completion ---------- */
  const toggle = async () => {
    if (!user) return;

    if (done) {
      await supabase
        .from('habit_completions')
        .delete()
        .eq('habit_id', habit.id)
        .eq('completed_on', date);

      setDone(false);
    } else {
      await supabase.from('habit_completions').insert({
        habit_id: habit.id,
        user_id: user.id,
        completed_on: date,
      });

      setDone(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition
        ${
          done
            ? 'bg-indigo-50 border-indigo-300'
            : 'bg-white border-zinc-200 hover:bg-zinc-50'
        }`}
    >
      <span
        className={`font-medium ${done ? 'line-through text-zinc-400' : ''}`}
      >
        {habit.title}
      </span>

      <span
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
          ${
            done
              ? 'bg-indigo-600 border-indigo-600 text-white'
              : 'border-zinc-300'
          }`}
      >
        {done && '✓'}
      </span>
    </button>
  );
}
