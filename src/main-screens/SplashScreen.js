import React from 'react';
import {ActivityIndicator, View, Text, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CASKLogo from '../assets/svg/cask-logo-light.svg';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  render() {
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <LinearGradient
          colors={['#141e30', '#1c3755']}
          angle={180}
          style={{
            display: 'flex',
            flex: 1,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CASKLogo
            style={{
              width: 192,
              height: 192,
            }}
          />

          {this.state.isLoading && (
            <ActivityIndicator
              size="small"
              color="#ffffff"
              style={{padding: 32}}
            />
          )}
          <Text
            style={{
              color: '#fff',
              fontSize: 17,
              marginTop: 8,
            }}>
            - CASK RN Challenge 2 -
          </Text>
        </LinearGradient>
      </View>
    );
  }
}

SplashScreen.defaultProps = {
  progress: false,
};
