import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  deleteNotification,
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../Api/notificationApi";

export type NotificationType =
  | "new_order"
  | "order_cancelled"
  | "product_low_stock"
  | "product_out_of_stock"
  | "new_product_review"
  | "new_farmer_review"
  | "order_accepted"
  | "order_rejected";

export type Notification = {
  _id: string;
  receiverId: string;
  receiverRole: "Farmer" | "Customer";
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

type Pagination = {
  totalNotifications: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
};

type NotificationContextType = {
  notifications: Notification[];
  latestNotifications: Notification[];
  unreadCount: number;
  loadingNotifications: boolean;
  pagination: Pagination | null;
  fetchNotifications: (page?: number, limit?: number) => Promise<void>;
  readNotification: (notificationId: string) => Promise<void>;
  readAllNotifications: () => Promise<void>;
  removeNotification: (notificationId: string) => Promise<void>;
};

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const fetchNotifications = useCallback(async (page = 1, limit = 20) => {
    try {
      setLoadingNotifications(true);

      const response = await getNotifications(page, limit);

      if (response.data.success) {
        setNotifications(response.data.notifications || []);
        setUnreadCount(response.data.unreadCount || 0);
        setPagination(response.data.pagination || null);
      }
    } finally {
      setLoadingNotifications(false);
    }
  }, []);

  const readNotification = useCallback(async (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item._id === notificationId ? { ...item, isRead: true } : item
      )
    );

    setUnreadCount((prev) => Math.max(prev - 1, 0));

    try {
      await markNotificationAsRead(notificationId);
    } catch (error) {
      await fetchNotifications();
    }
  }, [fetchNotifications]);

  const readAllNotifications = useCallback(async () => {
    const oldNotifications = notifications;
    const oldUnreadCount = unreadCount;

    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        isRead: true,
      }))
    );
    setUnreadCount(0);

    try {
      await markAllNotificationsAsRead();
    } catch (error) {
      setNotifications(oldNotifications);
      setUnreadCount(oldUnreadCount);
    }
  }, [notifications, unreadCount]);

  const removeNotification = useCallback(async (notificationId: string) => {
    const oldNotifications = notifications;
    const removedNotification = notifications.find(
      (item) => item._id === notificationId
    );

    setNotifications((prev) =>
      prev.filter((item) => item._id !== notificationId)
    );

    if (removedNotification && !removedNotification.isRead) {
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    }

    try {
      await deleteNotification(notificationId);
    } catch (error) {
      setNotifications(oldNotifications);
      if (removedNotification && !removedNotification.isRead) {
        setUnreadCount((prev) => prev + 1);
      }
    }
  }, [notifications]);

  useEffect(() => {
    fetchNotifications(1, 20);
  }, [fetchNotifications]);

  const latestNotifications = useMemo(() => {
    return notifications.slice(0, 5);
  }, [notifications]);

  const value = useMemo(
    () => ({
      notifications,
      latestNotifications,
      unreadCount,
      loadingNotifications,
      pagination,
      fetchNotifications,
      readNotification,
      readAllNotifications,
      removeNotification,
    }),
    [
      notifications,
      latestNotifications,
      unreadCount,
      loadingNotifications,
      pagination,
      fetchNotifications,
      readNotification,
      readAllNotifications,
      removeNotification,
    ]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};