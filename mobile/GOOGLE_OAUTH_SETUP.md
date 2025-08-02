# Google OAuth Setup Guide for Expo App

## Step 1: Configure Google OAuth in Clerk Dashboard

1. **Go to your Clerk Dashboard**
   - Visit [clerk.com](https://clerk.com) and sign in
   - Navigate to your application

2. **Enable Google OAuth**
   - Go to **User & Authentication** → **Social Connections**
   - Find **Google** and click **Enable**
   - You'll need to provide Google OAuth credentials

## Step 2: Create Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit [console.cloud.google.com](https://console.cloud.google.com)
   - Create a new project or select an existing one

2. **Enable Google+ API**
   - Go to **APIs & Services** → **Library**
   - Search for "Google+ API" and enable it

3. **Create OAuth 2.0 Credentials**
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth 2.0 Client IDs**
   - Choose **Web application**
   - Add these Authorized redirect URIs:
     ```
     https://clerk.your-app.com/v1/oauth_callback
     ```
   - Replace `your-app` with your actual Clerk application name

4. **Get Your Credentials**
   - Copy the **Client ID** and **Client Secret**
   - Add them to your Clerk Google OAuth configuration

## Step 3: Update Your App Configuration

1. **Update app.json with your Google credentials:**
   ```json
   {
     "expo": {
       // ... other config
       "oauth": {
         "google": {
           "clientId": "YOUR_ACTUAL_GOOGLE_CLIENT_ID",
           "clientSecret": "YOUR_ACTUAL_GOOGLE_CLIENT_SECRET"
         }
       }
     }
   }
   ```

2. **Replace the placeholder values:**
   - Replace `YOUR_ACTUAL_GOOGLE_CLIENT_ID` with your real Google Client ID
   - Replace `YOUR_ACTUAL_GOOGLE_CLIENT_SECRET` with your real Google Client Secret

## Step 4: Test the Implementation

1. **Start your development server:**
   ```bash
   npm start
   ```

2. **Test Google Sign-in/Sign-up:**
   - Try signing in with Google
   - Try signing up with Google
   - Check the console for any errors

## Common Issues and Solutions

### Issue 1: "OAuth callback error"
**Solution:** Make sure your redirect URIs are correctly configured in Google Cloud Console and match your Clerk application URL.

### Issue 2: "Invalid client" error
**Solution:** Verify that your Google Client ID and Client Secret are correct and match between Google Cloud Console and your app.json.

### Issue 3: OAuth flow not starting
**Solution:** 
1. Check that `expo-secure-store` is properly installed
2. Verify your Clerk publishable key is correct
3. Make sure you're testing on a device or emulator (not web)

### Issue 4: "Network error" during OAuth
**Solution:**
1. Check your internet connection
2. Verify that your app has proper network permissions
3. Try clearing the app cache and restarting

## Additional Configuration

### For Production
1. **Update redirect URIs** in Google Cloud Console to include your production domain
2. **Use production Clerk keys** instead of test keys
3. **Test thoroughly** on both iOS and Android devices

### For Development
1. **Use test keys** for development
2. **Add localhost redirect URIs** for local testing
3. **Use Expo Go** or a development build for testing

## Security Best Practices

1. **Never commit real credentials** to version control
2. **Use environment variables** for sensitive data
3. **Regularly rotate** your OAuth credentials
4. **Monitor OAuth usage** in Google Cloud Console

## Troubleshooting

If you're still having issues:

1. **Check the console logs** for detailed error messages
2. **Verify all configurations** match between Google Cloud Console and Clerk
3. **Test with a fresh build** of your app
4. **Contact Clerk support** if the issue persists

## Next Steps

Once Google OAuth is working:

1. **Add other OAuth providers** (Facebook, Apple, etc.)
2. **Implement proper error handling** for different OAuth scenarios
3. **Add loading states** and better UX for OAuth flows
4. **Test on multiple devices** and platforms 