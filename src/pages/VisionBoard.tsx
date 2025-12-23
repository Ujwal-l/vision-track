import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/useAuth';
import type { Vision } from '../types/vision';

export default function VisionBoard() {
  const { user } = useAuth();

  const [visions, setVisions] = useState<Vision[]>([]);
  const [selectedVision, setSelectedVision] = useState<Vision | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  /* ---------- Load visions ---------- */
  useEffect(() => {
    if (!user) return;

    supabase
      .from('visions')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setVisions(data);
      });
  }, [user]);

  /* ---------- Add vision ---------- */
  const addVision = async () => {
    if (!title.trim()) return;

    const { data } = await supabase
      .from('visions')
      .insert({
        title,
        description,
        user_id: user?.id,
      })
      .select()
      .single();

    if (data) {
      setVisions((v) => [data, ...v]);
      setTitle('');
      setDescription('');
    }
  };

  /* ---------- Update ---------- */
  const updateVision = async (id: string, updates: Partial<Vision>) => {
    setVisions((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
    await supabase.from('visions').update(updates).eq('id', id);
  };

  /* ---------- Delete ---------- */
  const deleteVision = async (id: string) => {
    if (!confirm('Delete this vision?')) return;
    await supabase.from('visions').delete().eq('id', id);
    setVisions((v) => v.filter((x) => x.id !== id));
    setSelectedVision(null);
  };

  /* ===================== LIST VIEW ===================== */
  if (!selectedVision) {
    return (
      <div className='px-4 pb-24 max-w-md mx-auto'>
        <h1 className='text-xl font-bold mb-4'>Vision Board</h1>

        {/* Vision List */}
        <div className='space-y-3'>
          {visions.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVision(v)}
              className='w-full flex items-center justify-between bg-white rounded-2xl p-4 border border-zinc-200 shadow-sm active:scale-[0.98]'
            >
              <div className='text-left'>
                <p className='font-medium text-sm leading-snug break-words line-clamp-2'>
                  {v.title}
                </p>
                <p className='text-xs text-zinc-500'>
                  {v.progress}% • {v.status.replace('_', ' ')}
                </p>
              </div>

              <div className='text-indigo-600 text-xl'>›</div>
            </button>
          ))}
        </div>

        {/* Add Vision */}
        <div className='mt-6 bg-white border border-zinc-200 rounded-2xl p-4 space-y-3'>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='New vision title'
            className='w-full border border-zinc-300 rounded-xl px-4 py-3'
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Why does this matter?'
            rows={2}
            className='w-full border border-zinc-300 rounded-xl px-4 py-3'
          />
          <button
            onClick={addVision}
            className='w-full bg-indigo-600 text-white py-3 rounded-xl font-medium'
          >
            Add Vision
          </button>
        </div>
      </div>
    );
  }

  /* ===================== FOCUS VIEW ===================== */
  return (
    <div className='px-4 pb-24 max-w-md mx-auto'>
      <button
        onClick={() => setSelectedVision(null)}
        className='text-sm text-indigo-600 mb-4'
      >
        ← Back
      </button>

      {/* Header */}
      <div className='rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6 mb-6'>
        <p className='text-sm opacity-80'>
          {selectedVision.status.replace('_', ' ')}
        </p>
        <h2 className='text-xl font-semibold mt-1'>{selectedVision.title}</h2>
      </div>

      {/* Progress */}
      <div className='bg-white rounded-2xl p-4 border border-zinc-200 mb-4'>
        <p className='text-sm text-zinc-500 mb-2'>
          Progress: {selectedVision.progress}%
        </p>
        <input
          type='range'
          min={0}
          max={100}
          value={selectedVision.progress}
          onChange={(e) =>
            updateVision(selectedVision.id, {
              progress: Number(e.target.value),
            })
          }
          className='w-full accent-indigo-600'
        />
      </div>

      {/* Notes */}
      <div className='bg-white rounded-2xl p-4 border border-zinc-200 mb-4'>
        <textarea
          value={selectedVision.notes ?? ''}
          onChange={(e) =>
            updateVision(selectedVision.id, { notes: e.target.value })
          }
          placeholder='Reflection / current state'
          rows={4}
          className='w-full border border-zinc-300 rounded-xl px-3 py-2'
        />
      </div>

      {/* Status */}
      <select
        value={selectedVision.status}
        onChange={(e) =>
          updateVision(selectedVision.id, {
            status: e.target.value as Vision['status'],
          })
        }
        className='w-full border border-zinc-300 rounded-xl px-4 py-3 mb-4'
      >
        <option value='not_started'>Not started</option>
        <option value='in_progress'>In progress</option>
        <option value='on_track'>On track</option>
        <option value='at_risk'>At risk</option>
        <option value='completed'>Completed</option>
      </select>

      {/* Delete */}
      <button
        onClick={() => deleteVision(selectedVision.id)}
        className='w-full text-red-500 py-3 rounded-xl border border-red-200'
      >
        Delete Vision
      </button>
    </div>
  );
}
