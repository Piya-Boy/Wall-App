import Constants from "expo-constants";
import { getEnvVar, logEnvironmentStatus } from "./lib/envValidation";

// Log environment status during build
logEnvironmentStatus();

export default {
  expo: {
    name: "Wallet App",
    slug: "wallet-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "wallet",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.walletapp",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.yourcompany.walletapp",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      clerkPublishableKey: getEnvVar("CLERK_PUBLISHABLE_KEY"),
      googleClientId: getEnvVar("GOOGLE_CLIENT_ID"),
      googleClientSecret: getEnvVar("GOOGLE_CLIENT_SECRET"),
    },
    oauth: {
      google: {
        clientId: getEnvVar("GOOGLE_CLIENT_ID"),
        clientSecret: getEnvVar("GOOGLE_CLIENT_SECRET"),
      },
    },
  },
}; 