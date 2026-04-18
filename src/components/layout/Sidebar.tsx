
import { Stethoscope, Calendar, Settings, LogOut, Home, PlaySquare, MessageSquare, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const mainMenuItems = [
    { icon: Home, label: 'الرئيسية (Feed)', path: '/', color: 'text-primary-500', bg: 'bg-primary-50' },
    { icon: PlaySquare, label: 'المركز التعليمي', path: '/education', color: 'text-rose-500', bg: 'bg-rose-50' },
    { icon: MessageSquare, label: 'المساعد الذكي', path: '/ai', color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: Users, label: 'مجموعات الدعم', path: '/fellowships', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  const menuItems = [
    { icon: Stethoscope, label: 'دليل الأخصائيين', path: '/specialists', color: 'text-teal-500', bg: 'bg-teal-50' },
    { icon: Calendar, label: 'مواعيدي', path: '/appointments', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Settings, label: 'الإعدادات', path: '/settings', color: 'text-slate-500', bg: 'bg-slate-50' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed right-0 top-0 bottom-0 w-72 glass border-l border-white/50 z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full",
        "lg:translate-x-0 lg:static lg:z-0 lg:w-80"
      )}>
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold text-primary-700 mb-6 hidden lg:block">الرئيسية</h2>
          
          <div className="space-y-2 mb-8 mt-4 lg:mt-0">
            {mainMenuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white/60 transition-colors border border-transparent hover:border-white/50 group"
              >
                <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110", item.bg, item.color)}>
                  <item.icon size={22} />
                </div>
                <span className="font-semibold text-text-primary text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          <h3 className="text-xs font-bold text-primary-400 mb-4 px-2 uppercase tracking-wide">الخدمات الإضافية</h3>
          
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white/60 transition-colors border border-transparent hover:border-white/50 group"
              >
                <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110", item.bg, item.color)}>
                  <item.icon size={22} />
                </div>
                <span className="font-semibold text-text-primary text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-primary-100/50 mt-auto">
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 p-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors font-medium text-sm border border-red-100"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </button>
        </div>
      </div>
    </>
  );
};
