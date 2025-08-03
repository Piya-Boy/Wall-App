import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
  },
  backButton: {
    backgroundColor: COLORS.white,
    position: "absolute",
    left: 16,
    padding: 5,
  },
  saveButton: {
    position: "absolute",
    right: 16,
    padding: 5,
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.primary,
  },
  disabledSaveButtonText: {
    color: COLORS.textLight,
  },
  avatarSection: {
    alignItems: "center",
    marginVertical: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  changePhotoButton: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },
  formSection: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.textLight,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  readOnlyInput: {
    backgroundColor: "#f0f0f0", // A slightly different background for non-editable fields
    color: COLORS.textLight,
  },
  deleteAccountSection: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  deleteAccountButton: {
    backgroundColor: "#FFA09B",
    borderRadius: 12,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteAccountButtonText: {
    fontSize: 17,
    color: COLORS.white,
    fontWeight: "600",
  },
});
