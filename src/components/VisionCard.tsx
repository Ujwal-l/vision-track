import type { Vision } from '../types/vision';

const STATUS_STYLES: Record<string, string> = {
  not_started: 'bg-zinc-400',
  in_progress: 'bg-blue-500',
  on_track: 'bg-green-500',
  at_risk: 'bg-orange-500',
  completed: 'bg-indigo-600',
};

export default function VisionCard({
  vision,
  onUpdate,
  onDelete,
}: {
  vision: Vision;
  onUpdate: (updates: Partial<Vision>) => void;
  onDelete: () => void;
}) {
  return (
    <div className='group relative overflow-hidden rounded-3xl bg-white border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300'>
      {/* ===== Header / Journey ===== */}
      <div className='relative h-36 sm:h-40 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'>
        {/* Decorative overlay */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]' />

        {/* Status pill */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium text-white rounded-full shadow ${
            STATUS_STYLES[vision.status]
          }`}
        >
          {vision.status.replace('_', ' ')}
        </span>
      </div>

      {/* ===== Content ===== */}
      <div className='p-4 sm:p-5 space-y-4'>
        {/* Title */}
        <div>
          <h3 className='text-base sm:text-lg font-semibold text-zinc-900 leading-snug'>
            {vision.title}
          </h3>

          {vision.description && (
            <p className='text-sm text-zinc-600 mt-1 line-clamp-3'>
              {vision.description}
            </p>
          )}
        </div>

        {/* Progress */}
        <div>
          <div className='flex justify-between text-xs text-zinc-500 mb-1'>
            <span>Progress</span>
            <span className='font-medium'>{vision.progress}%</span>
          </div>

          <div className='h-2 rounded-full bg-zinc-200 overflow-hidden'>
            <div
              className='h-full bg-indigo-600 transition-all duration-300'
              style={{ width: `${vision.progress}%` }}
            />
          </div>

          <input
            type='range'
            min={0}
            max={100}
            value={vision.progress}
            onChange={(e) => onUpdate({ progress: Number(e.target.value) })}
            className='w-full mt-2 accent-indigo-600'
          />
        </div>

        {/* Notes */}
        <textarea
          value={vision.notes ?? ''}
          onChange={(e) => onUpdate({ notes: e.target.value })}
          placeholder='Reflection / current reality'
          className='w-full resize-none text-sm border border-zinc-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          rows={2}
        />

        {/* Actions */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
          <select
            value={vision.status}
            onChange={(e) =>
              onUpdate({ status: e.target.value as Vision['status'] })
            }
            className='w-full sm:w-auto text-sm border border-zinc-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            <option value='not_started'>Not started</option>
            <option value='in_progress'>In progress</option>
            <option value='on_track'>On track</option>
            <option value='at_risk'>At risk</option>
            <option value='completed'>Completed</option>
          </select>

          <button
            onClick={onDelete}
            className='text-sm text-red-500 hover:text-red-600 transition'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
