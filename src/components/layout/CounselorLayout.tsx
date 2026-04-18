import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, Inbox, User } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../lib/utils';

export const CounselorLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'لوحة التحكم', path: '/counselor', icon: LayoutDashboard },
    { label: 'لجنة الحالات (Pool)', path: '/counselor/pool', icon: Inbox },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans" dir="rtl">
      {/* Counselor Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 md:min-h-screen flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 text-white mb-4">
            <div className="bg-emerald-500 bg-opacity-20 p-2 rounded-lg text-emerald-400">
              <User size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg">بوابة المرشدين</h1>
              <p className="text-xs text-emerald-400">{user?.username || 'د. أخصائي'}</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-visible no-scrollbar">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap",
                  isActive ? "bg-slate-800 text-white shadow-sm" : "hover:bg-slate-800/50 hover:text-white"
                )}
              >
                <item.icon size={20} className={isActive ? "text-emerald-400" : ""} />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 hidden md:block">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
          >
            <LogOut size={20} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
         <Outlet />
      </main>
    </div>
  );
};
