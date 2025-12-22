import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function PageHeader({ title }: { title: string }) {
  const location = useLocation();

  const segments = location.pathname.split('/').filter(Boolean);

  return (
    <div className='mb-6'>
      {/* Breadcrumbs */}
      <nav className='flex items-center text-sm text-zinc-400 mb-2'>
        <Link to='/dashboard' className='hover:text-indigo-400'>
          Home
        </Link>

        {segments.map((segment, index) => {
          const path = '/' + segments.slice(0, index + 1).join('/');

          return (
            <span key={path} className='flex items-center'>
              <ChevronRight size={14} className='mx-1' />
              <Link to={path} className='capitalize hover:text-indigo-400'>
                {segment}
              </Link>
            </span>
          );
        })}
      </nav>

      {/* Title */}
      <h1 className='text-2xl font-bold text-zinc-100'>{title}</h1>
    </div>
  );
}
