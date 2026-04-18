import { create } from 'zustand';

export interface Post {
  id: number;
  author: string;
  time: string;
  content: string;
  replies: any[];
}

export interface Appointment {
  id: number;
  doctorName: string;
  specialty: string;
  modality: 'video' | 'voice' | 'chat' | 'in-person';
  date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface AppState {
  posts: Post[];
  appointments: Appointment[];
  addPost: (post: Omit<Post, 'id' | 'time' | 'replies'>) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: 'مجهول USR-10293',
    time: 'منذ ساعتين',
    content: 'كيف يمكنني التغلب على نوبات القلق عند التواجد في أماكن مزدحمة؟ أشعر بتسارع ضربات قلبي.',
    replies: [
      {
        id: 101,
        doctor: 'د. سارة المحمود',
        specialty: 'أخصائية نفسية',
        content: 'مرحباً بك. ما تصفه هو أعراض رهاب الساحة (Agoraphobia). كخطوة أولى، جرب تقنية التنفس "4-7-8" عند بدء الشعور بالقلق للتخفيف من تسارع ضربات القلب. يمكنك حجز استشارة لنتحدث بتفصيل أكثر ووضع خطة علاج سلوكي.',
        isDoctor: true,
      }
    ]
  },
  {
    id: 2,
    author: 'مستخدم 9382',
    time: 'منذ 5 ساعات',
    content: 'خلافات مستمرة مع زوجتي بسبب تدخل تدخّلات الأهل المتكررة في تربية أبنائنا. كيف نضع حدوداً دون افتعال مشاكل عائلية؟',
    replies: [
      {
        id: 102,
        doctor: 'أ. أحمد علي',
        specialty: 'مستشار أسري',
        content: 'أهلاً بك. رسم الحدود يتطلب "جبهة موحدة" بينك وبين زوجتك أولاً. يجب أن تتفقا على قواعد التربية بمنأى عن الجميع، ثم من المهم أن يتولى إيصال هذه الحدود وتطبيقها مع الأهل الشخص المعني (كلٌ مع أهله).',
        isDoctor: true,
      }
    ]
  }
];

export const useAppStore = create<AppState>((set) => ({
  posts: initialPosts,
  appointments: [],
  
  addPost: (newPost) => set((state) => ({
    posts: [
      {
        ...newPost,
        id: Date.now(),
        time: 'الآن',
        replies: []
      },
      ...state.posts
    ]
  })),

  addAppointment: (newApp) => set((state) => ({
    appointments: [
      ...state.appointments,
      {
        ...newApp,
        id: Date.now(),
        status: 'upcoming'
      }
    ]
  }))
}));
