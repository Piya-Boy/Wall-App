import { useUser } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import { CustomTabBar } from "./_tabBar";
import { COLORS } from "../../constants/colors";

export default function Layout() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // this is for a better ux

  if (!isSignedIn) return <Redirect href={"/sign-in"} />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home"
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports"
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create"
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="edit-profile"
        options={{
          title: "Edit Profile",
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="theme-selection"
        options={{
          title: "Theme Selection",
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="currency-selection"
        options={{
          title: "Currency Selection",
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="language-selection"
        options={{
          title: "Language Selection",
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="terms-of-service"
        options={{
          title: "Terms of Service",
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="privacy-policy"
        options={{
          title: "Privacy Policy",
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}