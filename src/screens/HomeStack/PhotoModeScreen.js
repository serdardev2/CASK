import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';

const PhotoModeScreen = ({navigation, route}) => {
  const [notificationData, setNotificationData] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (route.params?.notificationData) {
      setNotificationData(route.params.notificationData);
      if (route.params.notificationData.fullData?.data?.img_url) {
        setNotificationData({
          ...route.params.notificationData,
          img_url: route.params.notificationData.fullData.data.img_url,
        });
      }
    }
  }, [route.params]);
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Photo Mode</Text>

        {notificationData && (
          <View style={styles.notificationCard}>
            <Text style={styles.notificationTitle}>
              {notificationData.title || 'Image Notification'}
            </Text>
            <View style={styles.divider} />

            {notificationData.img_url && (
              <View style={styles.imageContainer}>
                {imageLoading && (
                  <ActivityIndicator
                    size="large"
                    color="#141e30"
                    style={styles.loader}
                  />
                )}
                <Image
                  source={{uri: notificationData.img_url}}
                  style={styles.image}
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => setImageLoading(false)}
                  resizeMode="cover"
                />
              </View>
            )}
          </View>
        )}

        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          color="#666"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#141e30',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
  metaInfo: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  metaLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default PhotoModeScreen;
