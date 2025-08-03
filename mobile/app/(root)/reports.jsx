import { View, Text } from 'react-native';
import React from 'react';
import SafeScreen from '../../components/SafeScreen';
import { styles } from '../../assets/styles/reports.styles';

const ReportsScreen = () => {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Reports</Text>
        {/* Placeholder for future charts and reports */}
        <View style={styles.content}>
          <Text>Coming Soon: Charts and analysis will be here!</Text>
        </View>
      </View>
    </SafeScreen>
  );
};

export default ReportsScreen;
