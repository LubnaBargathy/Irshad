import { useAppStore } from '../store/useAppStore';
import { Calendar, Clock, Video, Phone, MessageSquare, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

export const Appointments = () => {
  const { appointments } = useAppStore();

  if (appointments.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[50vh]">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <Calendar size={32} className="text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-primary-800 mb-2">لا توجد مواعيد حالية</h2>
        <p className="text-text-muted text-sm">لم تقم بحجز أي استشارة بعد. توجه إلى دليل الأخصائيين للبدء.</p>
      </div>
    );
  }

  const getModalityIcon = (mod: string) => {
    switch (mod) {
      case 'video': return <Video size={16} />;
      case 'voice': return <Phone size={16} />;
      case 'chat': return <MessageSquare size={16} />;
      case 'in-person': return <MapPin size={16} />;
      default: return null;
    }
  };

  const getModalityText = (mod: string) => {
    switch (mod) {
      case 'video': return 'فيديو';
      case 'voice': return 'صوت';
      case 'chat': return 'محادثة نصية';
      case 'in-person': return 'حضوري';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-5">
        <h2 className="text-xl font-bold text-primary-800">مواعيدي</h2>
        <p className="text-sm text-text-muted mt-1">تتبع جلساتك الاستشارية القادمة والسابقة.</p>
      </div>

      <div className="space-y-4">
        {appointments.map((app) => (
          <div key={app.id} className="glass rounded-2xl p-5 border-r-4 border-r-primary-500 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                  app.status === 'upcoming' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                )}>
                  {app.status === 'upcoming' ? 'قادم' : 'مكتمل'}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
                  {getModalityIcon(app.modality)}
                  {getModalityText(app.modality)}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-text-primary mb-1">{app.doctorName}</h3>
              <p className="text-sm text-text-secondary">{app.specialty}</p>

              <div className="flex items-center gap-2 mt-4 text-sm font-semibold text-text-primary bg-white/50 w-fit px-3 py-1.5 rounded-lg border border-primary-100">
                <Clock size={16} className="text-accent-500" />
                {app.date}
              </div>
            </div>
            
            <div className="flex flex-col justify-end">
               {app.status === 'upcoming' && (
                 <button className="bg-white border-2 border-primary-100 hover:border-primary-500 text-primary-600 font-bold py-2 px-4 rounded-xl transition-all shadow-sm w-full sm:w-auto mt-4 sm:mt-0">
                   انضمام للجلسة
                 </button>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
