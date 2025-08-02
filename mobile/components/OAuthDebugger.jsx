import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';

export const OAuthDebugger = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const router = useRouter();

  const testOAuthFlow = async () => {
    try {
      console.log('Starting OAuth flow...');
      const result = await startOAuthFlow();
      console.log('OAuth result:', result);
      
      if (result.createdSessionId) {
        Alert.alert('Success', 'OAuth flow completed successfully!');
        router.replace('/');
      } else {
        Alert.alert('Info', 'OAuth flow completed but no session created. Check console for details.');
      }
    } catch (error) {
      console.error('OAuth Debug Error:', error);
      Alert.alert(
        'OAuth Error', 
        `Error: ${error.message || 'Unknown error'}\n\nCheck console for full details.`
      );
    }
  };

  const checkConfiguration = () => {
    const config = {
      clerkKey: Constants.expoConfig?.extra?.clerkPublishableKey,
      googleClientId: Constants.expoConfig?.extra?.googleClientId,
      googleClientSecret: Constants.expoConfig?.extra?.googleClientSecret,
    };
    
    console.log('Current Configuration:', config);
    Alert.alert(
      'Configuration Check',
      `Clerk Key: ${config.clerkKey ? 'Set' : 'Missing'}\n` +
      `Google Client ID: ${config.googleClientId && config.googleClientId !== 'YOUR_GOOGLE_CLIENT_ID' ? 'Set' : 'Missing'}\n` +
      `Google Client Secret: ${config.googleClientSecret && config.googleClientSecret !== 'YOUR_GOOGLE_CLIENT_SECRET' ? 'Set' : 'Missing'}`
    );
  };

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        OAuth Debugger
      </Text>
      
      <Pressable
        style={{
          backgroundColor: '#007AFF',
          padding: 15,
          borderRadius: 8,
          alignItems: 'center',
        }}
        onPress={testOAuthFlow}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Test Google OAuth Flow
        </Text>
      </Pressable>
      
      <Pressable
        style={{
          backgroundColor: '#34C759',
          padding: 15,
          borderRadius: 8,
          alignItems: 'center',
        }}
        onPress={checkConfiguration}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Check Configuration
        </Text>
      </Pressable>
    </View>
  );
}; 