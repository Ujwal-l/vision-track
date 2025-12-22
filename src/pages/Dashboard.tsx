import PageHeader from '../components/PageHeader';

export default function Dashboard() {
  return (
    <div>
      <PageHeader title='Dashboard' />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='bg-zinc-900 p-4 rounded-xl border border-zinc-800'>
          Total Visions
        </div>
        <div className='bg-zinc-900 p-4 rounded-xl border border-zinc-800'>
          Active Habits
        </div>
        <div className='bg-zinc-900 p-4 rounded-xl border border-zinc-800'>
          Completion %
        </div>
      </div>
    </div>
  );
}
