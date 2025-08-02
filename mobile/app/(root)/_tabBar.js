import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
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
  const mainTabs = state.routes.filter(route => route.name !== "create");
  
  return (
    <View style={tabBarStyles.tabBarWrapper}>
      <View style={tabBarStyles.tabBar}>
        {mainTabs.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === state.routes.findIndex(r => r.name === route.name);
          let iconName;
          if (route.name === "index") iconName = "home-outline";
          else if (route.name === "reports") iconName = "bar-chart-outline";
          
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
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
