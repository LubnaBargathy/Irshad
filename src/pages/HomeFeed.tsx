import { useState } from 'react';
import { PenSquare, Send, Globe, Users, Target, MoreHorizontal, Heart, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAppStore } from '../store/useAppStore';
import { useAuthStore } from '../store/useAuthStore';

export const HomeFeed = () => {
  const { posts, addPost } = useAppStore();
  const { user } = useAuthStore();
  const [postText, setPostText] = useState('');
  const [privacy, setPrivacy] = useState<'public' | 'pool' | 'triage'>('public');

  const handlePostSubmit = () => {
    if (!postText.trim()) return;
    
    addPost({
      author: user?.username || 'مستخدم مجهول',
      content: postText,
    });
    
    setPostText('');
  };

  return (
    <div className="space-y-6">
      {/* Create Post Box */}
      <div className="glass rounded-2xl p-4 md:p-5">
        <div className="flex gap-3 items-start">
          <div className="w-10 h-10 rounded-full border border-primary-200 bg-primary-50 flex items-center justify-center flex-shrink-0">
            <PenSquare size={20} className="text-primary-500" />
          </div>
          <div className="flex-1 space-y-3">
            <textarea
              placeholder="بم تفكر؟ اطرح مشكلتك بكل أمان وسرية..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full bg-transparent border-none resize-none focus:ring-0 text-text-primary text-base min-h-[80px]"
            />
            
            <div className="flex flex-wrap gap-2 pt-3 border-t border-primary-100/50">
              <button 
                onClick={() => setPrivacy('public')}
                className={cn("px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors", privacy === 'public' ? "bg-primary-100 text-primary-700" : "bg-gray-50 text-gray-500 hover:bg-gray-100")}
              >
                <Globe size={14} />
                عام
              </button>
              <button 
                onClick={() => setPrivacy('pool')}
                className={cn("px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors", privacy === 'pool' ? "bg-blue-100 text-blue-700" : "bg-gray-50 text-gray-500 hover:bg-gray-100")}
              >
                <Users size={14} />
                لجنة الدكاترة
              </button>
              <button 
                onClick={() => setPrivacy('triage')}
                className={cn("px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors", privacy === 'triage' ? "bg-accent-100 text-accent-700" : "bg-gray-50 text-gray-500 hover:bg-gray-100")}
              >
                <Target size={14} />
                تحويل وتوجيه
              </button>
            </div>
            
            <div className="flex justify-end pt-2">
              <button 
                disabled={!postText}
                onClick={handlePostSubmit}
                className="bg-primary-500 text-white font-semibold py-2 px-6 rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send size={16} className="rotate-180" />
                نشر طلب استشارة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="glass rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden border border-slate-200 flex items-center justify-center">
                     <span className="text-slate-400 font-bold">{post.author.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-text-primary">{post.author}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{post.time}</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              
              <p className="text-text-primary font-medium leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
              
              <div className="flex gap-4 pt-2">
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-accent-500 transition-colors text-sm font-semibold">
                  <Heart size={18} />
                  دعم
                </button>
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-primary-500 transition-colors text-sm font-semibold">
                  <MessageCircle size={18} />
                  متابعة
                </button>
              </div>
            </div>

            {/* Replies */}
            {post.replies && post.replies.length > 0 && (
              <div className="bg-primary-50/50 p-5 border-t border-primary-100">
                {post.replies.map(reply => (
                  <div key={reply.id} className="flex gap-3 mt-3 first:mt-0">
                    <div className="w-10 h-10 bg-white rounded-full border-2 border-primary-300 overflow-hidden shrink-0 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-primary-100 flex items-center justify-center text-primary-500 font-bold shadow-inner">د</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-tr-none shadow-sm border border-primary-100 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm text-primary-800">{reply.doctor}</h4>
                        <span className="bg-primary-100 text-primary-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {reply.specialty}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {reply.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
