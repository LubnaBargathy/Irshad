import { useState } from 'react';
import { Shield, Bell, Save, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { cn } from '../lib/utils';

export const Settings = () => {
  const { user } = useAuthStore();
  const [revealIdentity, setRevealIdentity] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-5 mb-6">
        <h2 className="text-2xl font-bold text-primary-800">الإعدادات</h2>
        <p className="text-text-muted text-sm mt-1">تخصيص الخصوصية وتجربة الاستخدام.</p>
      </div>

      <div className="space-y-4">
        {/* Profile Info */}
        <div className="glass rounded-2xl p-5">
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <User size={20} className="text-primary-500" />
            معلومات الحساب
          </h3>
          <div className="bg-primary-50/50 p-4 rounded-xl border border-primary-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">المعرف السري (ID)</p>
              <p className="font-bold text-primary-800">{user?.id}</p>
            </div>
            {user?.isAnonymous && (
              <span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-xs font-bold">
                حساب مجهول
              </span>
            )}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="glass rounded-2xl p-5">
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <Shield size={20} className="text-emerald-500" />
            الخصوصية والأمان
          </h3>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div>
              <p className="font-bold text-text-primary">كشف الهوية للأخصائيين</p>
              <p className="text-xs text-text-muted mt-1 max-w-[250px]">
                في حال تفعيل هذا الخيار، سيتمكن الأخصائي المعالج فقط من معرفة هويتك لدعم سير خطة العلاج.
              </p>
            </div>
            <button 
              onClick={() => setRevealIdentity(!revealIdentity)}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                revealIdentity ? "bg-emerald-500" : "bg-gray-200"
              )}
            >
              <span className={cn(
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                revealIdentity ? "-translate-x-5" : "translate-x-0"
              )} />
            </button>
          </div>
        </div>

        {/* App Preferences */}
        <div className="glass rounded-2xl p-5">
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <Bell size={20} className="text-blue-500" />
            تفضيلات التطبيق
          </h3>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-bold text-text-primary">الإشعارات</p>
              <p className="text-xs text-text-muted mt-1">تلقي تنبيهات عند وجود رد من الأخصائي أو اقتراب موعد الجلسة.</p>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                notifications ? "bg-primary-500" : "bg-gray-200"
              )}
            >
              <span className={cn(
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                notifications ? "-translate-x-5" : "translate-x-0"
              )} />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-bold text-text-primary">الوضع المظلم</p>
              <p className="text-xs text-text-muted mt-1">تقليل إجهاد العين وتوفير طاقة البطارية.</p>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                darkMode ? "bg-slate-700" : "bg-gray-200"
              )}
            >
              <span className={cn(
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                darkMode ? "-translate-x-5" : "translate-x-0"
              )} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-primary-500/20 active:scale-95">
          <Save size={18} />
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
};
