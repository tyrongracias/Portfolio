import { create } from 'zustand';

interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    {
      id: '1',
      message: 'Sarah Johnson started following you',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: '2',
      message: 'Your post received 100 likes',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      message: 'Mike Chen commented on your post',
      time: '2 hours ago',
      read: true,
    },
  ],
  unreadCount: 2,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
}));
