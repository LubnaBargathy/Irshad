import { useState } from 'react';
import { Star, Clock, Video, Phone, MessageSquare, MapPin, Search, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAppStore } from '../store/useAppStore';

export const Specialists = () => {
  const [activeModality, setActiveModality] = useState<'all' | 'video' | 'voice' | 'chat'>('all');
  const { addAppointment } = useAppStore();

  const handleBooking = (doctor: any) => {
    addAppointment({
      doctorName: doctor.name,
      specialty: doctor.specialty,
      modality: doctor.modalities[0],
      date: doctor.nextAvailable
    });
    alert('تم حجز الموعد بنجاح! يمكنك مراجعته في قائمة "مواعيدي".');
  };

  const specialists = [
    {
      id: 1,
      name: 'د. سارة المحمود',
      specialty: 'أخصائية نفسية',
      rating: 4.9,
      reviews: 128,
      experience: '10 سنوات',
      bio: 'متخصصة في علاج القلق والاكتئاب والرهاب الاجتماعي باستخدام العلاج المعرفي السلوكي (CBT).',
      modalities: ['video', 'voice', 'chat'],
      nextAvailable: 'اليوم، 4:00 عصراً',
      image: 'https://i.pravatar.cc/150?img=43'
    },
    {
      id: 2,
      name: 'أ. أحمد علي',
      specialty: 'مستشار أسري وزواجي',
      rating: 4.8,
      reviews: 85,
      experience: '15 سنة',
      bio: 'مستشار معتمد في العلاقات الأسرية وتربية الأبناء وإدارة الخلافات الزوجية.',
      modalities: ['video', 'voice'],
      nextAvailable: 'غداً، 10:00 صباحاً',
      image: 'https://i.pravatar.cc/150?img=11'
    },
    {
      id: 3,
      name: 'د. منى الهاشمي',
      specialty: 'طبيبة نفسية للأطفال',
      rating: 5.0,
      reviews: 42,
      experience: '8 سنوات',
      bio: 'تشخيص وعلاج اضطرابات طيف التوحد، فرط الحركة وتشتت الانتباه بفعالية عالية.',
      modalities: ['video', 'voice', 'chat', 'in-person'],
      nextAvailable: 'اليوم، 6:30 مساءً',
      image: 'https://i.pravatar.cc/150?img=34'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-5">
        <h2 className="text-xl font-bold text-primary-800 mb-4">دليل الأخصائيين</h2>
        
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-2">
          <div className="relative min-w-[200px] flex-1">
            <input 
              type="text" 
              placeholder="ابحث بالاسم أو التخصص..." 
              className="w-full bg-white/60 border border-primary-200 rounded-xl py-2 px-10 focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm"
            />
            <Search className="absolute right-3 top-2.5 text-primary-400 w-4 h-4" />
          </div>
          <button className="bg-primary-50 text-primary-700 px-4 py-2 rounded-xl flex items-center gap-2 border border-primary-100 font-medium text-sm">
            <Filter size={16} />
            تصفية
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {[{ id: 'all', label: 'الكل' }, { id: 'video', label: 'فيديو' }, { id: 'voice', label: 'صوت' }, { id: 'chat', label: 'محادثة' }].map(mod => (
            <button
              key={mod.id}
              onClick={() => setActiveModality(mod.id as any)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors",
                activeModality === mod.id 
                  ? "bg-primary-600 text-white shadow-md shadow-primary-500/20" 
                  : "bg-white text-text-secondary border border-primary-100 hover:bg-primary-50"
              )}
            >
              {mod.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {specialists.map(doc => (
          <div key={doc.id} className="glass rounded-2xl p-5 flex flex-col sm:flex-row gap-5">
            <div className="flex gap-4 sm:flex-col sm:items-center sm:w-28 shrink-0">
              <img 
                src={doc.image} 
                alt={doc.name} 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-sm"
              />
              <div className="flex flex-col justify-center sm:items-center">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={16} className="fill-amber-500" />
                  <span>{doc.rating}</span>
                </div>
                <span className="text-xs text-text-muted">({doc.reviews} تقييم)</span>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-primary-800">{doc.name}</h3>
                <p className="text-primary-600 text-sm font-medium mb-1">{doc.specialty} • خبرة {doc.experience}</p>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">{doc.bio}</p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-accent-600 bg-accent-50 w-fit px-3 py-1.5 rounded-lg">
                <Clock size={14} />
                أقرب موعد متاح: {doc.nextAvailable}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-primary-100">
                <button 
                  onClick={() => handleBooking(doc)}
                  className="flex-1 min-w-[120px] bg-primary-600 hover:bg-primary-500 text-white py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-primary-500/20 active:scale-95"
                >
                  حجز موعد
                </button>
                <div className="flex gap-2">
                  {doc.modalities.includes('video') && <div className="p-2 bg-slate-50 text-slate-400 rounded-lg border border-slate-100"><Video size={18} /></div>}
                  {doc.modalities.includes('voice') && <div className="p-2 bg-slate-50 text-slate-400 rounded-lg border border-slate-100"><Phone size={18} /></div>}
                  {doc.modalities.includes('chat') && <div className="p-2 bg-slate-50 text-slate-400 rounded-lg border border-slate-100"><MessageSquare size={18} /></div>}
                  {doc.modalities.includes('in-person') && <div className="p-2 bg-slate-50 text-slate-400 rounded-lg border border-slate-100"><MapPin size={18} /></div>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
