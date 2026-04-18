import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Shield, Lock, EyeOff, Key } from 'lucide-react';

export const AuthPage = () => {
  const { login, loginAnonymous } = useAuthStore();
  const [username, setUsername] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="w-full max-w-md glass rounded-3xl p-8 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

        <div className="relative z-10 flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-primary-200">
            <Shield className="w-10 h-10 text-primary-600 fill-primary-200" />
          </div>
          <h1 className="text-3xl font-bold text-primary-800 mb-2">إرشاد</h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            مساحتك الآمنة والسرية للصحة النفسية والاستشارات الأسرية. هويتك محمية دائمًا.
          </p>
        </div>

        <div className="space-y-6 relative z-10">
          <div className="space-y-3">
            <button 
              onClick={loginAnonymous}
              className="w-full relative group overflow-hidden bg-primary-600 hover:bg-primary-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              <EyeOff size={20} />
              تسجيل دخول مجهول تماماً
            </button>
            <p className="text-xs text-center text-text-muted">
              سيتم إنشاء رقم تسلسلي خاص بك. لا يطلب أرقام هواتف أو إيميل.
            </p>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-primary-200"></div>
            <span className="flex-shrink-0 mx-4 text-text-muted text-sm font-medium">أو</span>
            <div className="flex-grow border-t border-primary-200"></div>
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); if (username) login(username); }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">
                اسم مستخدم مستعار (اختياري)
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="مثال: أمل الحياة"
                  className="w-full bg-white/60 border border-primary-200 rounded-xl py-3 px-10 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all"
                />
                <Key className="absolute right-3 top-3.5 text-primary-400 w-5 h-5" />
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={!username}
              className="w-full bg-white border-2 border-primary-200 text-primary-700 hover:bg-primary-50 hover:border-primary-300 font-bold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Lock size={18} />
              دخول بالاسم المستعار
            </button>
            
            <button 
              type="button"
              onClick={() => { if (username) { useAuthStore.getState().loginCounselor(username); } else { alert('يرجى إدخال اسمك أولاً للدخول كمرشد'); } }}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4"
            >
              <Shield size={18} />
              تسجيل دخول الكادر الطبي / المرشدين
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
