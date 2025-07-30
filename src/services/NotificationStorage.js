import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_HISTORY_KEY = '@notification_history';

export const NotificationStorage = {
  async saveNotification(notification) {
    try {
      const history = await this.getNotificationHistory();
      const newNotification = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        title: notification.notification?.title,
        body: notification.notification?.body,
        notification_id: notification.data?.notification_id,
        pn_type: notification.data?.pn_type,
        data: notification.data,
        fullPayload: notification,
      };

      const updatedHistory = [newNotification, ...history];
      await AsyncStorage.setItem(
        NOTIFICATION_HISTORY_KEY,
        JSON.stringify(updatedHistory),
      );
      return true;
    } catch (error) {
      return false;
    }
  },

  async getNotificationHistory() {
    try {
      const historyJson = await AsyncStorage.getItem(NOTIFICATION_HISTORY_KEY);
      return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
      return [];
    }
  },

  async deleteNotification(notificationId) {
    try {
      const history = await this.getNotificationHistory();
      const updatedHistory = history.filter(item => item.id !== notificationId);
      await AsyncStorage.setItem(
        NOTIFICATION_HISTORY_KEY,
        JSON.stringify(updatedHistory),
      );
      return true;
    } catch (error) {
      return false;
    }
  },

  async clearHistory() {
    try {
      await AsyncStorage.removeItem(NOTIFICATION_HISTORY_KEY);
      return true;
    } catch (error) {
      return false;
    }
  },
};
