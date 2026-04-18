import { useState } from 'react';
import { PlayCircle, Headphones, HeartPulse, ShieldCheck, ChevronLeft, X } from 'lucide-react';
import { cn } from '../lib/utils';

export const Education = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<any>(null);

  const categories = [
    { id: 'marriage', title: 'إرشاد ما قبل الزواج', icon: HeartPulse, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'family', title: 'تربية الأبناء', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'stress', title: 'التعامل مع الضغوط', icon: Headphones, color: 'text-indigo-500', bg: 'bg-indigo-50' }
  ];

  const featuredVideos = [
    { id: 1, category: 'stress', title: 'كيف تتخلص من نوبات الهلع في 5 خطوات', duration: '12:45', author: 'د. سارة المحمود', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400&h=250', type: 'فيديو' },
    { id: 2, category: 'family', title: 'مؤشرات التوحد المبكرة لدى الرضع', duration: '08:20', author: 'د. منى الهاشمي', img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400&h=250', type: 'فيديو' },
    { id: 3, category: 'marriage', title: 'بناء حوار ناجح لحل الخلافات الزوجية', duration: '20:15', author: 'أ. أحمد علي', img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=400&h=250', type: 'مقال مقروء' },
    { id: 4, category: 'stress', title: 'جلسة استرخاء صوتية عميقة (بدون موسيقى)', duration: '15:00', author: 'إرشاد - إنتاج داخلي', img: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=400&h=250', type: 'بودكاست' },
  ];

  const filteredVideos = activeCategory 
    ? featuredVideos.filter(v => v.category === activeCategory)
    : featuredVideos;

  return (
    <div className="space-y-6 relative">
      <div className="glass rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 transform translate-x-10 -translate-y-10"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-primary-800 mb-2">المركز التعليمي</h2>
          <p className="text-text-secondary text-sm">مكتبة شاملة من الدورات، المحاضرات، والمقاطع الصوتية لتعزيز الوعي النفسي والأُسري.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-text-primary mb-3 px-2">التصنيفات العلمية</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={cn(
                "glass rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-colors group cursor-pointer",
                activeCategory === cat.id ? "ring-2 ring-primary-500 bg-white/80" : "hover:bg-white/60"
              )}
            >
              <div className={`p-3 rounded-xl ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform`}>
                <cat.icon size={24} />
              </div>
              <span className="font-semibold text-sm text-center text-text-primary">{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-3 px-2">
          <h3 className="text-lg font-bold text-text-primary">
            {activeCategory ? 'نتائج التصنيف المختار' : 'أحدث المحتويات المضافة'}
          </h3>
          {activeCategory && (
            <button 
              onClick={() => setActiveCategory(null)}
              className="text-sm font-semibold text-rose-500 hover:text-rose-600 bg-rose-50 px-3 py-1 rounded-full"
            >
              إلغاء التصفية
            </button>
          )}
        </div>
        
        {filteredVideos.length === 0 ? (
          <div className="text-center py-10 bg-white/50 rounded-2xl">
            <p className="text-slate-500">لا يوجد محتوى في هذا التصنيف حالياً.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredVideos.map((video) => (
              <div 
                key={video.id} 
                onClick={() => setPlayingVideo(video)}
                className="glass rounded-2xl p-3 flex gap-4 hover:bg-white/80 transition-all cursor-pointer group hover:shadow-md"
              >
                <div className="relative w-32 h-24 shrink-0 rounded-xl overflow-hidden">
                  <img src={video.img} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <PlayCircle className="text-white w-10 h-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-sm" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex flex-col justify-center py-1">
                  <span className="text-[10px] bg-primary-50 text-primary-700 font-bold px-2 py-0.5 rounded w-fit mb-1">
                    {video.type}
                  </span>
                  <h4 className="font-bold text-sm text-text-primary leading-snug mb-1 group-hover:text-primary-600 transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-xs text-text-muted">{video.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Player Modal Overlay */}
      {playingVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" 
          onClick={() => setPlayingVideo(null)}
        >
          <div 
            className="bg-white max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl relative" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setPlayingVideo(null)}
              className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="w-full aspect-video bg-black flex items-center justify-center relative group">
              {/* Simulated Video Placeholder */}
              <img src={playingVideo.img} alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-50" />
              <button className="relative z-10 bg-white/20 hover:bg-white/30 backdrop-blur-md p-5 rounded-full transition-transform transform hover:scale-110">
                <PlayCircle size={64} className="text-white drop-shadow-lg" />
              </button>
              
              {/* Fake Progress Bar */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20">
                <div className="h-full bg-primary-500 w-1/3 relative">
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary-500 rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-primary-100 text-primary-700 font-bold px-3 py-1 rounded text-xs">{playingVideo.type}</span>
                <span className="text-slate-500 font-medium text-sm flex items-center gap-1.5">
                  <Headphones size={16} />
                  المدة: {playingVideo.duration}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">{playingVideo.title}</h2>
              <p className="text-slate-500 text-sm mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold font-serif text-slate-600 shrink-0">د</span>
                تقديم وإعداد: {playingVideo.author}
              </p>
              
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-600 leading-relaxed text-sm">
                <strong className="text-primary-800 block mb-1">وصف المادة:</strong>
                هذا المحتوى مقدم حصرياً لمستخدمي منصة إرشاد للمساهمة في رفع الوعي النفسي والأسري. 
                يهدف هذا المقطع إلى تزويدك بالأدوات اللازمة لفهم انفعالاتك وطرق التعامل معها بطريقة صحية وإيجابية. 
                (ملاحظة: هذا المشغل هو عرض تجريبي للنموذج الأولي).
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
