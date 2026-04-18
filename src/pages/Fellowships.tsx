import { useState } from 'react';
import { Users, Lock, MessageCircle, Info, Check } from 'lucide-react';

export const Fellowships = () => {
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);

  const handleJoin = (id: number) => {
    setJoinedGroups(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const groups = [
    { id: 1, title: 'تحديات الأمهات الجدد', members: 1240, type: 'مغلق', description: 'مساحة آمنة وخاصة لتبادل خبرات وتحديات الأشهر الأولى من الأمومة.', icon: HeartIcon, bg: 'bg-rose-50', color: 'text-rose-500' },
    { id: 2, title: 'الدعم لمرضى القلق الاجتماعي', members: 850, type: 'إشراف طبي', description: 'مجموعة دعم أقران بإشراف أخصائي نفسي لتجاوز مخاوف التجمعات.', icon: ShieldIcon, bg: 'bg-blue-50', color: 'text-blue-500' },
    { id: 3, title: 'أساسيات التربية المراهقة', members: 2100, type: 'عام', description: 'تجمّع للآباء والأمهات لمناقشة طرق احتواء المراهقين للبيئة الليبية.', icon: Users, bg: 'bg-emerald-50', color: 'text-emerald-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary-800 mb-2">مجموعات الدعم (الزمالات)</h2>
            <p className="text-text-secondary text-sm max-w-md">بيئة آمنة للمشاركة مع أشخاص يمرون بتجارب مماثلة لتجربتك. السرية التامة مضمونة.</p>
          </div>
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center hidden sm:flex border border-primary-200">
            <Users size={24} className="text-primary-600" />
          </div>
        </div>
        
        <div className="mt-4 bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex gap-3 items-start">
          <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 leading-relaxed">
            جميع المجموعات تخضع لإشراف ومراقبة تلقائية لضمان بيئة صحية وآمنة. لن يتم طلب أو مشاركة أي معلومات شخصية.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {groups.map((group) => (
          <div key={group.id} className="glass rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-4 border-l-4 border-l-primary-500 hover:bg-white/60 transition-colors">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${group.bg} ${group.color}`}>
               <group.icon size={28} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-primary-900">{group.title}</h3>
                {group.type === 'مغلق' && <Lock size={14} className="text-slate-400" />}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                {group.description}
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold text-text-muted">
                <span className="flex items-center gap-1.5"><Users size={14} className="text-primary-400" /> {group.members} عضو</span>
                <span className="flex items-center gap-1.5"><MessageCircle size={14} className="text-primary-400" /> نقاش اليوم: 42</span>
                <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">{group.type}</span>
              </div>
            </div>
            <div className="flex items-center justify-center md:items-end">
               <button 
                 onClick={() => handleJoin(group.id)}
                 className={`w-full md:w-auto font-semibold py-2 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2
                   ${joinedGroups.includes(group.id) 
                     ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                     : 'bg-primary-600 hover:bg-primary-500 text-white'}`}
               >
                 {joinedGroups.includes(group.id) ? (
                   <>
                     <Check size={18} />
                     مشارك
                   </>
                 ) : 'انضم للمجموعة'}
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function HeartIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
}

function ShieldIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
}
