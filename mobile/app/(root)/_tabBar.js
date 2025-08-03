import React from "react";
import { View, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
// styles.js
import { tabBarStyles } from "../../assets/styles/tabBar.styles.js";

export function AddButton({ children, onPress }) {
  return (
    <TouchableOpacity style={tabBarStyles.addButtonContainer} onPress={onPress} activeOpacity={0.8}>
      <View style={tabBarStyles.addButton}>{children}</View>
    </TouchableOpacity>
  );
}

export function CustomTabBar({ state, descriptors, navigation }) {
  // Find the index of the 'create' tab
  const createIndex = state.routes.findIndex(route => route.name === "create");
  
  // Filter out the create tab for the main tab bar
  const mainTabs = state.routes.filter(
    route => route.name !== "create" && route.name !== "_tabBar" && route.name !== "settings" && route.name !== "edit-profile" && route.name !== "theme-selection" && route.name !== "currency-selection" && route.name !== "language-selection" && route.name !== "export-data" && route.name !== "terms-of-service" && route.name !== "privacy-policy"
  );

  // Hide tab bar on settings and edit-profile screen
  const currentRouteName = state.routes[state.index].name;
    if (currentRouteName === "settings" || currentRouteName === "edit-profile" || currentRouteName === "theme-selection" || currentRouteName === "currency-selection" || currentRouteName === "language-selection" || currentRouteName === "terms-of-service" || currentRouteName === "privacy-policy") {
    return null;
  }

  
  return (
    <View style={tabBarStyles.tabBarWrapper}>
      <View style={tabBarStyles.tabBar}>
        {mainTabs.map((route, index) => {
          // Use the correct index by matching route.key in state.routes
          const tabIndex = state.routes.findIndex(r => r.key === route.key);
          const isFocused = state.index === tabIndex;
          let iconName;
          if (route.name === "index") iconName = "home-outline";
          else if (route.name === "reports") iconName = "bar-chart-outline";

          const onPress = () => {
            console.log(state.index, tabIndex);
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            console.log(state.index, tabIndex, event.defaultPrevented);
            if (state.index !== tabIndex && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Use different styles for left and right positioning
          const buttonStyle = route.name === "index"
            ? tabBarStyles.leftTabButton
            : tabBarStyles.rightTabButton;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={buttonStyle}
              activeOpacity={0.7}
            >
              <Ionicons
                name={iconName}
                size={26}
                color={isFocused ? COLORS.primary : COLORS.textLight}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Centered Add Button above tab bar */}
      <AddButton
        onPress={() => {
          const event = navigation.emit({
            type: "tabPress",
            target: state.routes[createIndex].key,
            canPreventDefault: true,
          });
          if (state.index !== createIndex && !event.defaultPrevented) {
            navigation.navigate(state.routes[createIndex].name);
          }
        }}
      >
        <Ionicons name="add" size={32} color={COLORS.primary} />
      </AddButton>
    </View>
  );
}export default function TabBarPlaceholder() {
  return null;
}
