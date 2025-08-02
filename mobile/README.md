# Wallet App 👋

This is a [Expo](https://expo.dev) wallet application created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Set up environment variables

   **Option A: Use the setup script (Recommended)**
   ```bash
   npm run setup
   ```

   **Option B: Manual setup**
   Create a `.env` file in the root directory with the following variables:

   ```bash
   # Clerk Configuration
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   ```

   **Important**: 
   - Never commit the `.env` file to version control. It's already included in `.gitignore`.
   - Get your Clerk publishable key from your [Clerk Dashboard](https://dashboard.clerk.com/)
   - Get your Google OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/)
   - Run `npm run validate-env` to check if all environment variables are set correctly

3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Features

- **Authentication**: Google OAuth integration with Clerk
- **Transaction Management**: View and manage wallet transactions
- **Modern UI**: Clean and responsive design
- **Cross-platform**: Works on iOS, Android, and Web

## Project Structure

```
mobile/
├── app/                    # Main application screens
├── components/             # Reusable UI components
├── constants/              # App constants and configuration
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── assets/                 # Images, fonts, and other assets
```

## Available Scripts

- `npm start` - Start the development server
- `npm run setup` - Interactive environment setup
- `npm run validate-env` - Check environment variables
- `npm run security-check` - Run security validation
- `npm run android` - Start on Android
- `npm run ios` - Start on iOS
- `npm run web` - Start on Web
- `npm run lint` - Run ESLint

## Configuration

The app uses environment variables for sensitive configuration. Make sure to:

1. Set up your Clerk account and get your publishable key
2. Configure Google OAuth in the Google Cloud Console
3. Update the bundle identifiers in `app.json` to match your organization

## Security Notes

- All sensitive credentials are stored in environment variables
- The `.env` file is excluded from version control
- Never share or commit your actual API keys and secrets
- Use different credentials for development and production

For detailed security guidelines, see [SECURITY.md](./SECURITY.md)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
