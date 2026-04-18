import { Home, PlaySquare, MessageSquare, Users } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';


export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'الرئيسية', path: '/' },
    { icon: PlaySquare, label: 'تعليم', path: '/education' },
    { icon: MessageSquare, label: 'المساعد', path: '/ai' },
    { icon: Users, label: 'المجموعات', path: '/fellowships' },
  ];

  return (
    <div className="fixed bottom-0 w-full glass border-t border-primary-100 pb-safe z-50 lg:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-all",
                isActive ? "text-primary-600" : "text-text-muted hover:text-primary-400"
              )}
            >
              <item.icon size={24} className={cn("transition-transform", isActive && "scale-110 fill-primary-50 stroke-[1.5px]")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
