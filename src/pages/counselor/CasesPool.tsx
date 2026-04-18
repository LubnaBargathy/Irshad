import { useState } from 'react';
import { useAppStore, type Post } from '../../store/useAppStore';
import { ShieldAlert, Reply, Inbox } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const CasesPool = () => {
  const { posts } = useAppStore();
  const { user } = useAuthStore();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Note: in a real app, we'd add an `addReply` action to `useAppStore`.
  // For the prototype, we'll just show an alert or simulate it.

  const handleReplySubmit = () => {
    if (!replyContent) return;
    alert(`تم إرسال الرد السريري للمريض. سيظهر الرد باسم: ${user?.username}`);
    setReplyContent('');
    setSelectedPost(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto h-full flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-slate-800">لجنة الحالات (Pool)</h2>
            <div className="bg-rose-100 text-rose-600 p-1.5 rounded-md">
               <ShieldAlert size={20} />
            </div>
          </div>
          <p className="text-slate-500 text-sm">قائمة بالحالات العرضية التي طلبت استشارة عامة أو تم توجيهها للجنة لفرزها.</p>
        </div>

        <div className="space-y-3">
          {posts.map(post => {
            const hasDoctorReply = post.replies && post.replies.some(r => r.isDoctor);
            return (
              <div 
                key={post.id} 
                className={`bg-white rounded-2xl p-5 shadow-sm border cursor-pointer transition-all ${selectedPost?.id === post.id ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-100 hover:border-slate-300'}`}
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-slate-700 text-sm">{post.author}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{post.time}</p>
                  </div>
                  {hasDoctorReply ? (
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded">تم الرد</span>
                  ) : (
                    <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-1 rounded border border-rose-100">بانتظار الرد</span>
                  )}
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{post.content}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reply Section */}
      <div className="w-full lg:w-[400px] shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 h-full p-5 lg:sticky lg:top-6">
          {selectedPost ? (
            <div className="flex flex-col h-full">
              <h3 className="font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100">تفاصيل الحالة</h3>
              
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm text-slate-700">{selectedPost.author}</span>
                  <span className="text-xs text-slate-400">{selectedPost.time}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{selectedPost.content}</p>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">الرد التوجيهي / السريري</label>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="اكتب ردك المتخصص هنا. سيتم إرفاق إسمك وصفتك الطبية مع الرد..."
                  className="w-full bg-white border border-slate-200 rounded-xl p-4 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-sm"
                />
              </div>

              <button 
                disabled={!replyContent}
                onClick={handleReplySubmit}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 mt-4 transition-colors disabled:opacity-50"
              >
                <Reply size={18} />
                إرسال الرد واعتماد الحالة
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-8">
              <Inbox size={48} className="mb-4 opacity-20" />
              <p className="font-medium text-sm">اختر دراسة حالة من القائمة لعرض التفاصيل وإرسال ردك السريري.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
