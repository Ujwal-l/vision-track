import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import PageHeader from '../components/PageHeader';

const data = [
  { day: 'Mon', value: 2 },
  { day: 'Tue', value: 3 },
  { day: 'Wed', value: 1 },
];

export default function Reports() {
  return (
    <div>
      <PageHeader title='Reports' />
      <div className='p-6'>
        <h2 className='text-xl font-bold mb-4'>Weekly Progress</h2>
        <LineChart width={400} height={200} data={data}>
          <XAxis dataKey='day' />
          <YAxis />
          <Tooltip />
          <Line type='monotone' dataKey='value' strokeWidth={2} />
        </LineChart>
      </div>
    </div>
  );
}
