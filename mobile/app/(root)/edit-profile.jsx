import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import SafeScreen from "../../components/SafeScreen";
import { styles } from "../../assets/styles/edit-profile.styles";
import { COLORS } from "../../constants/colors";

const EditProfileScreen = () => {
  const { user } = useUser();
  const router = useRouter();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [isModified, setIsModified] = useState(false);

  const handleFullNameChange = (name) => {
    setFullName(name);
    if (!isModified) {
      setIsModified(true);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => console.log("Account deletion requested"), // Placeholder
        },
      ]
    );
  };
  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/settings")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity
          style={styles.saveButton}
          disabled={!isModified}
          onPress={() => {}}
        >
          <Text
            style={[
              styles.saveButtonText,
              !isModified && styles.disabledSaveButtonText,
            ]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={50} color={COLORS.primary} />
          </View>
          <TouchableOpacity>
            <Text style={styles.changePhotoButton}>Change Profile Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={handleFullNameChange}
              placeholder="Enter your full name"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, styles.readOnlyInput]}
              value={user?.primaryEmailAddress?.emailAddress}
              editable={false}
            />
          </View>
          <View style={styles.deleteAccountSection}>
            <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
              <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeScreen>
  );
};

export default EditProfileScreen;
