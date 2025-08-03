import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import SafeScreen from "../../components/SafeScreen";
import { styles } from "../../assets/styles/theme-selection.styles";
import { COLORS } from "../../constants/colors";

const THEME_OPTIONS = [
  {
    key: "light",
    label: "Light",
    icon: "sunny-outline",
    iconColor: "#f1c40f",
  },
  {
    key: "dark",
    label: "Dark",
    icon: "moon-outline",
    iconColor: "#9b59b6",
  },
  {
    key: "system",
    label: "System Default",
    icon: "phone-portrait-outline",
    iconColor: "#34495e",
  },
];

const ThemeSelectionScreen = () => {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState("light"); // Default theme

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/settings")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theme</Text>
      </View>

      <View style={styles.optionsContainer}>
        {THEME_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.option,
              selectedTheme === option.key && styles.selectedOption,
            ]}
            onPress={() => setSelectedTheme(option.key)}
          >
            <View style={styles.optionContent}>
              <View
                style={[
                  styles.optionIconContainer,
                  { backgroundColor: option.iconColor },
                ]}
              >
                <Ionicons name={option.icon} size={22} color={COLORS.white} />
              </View>
              <Text style={styles.optionText}>{option.label}</Text>
            </View>
            {selectedTheme === option.key && (
              <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeScreen>
  );
};

export default ThemeSelectionScreen;
