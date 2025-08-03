import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Switch,
  Alert,
} from "react-native";

import React, { useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";

import SafeScreen from "../../components/SafeScreen";
import { styles } from "../../assets/styles/settings.styles";
import { COLORS } from "../../constants/colors";

const SettingsScreen = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const appVersion = Constants.expoConfig?.version || "1.0.0";

  // --- Action Handlers ---
  const handleNotImplemented = () => {
    Alert.alert("Coming Soon", "This feature is not yet available.");
  };

  const handleLink = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  // --- Logout Handler ---
  WebBrowser.maybeCompleteAuthSession();
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          setIsLoading(true);
          signOut().then(() => {
            setIsLoading(false);
          });
        },
        style: "destructive",
      },
    ]);
  };


  const SECTIONS = [
    {
      header: "Account",
      items: [
        {
          label: "Edit Profile",
          icon: "person-outline",
          iconColor: "#3498db",
          action: () => router.push("/edit-profile"),
        },
        
        
      ],
    },
    {
      header: "Data",
      items: [
        {
          label: "Export Data",
          icon: "download-outline",
          iconColor: "#3498db",
          action: () => router.push("/export-data"),
        },
      ],
    },
    {
      header: "Customization",
      items: [
        {
                  label: "Theme",
          icon: "color-palette-outline",
          iconColor: "#9b59b6",
          value: "Light",
          action: () => router.push("/theme-selection"),
        },
        {
          label: "Primary Currency",
          icon: "cash-outline",
          iconColor: "#e67e22",
          value: "THB",
          action: () => router.push("/currency-selection"),
        },
        {
          label: "Language",
          icon: "language-outline",
          iconColor: "#f1c40f",
          value: "English",
          action: () => router.push("/language-selection"),
        },
      ],
    },
    {
      header: "Security",
      items: [
        {
          label: "Biometric Authentication",
          icon: "finger-print-outline",
          iconColor: "#e74c3c",
          type: "switch",
          value: isBiometricEnabled,
          action: setIsBiometricEnabled,
        },
      ],
    },
    {
      header: "About",
      items: [
        { label: "Version", icon: "information-circle-outline", iconColor: "#1abc9c", value: appVersion },
        {
          label: "Terms of Service",
          icon: "document-text-outline",
          iconColor: "#34495e",
          action: () => router.push("/terms-of-service"),
        },
        {
          label: "Privacy Policy",
          icon: "shield-checkmark-outline",
          iconColor: "#8e44ad",
          action: () => router.push("/privacy-policy"),
        },
      ],
    },
  ];

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Ionicons name="person-outline" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.profileName}>{user?.fullName}</Text>
          <Text style={styles.profileEmail}>{user?.primaryEmailAddress?.emailAddress}</Text>
        </View>

        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ label, icon, iconColor, type, action, value }, index) => (
                <TouchableOpacity
                  key={label}
                  onPress={action && type !== "switch" ? action : null}
                  style={[styles.row, index !== 0 && styles.rowSeparator]}
                  activeOpacity={0.7}
                >
                  <View style={styles.rowContent}>
                    <View style={[styles.rowIconContainer, { backgroundColor: iconColor }]}>
                      <Ionicons name={icon} size={18} color={COLORS.white} />
                    </View>
                    <Text style={styles.rowLabel}>{label}</Text>
                  </View>

                  <View style={styles.rowValueContainer}>
                    {value && type !== "switch" && <Text style={styles.rowValue}>{value}</Text>}
                    {type === "switch" && <Switch value={value} onValueChange={action} />}
                    {action && type !== "switch" && (
                      <Ionicons name="chevron-forward" size={22} color={COLORS.textLight} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.signOutSection}>
          <TouchableOpacity style={styles.signOutButton}
            onPress={handleLogout}
            disabled={isLoading}>

            {isLoading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Wallet App - v{appVersion}</Text>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default SettingsScreen;