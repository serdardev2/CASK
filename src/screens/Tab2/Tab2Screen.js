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
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {getFcmToken, getCurrentFcmToken} from '../../notificationServices';

const Tab2Screen = () => {
  const [fcmToken, setFcmToken] = useState('');
  const [selectedPN, setSelectedPN] = useState('1');
  const [delay, setDelay] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFcmToken();
  }, []);

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
        setDelay('');
      } else {
        Alert.alert(
          'Error',
          `Failed to schedule notification: ${
            responseData?.message || 'Unknown error'
          }`,
          [{text: 'OK'}],
        );
      }
    } catch (error) {
      Alert.alert(
        'Network Error',
        'Failed to connect to the server. Please check your internet connection.',
        [{text: 'OK'}],
      );
    } finally {
      setLoading(false);
    }
  };

  const pnOptions = [
    {label: 'PN1', value: '1'},
    {label: 'PN2', value: '2'},
    {label: 'PN3', value: '3'},
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Push Notification</Text>

          <View style={styles.tokenContainer}>
            <Text style={styles.tokenLabel}>FCM Token:</Text>
            <Text style={styles.tokenText} selectable={true}>
              {fcmToken}
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Select PN Type:</Text>
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={value => setSelectedPN(value)}
                  items={pnOptions}
                  value={selectedPN}
                  style={pickerSelectStyles}
                  placeholder={{}}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Delay:</Text>
              <TextInput
                style={styles.numberInput}
                value={delay}
                onChangeText={setDelay}
                keyboardType="numeric"
                placeholder="Enter delay"
                placeholderTextColor="#999"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                loading && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#141e30',
  },
  tokenContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tokenLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  tokenText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
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
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  numberInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#141e30',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default Tab2Screen;
