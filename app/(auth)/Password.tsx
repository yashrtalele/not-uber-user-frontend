import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import Header from '@/components/Header';
import { ChevronRight, Eye, EyeOff } from '@tamagui/lucide-icons';
import { useAuth } from '../context/AuthContext';

const styles = StyleSheet.create({
  containerStyle: {
    width: 330,
  },
  pinCodeContainerStyle: {
    width: 60,
    height: 57,
    borderRadius: 20,
    backgroundColor: '#FAFAFA',
  },
  pinCodeTextStyle: {
    fontFamily: 'Lexend',
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'center',
    color: '#030318',
  },
  focusedPinCodeContainerStyle: {
    borderColor: '#030318',
    backgroundColor: 'transparent',
  },
  placeholderTextStyle: {
    fontWeight: '500',
    fontFamily: 'Lexend',
    fontSize: 32,
    color: '#000000',
  },
  submitContainer: {
    backgroundColor: '#030318',
    width: 332,
    height: 67,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingContainer: {
    width: 340,
    paddingBottom: 15,
  },
  singleInputContainer: {
    paddingTop: 170,
    paddingBottom: 370,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontWeight: '600',
    fontFamily: 'Lexend',
    fontSize: 23,
    color: '#030318',
  },
  infoContainer: {
    width: 351,
    height: 99,
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  infoInnerContainer: {
    paddingBottom: 5,
  },
  nextText: {
    fontFamily: 'Lexend',
    fontWeight: 400,
    fontSize: 25,
    color: '#FFFFFF',
  },
  nextButtonContainer: {
    width: '85%',
    paddingLeft: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Password() {
  const { onSignin } = useAuth();
  const { phoneNumber, userEmail } = useGlobalSearchParams() as {
    phoneNumber: string;
    userEmail: string;
  };
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePress = async () => {
    if (password === '') {
      alert('Please enter a valid password!');
      return;
    }
    console.log(userEmail, password);
    const response = await onSignin('yashrtalele', password);
    if (response.error) {
      alert(response.msg);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header />
      <View style={styles.singleInputContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Enter your password</Text>
        </View>
        <View
          style={{
            backgroundColor: '#FAFAFA',
            borderRadius: 20,
            flexDirection: 'row',
            width: 340,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={{
              borderWidth: 0,
              borderRadius: 15,
              width: 270,
              height: 60,
              paddingLeft: 30,
              backgroundColor: '#FAFAFA',
            }}
            placeholder="P@ssw0rd!"
            placeholderTextColor="#B2B2B2"
            fontSize={21}
            color="#454545"
            fontFamily="Lexend"
            fontWeight="500"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={showPassword}
          />
          <TouchableOpacity
            style={{
              paddingRight: 30,
            }}
            onPress={toggleShowPassword}>
            {showPassword ? <Eye /> : <EyeOff />}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.infoContainer}>
          <View style={styles.infoInnerContainer}>
            <TouchableOpacity
              style={styles.submitContainer}
              onPress={handlePress}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 67,
                  width: 332,
                }}>
                <View style={styles.nextButtonContainer}>
                  <Text style={styles.nextText}>Sign in</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    height: '100%',
                    alignItems: 'center',
                  }}>
                  <ChevronRight color="white" size={35} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
