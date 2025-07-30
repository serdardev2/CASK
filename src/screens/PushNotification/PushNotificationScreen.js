import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import {getFcmToken, getCurrentFcmToken} from '../../notificationServices';
import {Colors} from '../../constants/colors';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';

const PushNotificationScreen = ({route}) => {
  const [fcmToken, setFcmToken] = useState('');
  const [selectedPN, setSelectedPN] = useState(
    route.params?.selectedType || '1',
  );
  const [delay, setDelay] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFcmToken();
  }, []);

  useEffect(() => {
    if (route.params?.selectedType) {
      setSelectedPN(route.params.selectedType);
    }
  }, [route.params?.selectedType]);

  const loadFcmToken = async () => {
    let token = getCurrentFcmToken();
    if (!token) {
      token = await getFcmToken();
    }
    setFcmToken(token || 'No FCM token available');
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!delay || delay === '0') {
      Alert.alert(
        'Validation Error',
        'Please enter a delay value greater than 0',
      );
      return;
    }

    if (!fcmToken || fcmToken === 'No FCM token available') {
      Alert.alert(
        'Error',
        'FCM token is not available. Please check your notification permissions.',
      );
      return;
    }

    setLoading(true);

    const pnTypeNumber = parseInt(selectedPN);

    console.log('Config values:', {
      API_ADMMDLID: Config.API_ADMMDLID,
      API_SCOPE: Config.API_SCOPE,
    });

    const requestData = {
      v: 1,
      platform: 'app',
      admmdlid:
        '12f3894ed72fc7d4e3b98688b20513e20a3fa1adbd08b9662412322138d26533',
      scope: '8fbff85cb7a2b8cbd53b3086c0b16d4c1e96a5d748cbf8761bace32ab294e83a',
      fcm_token: fcmToken,
      pn_type: pnTypeNumber,
      pn_delay: parseInt(delay),
      dev_mode: false,
    };

    try {
      const response = await fetch('https://challenges.cask.com.tr/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      let responseData;
      try {
        const responseText = await response.text();
        if (responseText) {
          responseData = JSON.parse(responseText);
        }
      } catch (jsonError) {}

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Success! 🎉',
          text2: `Notification scheduled with ${delay} second delay`,
          position: 'top',
          visibilityTime: 3000,
        });
        setDelay('');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to schedule notification',
          text2: responseData?.message,
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Failed to connect to the server',
        position: 'top',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const pnOptions = [
    {label: 'Text Mode', value: '1'},
    {label: 'Photo Mode', value: '2'},
    {label: 'Video Mode', value: '3'},
  ];

  const getNotificationInfo = type => {
    switch (type) {
      case '1':
        return {
          icon: '📝',
          title: 'Text Mode',
          description: 'Send text-only notifications with title and message',
          color: Colors.gradients.purple,
        };
      case '2':
        return {
          icon: '📷',
          title: 'Photo Mode',
          description: 'Send notifications with images and text content',
          color: Colors.gradients.pink,
        };
      case '3':
        return {
          icon: '🎥',
          title: 'Video Mode',
          description: 'Send rich notifications with video content',
          color: Colors.gradients.blue,
        };
      default:
        return {
          icon: '📬',
          title: 'Custom Notification',
          description: 'Send a custom notification message',
          color: Colors.gradients.light,
        };
    }
  };

  const currentNotificationInfo = getNotificationInfo(selectedPN);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={Colors.gradients.primary}
            style={styles.headerGradient}>
            <Text style={styles.headerTitle}>Send Push Notification</Text>
            <Text style={styles.headerSubtitle}>
              Schedule and customize your notifications
            </Text>
          </LinearGradient>

          <View style={styles.content}>
            {/* Selected Notification Preview */}
            <LinearGradient
              colors={currentNotificationInfo.color}
              style={styles.previewCard}>
              <View style={styles.previewContent}>
                <Text style={styles.previewIcon}>
                  {currentNotificationInfo.icon}
                </Text>
                <View style={styles.previewTextContainer}>
                  <Text style={styles.previewTitle}>
                    {currentNotificationInfo.title}
                  </Text>
                  <Text style={styles.previewDescription}>
                    {currentNotificationInfo.description}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Notification Settings</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Notification Type</Text>
                <View style={styles.selectContainer}>
                  <LinearGradient
                    colors={[Colors.background, Colors.cardBackground]}
                    style={styles.selectGradient}>
                    <RNPickerSelect
                      onValueChange={value => setSelectedPN(value)}
                      items={pnOptions}
                      value={selectedPN}
                      style={pickerSelectStyles}
                      placeholder={{}}
                    />
                  </LinearGradient>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Delay (seconds)</Text>
                <View style={styles.inputWrapper}>
                  <LinearGradient
                    colors={[Colors.background, Colors.cardBackground]}
                    style={styles.inputGradient}>
                    <TextInput
                      style={styles.numberInput}
                      value={delay}
                      onChangeText={setDelay}
                      keyboardType="numeric"
                      placeholder="Enter delay in seconds"
                      placeholderTextColor={Colors.text.light}
                      returnKeyType="done"
                      onSubmitEditing={Keyboard.dismiss}
                    />
                  </LinearGradient>
                  <Text style={styles.inputHint}>Minimum delay: 1 second</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                activeOpacity={0.8}>
                <LinearGradient
                  colors={
                    loading
                      ? [Colors.text.light, '#777']
                      : Colors.gradients.purple
                  }
                  style={styles.submitButton}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Text style={styles.submitButtonText}>
                        Send Notification
                      </Text>
                      <Text style={styles.submitButtonIcon}>🚀</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.tokenContainer}>
              <View style={styles.tokenHeader}>
                <Text style={styles.tokenLabel}>Device Token</Text>
                <View
                  style={[
                    styles.tokenBadge,
                    {
                      backgroundColor:
                        fcmToken && fcmToken !== 'No FCM token available'
                          ? Colors.success
                          : Colors.text.light,
                    },
                  ]}>
                  <Text style={styles.tokenBadgeText}>
                    {fcmToken && fcmToken !== 'No FCM token available'
                      ? 'Active'
                      : 'Inactive'}
                  </Text>
                </View>
              </View>
              <Text
                style={styles.tokenText}
                selectable={true}
                numberOfLines={4}>
                {fcmToken}
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    flex: 1,
  },
  previewCard: {
    borderRadius: 20,
    padding: 2,
    marginBottom: 20,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4.84,
  },
  previewContent: {
    backgroundColor: Colors.cardBackgroundTransparent,
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewIcon: {
    fontSize: 50,
    marginRight: 15,
  },
  previewTextContainer: {
    flex: 1,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 5,
  },
  previewDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: Colors.cardBackground,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: Colors.opacity.dark,
    shadowRadius: 3.84,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: Colors.text.primary,
  },
  selectContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  selectGradient: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border.dark,
  },
  selectIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    marginTop: -10,
  },
  selectIconText: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  inputWrapper: {
    position: 'relative',
  },
  inputGradient: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border.dark,
  },
  numberInput: {
    padding: 15,
    fontSize: 16,
    color: Colors.text.primary,
  },
  inputHint: {
    fontSize: 12,
    color: Colors.text.light,
    marginTop: 5,
    marginLeft: 5,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  submitButtonText: {
    color: Colors.text.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  submitButtonIcon: {
    fontSize: 20,
  },
  tokenContainer: {
    backgroundColor: Colors.cardBackground,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: Colors.opacity.dark,
    shadowRadius: 3.84,
  },
  tokenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tokenLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  tokenBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  tokenBadgeText: {
    fontSize: 12,
    color: Colors.text.white,
    fontWeight: 'bold',
  },
  tokenText: {
    fontSize: 12,
    color: Colors.text.muted,
    lineHeight: 18,
    fontFamily: 'monospace',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: Colors.text.primary,
    paddingRight: 40,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: Colors.text.primary,
    paddingRight: 40,
  },
  iconContainer: {
    top: 15,
    right: 15,
  },
});

export default PushNotificationScreen;
