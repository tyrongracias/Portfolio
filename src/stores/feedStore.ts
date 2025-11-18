import { create } from 'zustand';

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

interface FeedState {
  posts: Post[];
  isLoading: boolean;
  hasMore: boolean;
  addPost: (post: Post) => void;
  loadMorePosts: () => void;
}

const initialPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    userAvatar: 'https://placehold.co/100x100',
    timestamp: '2 hours ago',
    content: 'Just launched my creator token! 🚀 Excited to build this community together. Who\'s ready to join the revolution?',
    image: 'https://c.animaapp.com/mi4krc4mAxvTl2/img/ai_1.png',
    likes: 245,
    comments: 32,
    shares: 18,
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah Johnson',
    userAvatar: 'https://placehold.co/100x100',
    timestamp: '4 hours ago',
    content: 'The future of content creation is here. Web3 is changing everything we know about creator monetization.',
    image: 'https://c.animaapp.com/mi4krc4mAxvTl2/img/ai_2.png',
    likes: 189,
    comments: 24,
    shares: 12,
  },
  {
    id: '3',
    userId: '3',
    userName: 'Mike Chen',
    userAvatar: 'https://placehold.co/100x100',
    timestamp: '6 hours ago',
    content: 'Building in public: Day 30 of my creator journey. The community support has been incredible! 💪',
    likes: 156,
    comments: 18,
    shares: 9,
  },
  {
    id: '4',
    userId: '4',
    userName: 'Emma Davis',
    userAvatar: 'https://placehold.co/100x100',
    timestamp: '8 hours ago',
    content: 'New tutorial dropping tomorrow! Learn how to maximize your creator token value 📈',
    image: 'https://c.animaapp.com/mi4krc4mAxvTl2/img/ai_4.png',
    likes: 312,
    comments: 45,
    shares: 28,
  },
  {
    id: '5',
    userId: '5',
    userName: 'Alex Rivera',
    userAvatar: 'https://placehold.co/100x100',
    timestamp: '10 hours ago',
    content: 'The creator economy is evolving. Are you ready to take control of your content and community?',
    image: 'https://c.animaapp.com/mi4krc4mAxvTl2/img/ai_5.png',
    likes: 278,
    comments: 36,
    shares: 22,
  },
];

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: initialPosts,
  isLoading: false,
  hasMore: true,
  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
  loadMorePosts: () => {
    const { isLoading, hasMore, posts } = get();
    if (isLoading || !hasMore) return;

    set({ isLoading: true });

    // Simulate API call
    setTimeout(() => {
      const newPosts: Post[] = [
        {
          id: `${posts.length + 1}`,
          userId: `${(posts.length % 5) + 1}`,
          userName: 'Creator ' + (posts.length + 1),
          userAvatar: 'https://placehold.co/100x100',
          timestamp: `${posts.length + 2} hours ago`,
          content: `This is post number ${posts.length + 1}. Keep scrolling for more amazing content!`,
          likes: Math.floor(Math.random() * 300),
          comments: Math.floor(Math.random() * 50),
          shares: Math.floor(Math.random() * 30),
        },
      ];

      set((state) => ({
        posts: [...state.posts, ...newPosts],
        isLoading: false,
        hasMore: state.posts.length < 50,
      }));
    }, 1000);
  },
}));
