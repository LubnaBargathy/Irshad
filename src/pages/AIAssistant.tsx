import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'مرحباً بك في إرشاد. أنا المساعد الذكي، متواجد لمساندتك على مدار الساعة. كيف يمكنني مساعدتك اليوم؟', isBot: true },
    { id: 2, text: 'أشعر بضيق شديد منذ الصباح ولا أعرف السبب.', isBot: false },
    { id: 3, text: 'أنا هنا للاستماع إليك. من الطبيعي أحياناً الشعور بالضيق دون سبب واضح. هل جربت أخذ أنفاس عميقة لبضع دقائق؟ يمكننا أيضاً تقييم حالتك لمعرفة إن كان من الأفضل التحدث مع أخصائي.', isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg = { id: Date.now(), text: inputText, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = 'أنا أستمع إليك. تذكر أن هذه المساحة آمنة ومصممة لدعمك دائماً.';
      const text = userMsg.text.toLowerCase();

      if (text.includes('حجز') || text.includes('طبيب') || text.includes('موعد')) {
        botResponse = 'إذا كنت تبحث عن استشارة متخصصة، يمكنك حجز موعد مع أحد المرشدين عبر قسم "الأخصائيين" بالقائمة. هل ترغب في مساعدة للوصول هناك؟';
      } else if (text.includes('قلق') || text.includes('خوف') || text.includes('توتر')) {
        botResponse = 'القلق شعور يمر به الجميع وهو طريقة جسمك في الاستجابة للضغوط. حاول أن تركز انتباهك على تنفسك الآن (شهيق عميق ثم זפיر). نحن هنا معك.';
      } else if (text.includes('حزين') || text.includes('اكتئاب') || text.includes('بكي')) {
        botResponse = 'يؤسفني جداً أنك تشعر بذلك. من الشجاعة التعبير عن هذه المشاعر. لا تتردد في البكاء إن شعرت بالحاجة لذلك، شاركني المزيد عما تشعر به.';
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] lg:h-[calc(100vh-100px)]">
      <div className="glass rounded-t-2xl p-4 border-b border-primary-100 flex items-center gap-3 relative overflow-hidden shrink-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-400 via-primary-400 to-accent-400"></div>
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm relative">
          <Bot size={24} className="text-primary-600" />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
            <Sparkles size={12} className="text-accent-500" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary-800 leading-tight">المساعد الذكي (إرشاد)</h2>
          <p className="text-xs text-primary-600 font-medium md:max-w-md">مُدرب لتقديم الإسعافات النفسية الأولية وتوجيهك (ردود آلية)</p>
        </div>
      </div>

      <div className="flex-1 bg-white/40 overflow-y-auto p-4 space-y-4 no-scrollbar border-x border-white/40">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex gap-3 max-w-[85%]", msg.isBot ? "self-start" : "self-end flex-row-reverse ml-auto")}>
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/50", msg.isBot ? "bg-primary-100 text-primary-600" : "bg-accent-100 text-accent-600")}>
              {msg.isBot ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={cn("p-3 rounded-2xl text-sm leading-relaxed shadow-sm", msg.isBot ? "bg-white text-text-primary rounded-tr-none border border-primary-100/50" : "bg-primary-600 text-white rounded-tl-none")}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 items-end animate-in fade-in">
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-accent-100 text-accent-600">
              <Bot size={18} />
            </div>
            <div className="bg-white text-text-primary px-4 py-3 rounded-2xl rounded-br-none shadow-sm flex items-center gap-1 min-h-[44px]">
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="glass rounded-b-2xl p-3 shrink-0">
        <div className="relative flex items-end gap-2 bg-white rounded-2xl border border-primary-200 p-1 pl-2 shadow-inner">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-3 text-sm"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-10 h-10 shrink-0 bg-primary-600 hover:bg-primary-500 disabled:bg-slate-200 text-white rounded-xl flex items-center justify-center transition-colors mb-1"
          >
            <Send size={18} className="rotate-180" />
          </button>
        </div>
        <p className="text-[10px] text-center text-text-muted mt-2">عزيزي المستخدم، المساعد الذكي ليس بديلاً عن الاستشارة الطبية المتخصصة.</p>
      </div>
    </div>
  );
};
