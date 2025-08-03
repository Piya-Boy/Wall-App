import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import SafeScreen from "../../components/SafeScreen";
import { styles } from "../../assets/styles/language-selection.styles";
import { COLORS } from "../../constants/colors";

const LANGUAGE_OPTIONS = [
  {
    key: "en",
    label: "English",
    icon: "language-outline",
    iconColor: "#3498db",
  },
  {
    key: "th",
    label: "Thai",
    icon: "language-outline",
    iconColor: "#2ecc71",
  },
];

const LanguageSelectionScreen = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/settings")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
      </View>

      <View style={styles.optionsContainer}>
        {LANGUAGE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.option,
              selectedLanguage === option.key && styles.selectedOption,
            ]}
            onPress={() => setSelectedLanguage(option.key)}
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
            {selectedLanguage === option.key && (
              <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeScreen>
  );
};

export default LanguageSelectionScreen;
