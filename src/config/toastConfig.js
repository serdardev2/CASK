import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';

export const toastConfig = {
  success: ({text1, text2}) => (
    <View style={[styles.container, styles.successContainer]}>
      <View style={styles.content}>
        <Text style={styles.title}>{text1}</Text>
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>
    </View>
  ),

  alert: ({text1, text2}) => (
    <View style={[styles.container, styles.alertContainer]}>
      <View style={styles.content}>
        <Text style={styles.title}>{text1}</Text>
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>
    </View>
  ),

  error: ({text1, text2}) => (
    <View style={[styles.container, styles.errorContainer]}>
      <View style={styles.content}>
        <Text style={styles.title}>{text1}</Text>
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>
    </View>
  ),

  info: ({text1, text2}) => (
    <View style={[styles.container, styles.infoContainer]}>
      <View style={styles.content}>
        <Text style={styles.title}>{text1}</Text>
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successContainer: {
    backgroundColor: Colors.toast.success,
  },
  alertContainer: {
    backgroundColor: Colors.toast.alert,
  },
  errorContainer: {
    backgroundColor: Colors.toast.error,
  },
  infoContainer: {
    backgroundColor: Colors.toast.info,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.white,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: Colors.text.white,
    marginTop: 5,
    textAlign: 'center',
    opacity: 0.9,
  },
});
