import { useAppStore } from '../../store/useAppStore';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

export const CounselorDashboard = () => {
  const { appointments } = useAppStore();
  const upcomingAppointments = appointments.filter(a => a.status === 'upcoming');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">مرحباً بك في لوحة تحكم المرشدين</h2>
        <p className="text-slate-500 text-sm">هنا يمكنك إدارة مواعيدك القادمة ومتابعة حالات مرضاك.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">مواعيد اليوم</p>
            <h3 className="text-2xl font-bold text-slate-800">{upcomingAppointments.length}</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">مواعيد مكتملة</p>
            <h3 className="text-2xl font-bold text-slate-800">12</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">أحدث الحجوزات</h3>
        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            لا توجد حجوزات قادمة مسجلة في النظام.
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingAppointments.map(app => (
              <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-700">طلب استشارة: {app.modality}</h4>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded">قادم</span>
                  </div>
                  <p className="text-xs text-slate-500">تم الحجز بواسطة مستخدم مجهول</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                  <Clock size={16} className="text-blue-500" />
                  {app.date}
                </div>
                <button className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors mt-2 sm:mt-0">
                  تفاصيل الجلسة
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
