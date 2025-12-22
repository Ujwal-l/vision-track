import { type ReactNode, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/useAuth';
import {
  LayoutDashboard,
  Target,
  CheckSquare,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  User,
  Settings,
} from 'lucide-react';

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- Click Outside ---------------- */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  /* ---------------- Logout ---------------- */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfileOpen(false);
    navigate('/login');
  };

  /* ---------------- Theme ---------------- */
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    setProfileOpen(false);
  };

  return (
    <div className='min-h-screen flex bg-gradient-to-br from-white via-zinc-50 to-zinc-100 text-zinc-900'>
      {/* ================= Sidebar ================= */}
      <aside
        className={`${collapsed ? 'w-20' : 'w-72'} transition-all duration-300
        bg-white/70 backdrop-blur-xl
        border-r border-zinc-200
        flex flex-col`}
      >
        {/* Logo */}
        <div className='h-16 flex items-center justify-center border-b border-zinc-200'>
          <span className='text-lg font-bold tracking-wide text-indigo-600'>
            {collapsed ? 'VT' : 'VisionTrack'}
          </span>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-3 py-6 space-y-2'>
          <SidebarLink
            to='/dashboard'
            label='Dashboard'
            icon={<LayoutDashboard size={22} />}
            collapsed={collapsed}
          />
          <SidebarLink
            to='/visions'
            label='Vision'
            icon={<Target size={22} />}
            collapsed={collapsed}
          />
          <SidebarLink
            to='/habits'
            label='Habits'
            icon={<CheckSquare size={22} />}
            collapsed={collapsed}
          />
          <SidebarLink
            to='/reports'
            label='Reports'
            icon={<BarChart3 size={22} />}
            collapsed={collapsed}
          />
        </nav>

        {/* ================= Profile Section ================= */}
        <div className='relative p-3 border-t border-zinc-200'>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className='w-full flex items-center gap-3 px-3 py-2 rounded-xl
            hover:bg-white/80 transition'
          >
            {/* Avatar */}
            <div className='w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow'>
              {user?.email?.[0]?.toUpperCase()}
            </div>

            {!collapsed && (
              <div className='flex-1 text-left'>
                <p className='text-sm font-medium truncate'>{user?.email}</p>
                <p className='text-xs text-zinc-500'>Personal workspace</p>
              </div>
            )}
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div
              ref={dropdownRef}
              className={`absolute ${
                collapsed ? 'left-20' : 'left-3'
              } bottom-16 w-56
              rounded-xl bg-white/80 backdrop-blur-xl
              border border-zinc-200
              shadow-xl overflow-hidden z-50`}
            >
              <DropdownItem
                icon={<User size={16} />}
                label='Profile'
                close={() => setProfileOpen(false)}
              />
              <DropdownItem
                icon={<Settings size={16} />}
                label='Settings'
                close={() => setProfileOpen(false)}
              />

              <DropdownItem
                icon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                onClick={toggleTheme}
              />

              <div className='h-px bg-zinc-200 my-1' />

              <DropdownItem
                icon={<LogOut size={16} />}
                label='Logout'
                danger
                onClick={handleLogout}
              />
            </div>
          )}
        </div>

        {/* Collapse */}
        <div className='p-3'>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className='w-full flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 transition'
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            {!collapsed && 'Collapse'}
          </button>
        </div>
      </aside>

      {/* ================= Main Content ================= */}
      <main className='flex-1 p-10 overflow-y-auto'>
        <div className='max-w-[1600px] mx-auto'>
          <div className='bg-white/70 backdrop-blur-xl rounded-2xl border border-zinc-200 shadow-sm p-8'>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ================= Sidebar Link ================= */

function SidebarLink({
  to,
  label,
  icon,
  collapsed,
}: {
  to: string;
  label: string;
  icon: ReactNode;
  collapsed: boolean;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition
        ${
          isActive
            ? 'bg-indigo-600 text-white shadow-md'
            : 'text-zinc-600 hover:bg-white/80 hover:text-zinc-900'
        }`
      }
    >
      <span className='shrink-0'>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}

/* ================= Dropdown Item ================= */

function DropdownItem({
  icon,
  label,
  onClick,
  danger = false,
  close,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  danger?: boolean;
  close?: () => void;
}) {
  return (
    <button
      onClick={() => {
        onClick?.();
        close?.();
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition
      ${
        danger
          ? 'text-red-500 hover:bg-red-500/10'
          : 'text-zinc-700 hover:bg-zinc-100'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
