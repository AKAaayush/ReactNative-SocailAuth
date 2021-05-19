import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  LoginButton,
  AccessToken,
  GraphRequestManager,
  LoginManager,
  GraphRequest,
} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '95870097735-nopc31ugo61hpjvb528u3gnal6q32ure.apps.googleusercontent.com',
  offlineAccess: true,
});

const app = () => {
  const [userGoogleInfo, setUserGoogleInfo] = useState({});
  const [loaded, setLaoded] = useState(false);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setUserGoogleInfo(userInfo);
      setLaoded(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>Social Authentication</Text>
      </View>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
      <View>
        <GoogleSigninButton
          onPress={() => {
            signIn();
          }}
          size={GoogleSigninButton.Color.Dark}
          style={{width: 100, height: 100}}
        />
      </View>
      {loaded ? (
        <View>
          <Text>{userGoogleInfo.user.name}</Text>
          <Text>{userGoogleInfo.user.email}</Text>
          <Image
            style={{width: 100, height: 100}}
            source={{uri: userGoogleInfo.user.photo}}
          />
        </View>
      ) : (
        <View>
          <Text>Not SignedIn</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default app;
