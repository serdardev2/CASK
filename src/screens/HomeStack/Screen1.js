import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';

const Screen1 = ({navigation, route}) => {
  const [notificationData, setNotificationData] = useState(null);

  useEffect(() => {
    if (route.params?.notificationData) {
      setNotificationData(route.params.notificationData);
    }
  }, [route.params]);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>

        {notificationData && (
          <View style={styles.notificationCard}>
            <Text style={styles.notificationTitle}>
              {notificationData.title}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.bodyText}>{notificationData.body}</Text>
          </View>
        )}
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
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
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

export default Screen1;
