import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoModeScreen = ({navigation, route}) => {
  const [notificationData, setNotificationData] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [playing, setPlaying] = useState(false);

  const extractYouTubeId = url => {
    if (!url) return null;

    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
      /^([^&\n?#]+)$/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  useEffect(() => {
    if (route.params?.notificationData) {
      setNotificationData(route.params.notificationData);
      if (route.params.notificationData.fullData?.data?.youtube_url) {
        const youtubeUrl =
          route.params.notificationData.fullData.data.youtube_url;
        const id = extractYouTubeId(youtubeUrl);
        setVideoId(id);
        setNotificationData({
          ...route.params.notificationData,
          youtube_url: youtubeUrl,
        });
      }
    }
  }, [route.params]);
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Video Mode</Text>

        {notificationData && (
          <View style={styles.notificationCard}>
            <Text style={styles.notificationTitle}>
              {notificationData.title}
            </Text>
            <View style={styles.divider} />

            {videoId && (
              <View style={styles.videoContainer}>
                <YoutubePlayer
                  height={220}
                  play={playing}
                  videoId={videoId}
                  onChangeState={event => {
                    if (event === 'ended') {
                      setPlaying(false);
                    }
                  }}
                />
              </View>
            )}

            {!videoId && notificationData.youtube_url && (
              <Text style={styles.errorText}>Unable to load video</Text>
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
  videoContainer: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  errorText: {
    fontSize: 14,
    color: '#ff4444',
    textAlign: 'center',
    marginVertical: 20,
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

export default VideoModeScreen;
