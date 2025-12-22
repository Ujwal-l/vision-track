import PageHeader from '../components/PageHeader';

export default function Habits() {
  return (
    <div>
      <PageHeader title='Reports' />
      <div className='p-6'>
        <h2 className='text-xl font-bold mb-4'>Today's Habits</h2>
        <div className='space-y-3'>
          <label className='flex gap-2'>
            <input type='checkbox' />
            Code 1 hour
          </label>
          <label className='flex gap-2'>
            <input type='checkbox' />
            Exercise
          </label>
        </div>
      </div>
    </div>
  );
}
