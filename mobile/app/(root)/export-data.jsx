import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import SafeScreen from "../../components/SafeScreen";
import { styles } from "../../assets/styles/export-data.styles";
import { COLORS } from "../../constants/colors";

const EXPORT_OPTIONS = [
  {
    key: "csv",
    label: "CSV (Comma Separated Values)",
    icon: "document-text-outline",
    iconColor: "#2ecc71",
  },
  {
    key: "pdf",
    label: "PDF (Portable Document Format)",
    icon: "document-attach-outline",
    iconColor: "#e74c3c",
  },
];

const ExportDataScreen = () => {
  const router = useRouter();
  const [selectedFormat, setSelectedFormat] = useState("csv"); // Default export format
  const [isLoading, setIsLoading] = useState(false);
  const handleExport = () => {
    if (isLoading) return; // Prevent multiple exports
    setIsLoading(true);
    Alert.alert(
      "Export Data",
      `Exporting data as ${selectedFormat.toUpperCase()} is not yet implemented.`
    );
  };

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/settings")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Export Data</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Choose Export Format</Text>
        {EXPORT_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.option,
              selectedFormat === option.key && styles.selectedOption,
            ]}
            onPress={() => setSelectedFormat(option.key)}
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
            {selectedFormat === option.key && (
              <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
          {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
          <Text style={styles.exportButtonText}>Export</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
};

export default ExportDataScreen;
