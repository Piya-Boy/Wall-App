import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { WebView } from "react-native-webview";

import SafeScreen from "../../components/SafeScreen";
import { styles } from "../../assets/styles/terms-of-service.styles";
import { COLORS } from "../../constants/colors";

const TermsOfServiceScreen = () => {
  const router = useRouter();
  const termsUrl = "https://www.termsfeed.com/live/example-terms-and-conditions/"; // Example URL

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/settings")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
      </View>

      <View style={styles.webViewContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{ marginTop: 10, color: COLORS.textLight }}>Loading content...</Text>
          </View>
        )}
        {hasError && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={50} color={COLORS.danger} />
            <Text style={styles.errorText}>Failed to load content.</Text>
            <Text style={styles.errorSubText}>Please check your internet connection.</Text>
          </View>
        )}
        <WebView
          source={{ uri: termsUrl }}
          style={hasError ? { display: 'none' } : styles.webView}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          onHttpError={handleError}
        />
      </View>
    </SafeScreen>
  );
};

export default TermsOfServiceScreen;