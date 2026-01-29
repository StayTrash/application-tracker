'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutGrid,
    Kanban,
    Search,
    Bell,
    Command,
    Briefcase,
    FileText,
    LogOut,
    Sun,
    Moon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Toast } from '@/components/ui/Toast';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setSearchQuery, removeToast } from '@/lib/store/features/ui/uiSlice';
import { useSession, signOut } from 'next-auth/react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTheme } from '@/components/providers/ThemeProvider';

interface ShellProps {
    children: React.ReactNode;
}

// Route configuration
const ROUTES = {
    dashboard: '/dashboard',
    kanban: '/dashboard/kanban',
    list: '/dashboard/list',
    documents: '/dashboard/documents',
} as const;

// Helper to get current view from pathname
const get_view_from_pathname = (pathname: string): string => {
    if (pathname === '/dashboard') return 'dashboard';
    if (pathname.startsWith('/dashboard/kanban')) return 'kanban';
    if (pathname.startsWith('/dashboard/list')) return 'list';
    if (pathname.startsWith('/dashboard/documents')) return 'documents';
    return 'dashboard';
};

// Helper to get display name for breadcrumb
const get_view_display_name = (view: string): string => {
    switch (view) {
        case 'dashboard': return 'Dashboard';
        case 'kanban': return 'Board';
        case 'list': return 'Applications';
        case 'documents': return 'Documents';
        default: return 'Dashboard';
    }
};

const Shell: React.FC<ShellProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const currentView = get_view_from_pathname(pathname);
    const { searchQuery, toasts } = useAppSelector(state => state.ui);
    const { data: session } = useSession();
    const { theme, toggle_theme } = useTheme();

    const [localSearch, setLocalSearch] = React.useState(searchQuery);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (localSearch !== searchQuery) {
                dispatch(setSearchQuery(localSearch));
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [localSearch, dispatch, searchQuery]);

    React.useEffect(() => {
        if (searchQuery !== localSearch) {
            setLocalSearch(searchQuery);
        }
    }, [searchQuery]);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isMac, setIsMac] = React.useState(false);

    React.useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);

        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="flex h-screen w-full bg-slate-50 dark:bg-zinc-950 text-slate-700 dark:text-zinc-200 selection:bg-indigo-500/30 font-sans">

            {/* Sidebar */}
            <aside className="w-16 border-r border-slate-200 dark:border-zinc-800 flex flex-col items-center py-6 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md z-50 shadow-sm">
                {/* Brand */}
                <div className="mb-8">
                    <div className="h-10 w-10 flex items-center justify-center">
                        <img src="/logo.png" alt="App Logo" className="h-full w-full object-contain drop-shadow-md" />
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col gap-4 w-full px-2">
                    <NavLink
                        href={ROUTES.dashboard}
                        icon={<LayoutGrid size={20} />}
                        label="Dashboard"
                        isActive={currentView === 'dashboard'}
                    />
                    <NavLink
                        href={ROUTES.kanban}
                        icon={<Kanban size={20} />}
                        label="Board"
                        isActive={currentView === 'kanban'}
                    />
                    <NavLink
                        href={ROUTES.list}
                        icon={<Briefcase size={20} />}
                        label="Jobs"
                        isActive={currentView === 'list'}
                    />
                    <NavLink
                        href={ROUTES.documents}
                        icon={<FileText size={20} />}
                        label="Documents"
                        isActive={currentView === 'documents'}
                    />
                </nav>

                {/* Footer Actions */}
                <div className="mt-auto flex flex-col gap-3 w-full px-2">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggle_theme}
                        className="w-full aspect-square flex items-center justify-center rounded-xl transition-all duration-300 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800"
                        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    {/* Account Popover */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="h-8 w-8 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 mx-auto overflow-hidden transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer shadow-sm">
                                <img
                                    src={session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name || 'User'}&background=random`}
                                    alt={session?.user?.name || 'User'}
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent side="right" align="end" className="w-56 p-1.5 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 ml-2 shadow-lg">
                            <div className="px-2 py-2 mb-1 border-b border-slate-100 dark:border-zinc-800">
                                <p className="text-sm font-medium text-slate-800 dark:text-zinc-200 truncate">{session?.user?.name}</p>
                                <p className="text-xs text-slate-500 dark:text-zinc-500 truncate">{session?.user?.email}</p>
                            </div>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-400 rounded-md transition-colors"
                            >
                                <LogOut size={14} />
                                Sign Out
                            </button>
                        </PopoverContent>
                    </Popover>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50 dark:bg-zinc-950">
                {/* Top Bar */}
                <header className="h-14 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between px-6 bg-white/80 dark:bg-zinc-950/50 backdrop-blur-sm z-40 shadow-sm">
                    {/* Breadcrumbs / Title */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-500">
                        <Link href="/dashboard" className="hover:text-slate-700 dark:hover:text-zinc-300 transition-colors">Workspace</Link>
                        <span className="text-slate-300 dark:text-zinc-700">/</span>
                        <span className="text-slate-800 dark:text-zinc-200 font-medium">{get_view_display_name(currentView)}</span>
                    </div>

                    {/* Search & Actions */}
                    <div className="flex items-center gap-4">
                        {/* Command K Search */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 focus-within:border-indigo-400 dark:focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-500/20 text-xs text-slate-500 dark:text-zinc-500 transition-all cursor-text group w-64 shadow-sm">
                            <Search size={14} className="group-hover:text-slate-600 dark:group-hover:text-zinc-400 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                placeholder="Search applications..."
                                className="bg-transparent border-none outline-none w-full text-slate-700 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-600 ml-2 h-full"
                            />
                            <kbd className="ml-auto flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-[10px] font-sans text-slate-500 dark:text-zinc-400 shadow-sm">
                                {isMac ? <Command size={10} /> : <span className="text-xs">Ctrl</span>} K
                            </kbd>
                        </div>

                        <button className="relative text-slate-500 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300 transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-zinc-950" />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 relative overflow-y-auto">
                    {children}
                </div>
            </main>

            {/* Global Toast Container */}
            <Toast toasts={toasts} removeToast={(id) => dispatch(removeToast(id))} />
        </div>
    );
};

// Sub-component for Sidebar Navigation Links
const NavLink: React.FC<{ href: string; icon: React.ReactNode; label: string; isActive: boolean }> = ({ href, icon, label, isActive }) => (
    <Link
        href={href}
        className={`
            relative group w-full aspect-square flex items-center justify-center rounded-xl transition-all duration-300
            ${isActive 
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10' 
                : 'text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900'}
        `}
        title={label}
    >
        {icon}
        {isActive && (
            <motion.div
                layoutId="active-nav"
                className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]"
            />
        )}
    </Link>
);

export default Shell;
