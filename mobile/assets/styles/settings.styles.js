import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Header styles for the back button
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 5, 
  },
  // Profile section
  profileSection: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.text,
  },
  profileEmail: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  // Section styles
  section: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  sectionHeader: {
    paddingBottom: 10,
    paddingLeft: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textLight,
  },
  sectionBody: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: "hidden",
  },
  // Row styles
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 55,
  },
  rowSeparator: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  rowLabel: {
    fontSize: 17,
    color: COLORS.text,
  },
  rowValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowValue: {
    fontSize: 17,
    color: COLORS.textLight,
    marginRight: 8,
  },
  // Sign out styles
  signOutSection: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  signOutButton: {
    backgroundColor: "#FFA09B",
    borderRadius: 12,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  signOutButtonText: {
    fontSize: 17,
    color: COLORS.white,
    fontWeight: "600",
  },
  // Footer styles
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 8,
  },
});