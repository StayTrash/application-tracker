import React from 'react';
import { 
  LayoutGrid, 
  Kanban, 
  Settings, 
  Search, 
  Bell, 
  Command, 
  Briefcase,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  currentView: 'dashboard' | 'kanban' | 'list';
  onViewChange: (view: 'dashboard' | 'kanban' | 'list') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  onViewChange,
  searchQuery,
  onSearchChange 
}) => {
  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-200 selection:bg-indigo-500/30 font-sans">
      
      {/* Sidebar */}
      <aside className="w-16 border-r border-zinc-800/50 flex flex-col items-center py-6 bg-zinc-950/80 backdrop-blur-md z-50">
        {/* Brand */}
        <div className="mb-8">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow">
                <Layers size={18} className="text-white" />
            </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-4 w-full px-2">
            <NavIcon 
              icon={<LayoutGrid size={20} />} 
              label="Dashboard" 
              isActive={currentView === 'dashboard'} 
              onClick={() => onViewChange('dashboard')}
            />
            <NavIcon 
              icon={<Kanban size={20} />} 
              label="Board" 
              isActive={currentView === 'kanban'} 
              onClick={() => onViewChange('kanban')}
            />
            <NavIcon 
              icon={<Briefcase size={20} />} 
              label="Jobs" 
              isActive={currentView === 'list'} 
              onClick={() => onViewChange('list')}
            />
        </nav>

        {/* Footer Actions */}
        <div className="mt-auto flex flex-col gap-4 w-full px-2">
             <NavIcon 
              icon={<Settings size={20} />} 
              label="Settings" 
              isActive={false} 
              onClick={() => {}}
            />
            <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 mx-auto overflow-hidden">
                <img src="https://picsum.photos/32/32" alt="User" />
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-zinc-800/50 flex items-center justify-between px-6 bg-zinc-950/50 backdrop-blur-sm z-40">
           {/* Breadcrumbs / Title */}
           <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span className="hover:text-zinc-300 cursor-pointer transition-colors">Workspace</span>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-200 font-medium capitalize">{currentView === 'list' ? 'Applications' : currentView}</span>
           </div>

           {/* Search & Actions */}
           <div className="flex items-center gap-4">
              {/* Command K Search */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-900/50 border border-zinc-800/50 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20 text-xs text-zinc-500 transition-all cursor-text group w-64">
                 <Search size={14} className="group-hover:text-zinc-400 group-focus-within:text-indigo-400" />
                 <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search applications..."
                    className="bg-transparent border-none outline-none w-full text-zinc-200 placeholder:text-zinc-600 ml-2 h-full"
                 />
                 <kbd className="ml-auto flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-sans text-zinc-400">
                    <Command size={10} /> K
                 </kbd>
              </div>

              <button className="relative text-zinc-500 hover:text-zinc-300 transition-colors">
                 <Bell size={18} />
                 <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-zinc-950" />
              </button>
           </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 relative">
            {children}
        </div>
      </main>
    </div>
  );
};

// Sub-component for Sidebar Icons
const NavIcon: React.FC<{ icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
    <button 
      onClick={onClick}
      className={`
        relative group w-full aspect-square flex items-center justify-center rounded-xl transition-all duration-300
        ${isActive ? 'text-indigo-400 bg-indigo-500/10' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}
      `}
      title={label}
    >
        {icon}
        {isActive && (
            <motion.div 
                layoutId="active-nav"
                className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            />
        )}
    </button>
);

export default Layout;