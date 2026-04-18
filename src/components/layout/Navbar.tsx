import { useAuthStore } from '../../store/useAuthStore';
import { User, Shield, Menu, Search, Bell } from 'lucide-react';

export const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { user } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-primary-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-colors lg:hidden">
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2 text-primary-600">
          <Shield className="w-8 h-8 fill-primary-100" />
          <h1 className="text-2xl font-bold font-sans">إرشاد</h1>
        </div>
      </div>
      
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <input 
            type="text" 
            placeholder="ابحث عن استشارة، طبيب، أو موضوع..." 
            className="w-full bg-primary-50 border border-primary-100 rounded-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all text-sm"
          />
          <Search className="absolute right-3 top-2.5 text-primary-400 w-5 h-5" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-primary-500 hover:bg-primary-50 rounded-full relative">
          <Bell size={22} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-accent-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-2 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-100">
          <span className="text-sm font-medium text-primary-700 max-w-[100px] truncate">
            {user?.username}
          </span>
          <div className="w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center text-primary-700">
            <User size={18} />
          </div>
        </div>
      </div>
    </nav>
  );
};
