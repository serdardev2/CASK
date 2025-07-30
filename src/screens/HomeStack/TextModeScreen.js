import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/colors';

const TextModeScreen = ({navigation, route}) => {
  const [notificationData, setNotificationData] = useState(null);

  useEffect(() => {
    if (route.params?.notificationData) {
      setNotificationData(route.params.notificationData);
    }
  }, [route.params]);

  const formatTimestamp = () => {
    const date = new Date();
    return date.toLocaleString();
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={Colors.gradients.primary}
          style={styles.headerGradient}>
          <View style={styles.header}>
            <Text style={styles.headerIcon}>📝</Text>
            <Text style={styles.headerTitle}>Text Mode Notification</Text>
            <Text style={styles.headerSubtitle}>
              Plain text notification content
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {notificationData ? (
            <LinearGradient
              colors={Colors.gradients.purple}
              style={styles.notificationGradient}>
              <View style={styles.notificationCard}>
                <View style={styles.notificationHeader}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.notificationIcon}>📝</Text>
                  </View>
                  <View style={styles.headerTextContainer}>
                    <Text style={styles.notificationTitle}>
                      {notificationData.title || 'Text Notification'}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {formatTimestamp()}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <Text style={styles.notificationBody}>
                  {notificationData.body || 'No message content'}
                </Text>

                <View style={styles.notificationFooter}>
                  <View style={styles.metaContainer}>
                    <Text style={styles.metaLabel}>Type:</Text>
                    <View style={styles.typeBadge}>
                      <Text style={styles.typeBadgeText}>Text Mode</Text>
                    </View>
                  </View>
                  {notificationData.notification_id && (
                    <View style={styles.metaContainer}>
                      <Text style={styles.metaLabel}>ID:</Text>
                      <Text style={styles.metaValue}>
                        {notificationData.notification_id}
                      </Text>
                    </View>
                  )}
                </View>

                {notificationData.fullData && (
                  <View style={styles.debugContainer}>
                    <Text style={styles.debugTitle}>Debug Info</Text>
                    <Text style={styles.debugText}>
                      {JSON.stringify(notificationData.fullData.data, null, 2)}
                    </Text>
                  </View>
                )}
              </View>
            </LinearGradient>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyTitle}>No Notification Data</Text>
              <Text style={styles.emptySubtitle}>
                Send a text notification to see it here
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Push Notification')}
                activeOpacity={0.8}>
                <LinearGradient
                  colors={Colors.gradients.purple}
                  style={styles.sendButton}>
                  <Text style={styles.sendButtonText}>
                    Send Text Notification
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>About Text Mode</Text>
            <Text style={styles.infoText}>
              Text mode notifications contain only textual content without any media attachments. 
              They are perfect for simple alerts, messages, and updates that don't require visual elements.
            </Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Lightweight and fast</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Title and body content</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Perfect for alerts</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.text.white,
    opacity: Colors.opacity.light,
  },
  content: {
    padding: 20,
  },
  notificationGradient: {
    borderRadius: 20,
    padding: 2,
    marginBottom: 20,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4.84,
  },
  notificationCard: {
    backgroundColor: Colors.cardBackgroundTransparent,
    borderRadius: 18,
    padding: 20,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationIcon: {
    fontSize: 28,
  },
  headerTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 3,
  },
  notificationTime: {
    fontSize: 14,
    color: Colors.text.tertiary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border.light,
    marginVertical: 15,
    opacity: 0.5,
  },
  notificationBody: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text.secondary,
    marginBottom: 20,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 5,
  },
  metaLabel: {
    fontSize: 14,
    color: Colors.text.tertiary,
    marginRight: 8,
  },
  metaValue: {
    fontSize: 14,
    color: Colors.text.primary,
    fontFamily: 'monospace',
  },
  typeBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    color: Colors.text.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  debugContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: Colors.text.muted,
    fontFamily: 'monospace',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginBottom: 30,
  },
  sendButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
  },
  sendButtonText: {
    color: Colors.text.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: Colors.cardBackground,
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: Colors.opacity.dark,
    shadowRadius: 3.84,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.text.secondary,
    marginBottom: 15,
  },
  featureList: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    fontSize: 16,
    color: Colors.success,
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: Colors.text.primary,
  },
});

export default TextModeScreen;