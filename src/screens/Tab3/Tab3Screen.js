import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {NotificationStorage} from '../../services/NotificationStorage';
import {useFocusEffect} from '@react-navigation/native';
import {navigateToTab1Screen} from '../../services/NavigationService';

const Tab3Screen = () => {
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadNotifications = async () => {
    const history = await NotificationStorage.getNotificationHistory();
    setNotifications(history);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadNotifications();
    }, []),
  );

  const handleDeleteNotification = notificationId => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await NotificationStorage.deleteNotification(notificationId);
            loadNotifications();
          },
        },
      ],
    );
  };

  const handleNotificationPress = item => {
    const notificationData = {
      title: item.title,
      body: item.body,
      notification_id: item.notification_id,
      pn_type: item.pn_type,
      fullData: item.fullPayload,
    };

    switch (item.pn_type) {
      case '1':
        navigateToTab1Screen('Screen1', {notificationData});
        break;
      case '2':
        navigateToTab1Screen('Screen2', {notificationData});
        break;
      case '3':
        navigateToTab1Screen('Screen3', {notificationData});
        break;
      default:
        console.log('Unknown pn_type:', item.pn_type);
    }
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notification history?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await NotificationStorage.clearHistory();
            loadNotifications();
          },
        },
      ],
    );
  };

  const formatDate = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const renderNotificationItem = ({item}) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => handleNotificationPress(item)}
      onLongPress={() => handleDeleteNotification(item.id)}
      activeOpacity={0.7}>
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <View style={styles.pnTypeBadge}>
          <Text style={styles.pnTypeText}>PN{item.pn_type}</Text>
        </View>
      </View>
      <Text style={styles.notificationBody} numberOfLines={2}>
        {item.body}
      </Text>
      <View style={styles.notificationFooter}>
        <Text style={styles.notificationTime}>
          {formatDate(item.timestamp)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No notifications yet</Text>
      <Text style={styles.emptySubtext}>
        Push notifications will appear here
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        {notifications.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlashList
        data={notifications}
        renderItem={renderNotificationItem}
        estimatedItemSize={120}
        keyExtractor={item => item.id}
        ListEmptyComponent={EmptyComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#141e30',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: '#ff4444',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  pnTypeBadge: {
    backgroundColor: '#141e30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  pnTypeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  notificationBody: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  notificationId: {
    fontSize: 12,
    color: '#999',
  },
  separator: {
    height: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default Tab3Screen;
