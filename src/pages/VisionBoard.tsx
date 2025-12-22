import PageHeader from '../components/PageHeader';

export default function VisionBoard() {
  return (
    <div>
      <PageHeader title='Vision Board' />
      <div className='p-6'>
        <h2 className='text-2xl font-bold mb-4'>2026 Vision Board</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='bg-zinc-900 p-4 rounded'>
            🚀 Build Profitable SaaS
          </div>
          <div className='bg-zinc-900 p-4 rounded'>💪 Peak Health</div>
        </div>
      </div>
    </div>
  );
}
