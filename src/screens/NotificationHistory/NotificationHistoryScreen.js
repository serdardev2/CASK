import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  RefreshControl,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FlashList} from '@shopify/flash-list';
import {NotificationStorage} from '../../services/NotificationStorage';
import {useFocusEffect} from '@react-navigation/native';
import {navigateToHomeStackScreen} from '../../services/NavigationService';
import WebView from 'react-native-webview';
import {Colors} from '../../constants/colors';

const {width} = Dimensions.get('window');

const NotificationHistoryScreen = () => {
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
        navigateToHomeStackScreen('TextMode', {notificationData});
        break;
      case '2':
        navigateToHomeStackScreen('PhotoModeScreen', {notificationData});
        break;
      case '3':
        navigateToHomeStackScreen('VideoModeScreen', {notificationData});
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
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString();
  };

  const getNotificationIcon = pnType => {
    switch (pnType) {
      case '1':
        return '📝';
      case '2':
        return '📷';
      case '3':
        return '🎥';
      default:
        return '📬';
    }
  };

  const getNotificationColor = pnType => {
    switch (pnType) {
      case '1':
        return Colors.gradients.purple;
      case '2':
        return Colors.gradients.pink;
      case '3':
        return Colors.gradients.blue;
      default:
        return Colors.gradients.light;
    }
  };

  const renderMedia = item => {
    if (
      item.data?.image_url ||
      item.fullPayload?.notification?.android?.imageUrl
    ) {
      const imageUrl =
        item.data?.image_url ||
        item.fullPayload?.notification?.android?.imageUrl;
      return (
        <Image
          source={{uri: imageUrl}}
          style={styles.notificationImage}
          resizeMode="cover"
        />
      );
    }

    if (item.data?.video_url) {
      return (
        <View style={styles.videoContainer}>
          <WebView
            source={{uri: item.data.video_url}}
            style={styles.notificationVideo}
            allowsFullscreenVideo
            mediaPlaybackRequiresUserAction={true}
          />
          <View style={styles.videoOverlay}>
            <Text style={styles.videoPlayIcon}>▶️</Text>
          </View>
        </View>
      );
    }

    return null;
  };

  const renderNotificationItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleNotificationPress(item)}
      onLongPress={() => handleDeleteNotification(item.id)}
      activeOpacity={0.9}>
      <LinearGradient
        colors={getNotificationColor(item.pn_type)}
        style={styles.notificationGradient}>
        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <View style={styles.iconContainer}>
              <Text style={styles.notificationIcon}>
                {getNotificationIcon(item.pn_type)}
              </Text>
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.notificationTitle} numberOfLines={1}>
                {item.title || 'Notification'}
              </Text>
              <Text style={styles.notificationTime}>
                {formatDate(item.timestamp)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleDeleteNotification(item.id)}
              style={styles.deleteButton}>
              <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.notificationBody} numberOfLines={2}>
            {item.body || 'No content'}
          </Text>

          {renderMedia(item)}

          <View style={styles.notificationFooter}>
            <View style={styles.pnTypeBadge}>
              <Text style={styles.pnTypeText}>
                {item.pn_type === '1'
                  ? 'Text'
                  : item.pn_type === '2'
                  ? 'Photo'
                  : item.pn_type === '3'
                  ? 'Video'
                  : 'Type ' + item.pn_type}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📭</Text>
      <Text style={styles.emptyText}>No notifications yet</Text>
      <Text style={styles.emptySubtext}>
        Your notification history will appear here
      </Text>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.container}>
        <LinearGradient
          colors={Colors.gradients.primary}
          style={styles.headerGradient}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Notification History</Text>
              <Text style={styles.subtitle}>
                {notifications.length} notification
                {notifications.length !== 1 ? 's' : ''}
              </Text>
            </View>
            {notifications.length > 0 && (
              <TouchableOpacity
                onPress={handleClearAll}
                style={styles.clearButton}>
                <LinearGradient
                  colors={Colors.gradients.red}
                  style={styles.clearButtonGradient}>
                  <Text style={styles.clearButtonText}>Clear All</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>

        <FlashList
          data={notifications}
          renderItem={renderNotificationItem}
          estimatedItemSize={150}
          keyExtractor={item => item.id}
          ListEmptyComponent={EmptyComponent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primaryLight}
            />
          }
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.white,
    opacity: Colors.opacity.light,
  },
  clearButton: {
    marginLeft: 10,
  },
  clearButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  clearButtonText: {
    color: Colors.text.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContent: {
    padding: 20,
  },
  notificationGradient: {
    borderRadius: 15,
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: Colors.opacity.dark,
    shadowRadius: 3.84,
  },
  notificationContent: {
    backgroundColor: Colors.cardBackgroundTransparent,
    margin: 2,
    borderRadius: 13,
    padding: 16,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `rgba(255,255,255,${Colors.opacity.overlay})`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationIcon: {
    fontSize: 28,
  },
  headerTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 2,
  },
  notificationTime: {
    fontSize: 13,
    color: Colors.text.tertiary,
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    fontSize: 20,
  },
  notificationBody: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  notificationImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  videoContainer: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    position: 'relative',
  },
  notificationVideo: {
    flex: 1,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `rgba(0,0,0,${Colors.opacity.overlay})`,
  },
  videoPlayIcon: {
    fontSize: 40,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pnTypeBadge: {
    backgroundColor: `rgba(0,0,0,${Colors.opacity.dark})`,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pnTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  notificationId: {
    fontSize: 11,
    color: Colors.text.quaternary,
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
});

export default NotificationHistoryScreen;
