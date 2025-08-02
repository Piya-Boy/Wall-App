import { View, Text } from 'react-native';
import React from 'react';
import SafeScreen from '../../components/SafeScreen';
import { styles } from '../../assets/styles/settings.styles';

const SettingsScreen = () => {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Settings</Text>
        {/* Placeholder for future settings options */}
        <View style={styles.content}>
          <Text>Coming Soon: Settings and options will be here!</Text>
        </View>
      </View>
    </SafeScreen>
  );
};

export default SettingsScreen;
