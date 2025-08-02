import { useSignIn, useSSO, useAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../../assets/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import * as AuthSession from 'expo-auth-session';

export default function Page() {
  useWarmUpBrowser();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { startSSOFlow } = useSSO();

  const onGoogleSignIn = useCallback(async () => {
    setError("");
    setIsLoading(true);
    
    // Check if user is already signed in
    if (isSignedIn) {
      setError("You're already signed in. Please sign out first.");
      setIsLoading(false);
      return;
    }
    
    try {
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: AuthSession.makeRedirectUri(),
      });
      
      // console.log("SSO Flow Result:", { createdSessionId, signIn, signUp });
      
      if (createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/");
      } else {
        // If there is no createdSessionId, there are missing requirements
        // console.log("No session created, checking for additional requirements...");
        if (signIn && signIn.status === 'needs_identifier') {
          // console.log("SignIn needs identifier");
          setError("Please provide your email address.");
        } else if (signUp && signUp.status === 'missing_requirements') {
          // console.log("SignUp missing requirements:", signUp.missingFields);
          setError("Please complete all required fields for sign-up.");
        } else {
          setError("Additional verification required. Please check your email or try again.");
        }
      }
    } catch (err) {
      console.error("OAuth error", err);
      setError("Something went wrong during Google sign-in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [startSSOFlow, router]);

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;
    setError("");

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      if (err.errors?.[0]?.code === "form_password_incorrect") {
        setError("Password is incorrect. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/revenue-i4.png")}
          style={styles.illustration}
        />
        <Text style={styles.title}>Welcome Back</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <Pressable onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </Pressable>
          </View>
        ) : null}

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#9A8478"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={onSignInPress}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.oauthButton,
            isLoading && styles.oauthButtonLoading,
            pressed && styles.buttonPressed,
          ]}
          onPress={onGoogleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <>
              <Ionicons name="logo-google" size={22} color={"#000"} />
              <Text style={styles.oauthButtonText}>Sign in with Google</Text>
            </>
          )}
        </Pressable>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>

          <Link href="/sign-up" asChild>
            <Pressable>
              <Text style={styles.linkText}>Sign up</Text>
            </Pressable>
          </Link>
        </View>
        
        {isSignedIn && (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Text style={{ color: COLORS.textLight, marginBottom: 10 }}>
              You&apos;re currently signed in
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: COLORS.expense },
                pressed && styles.buttonPressed,
              ]}
              onPress={() => {
                // Sign out logic would go here
                router.replace("/");
              }}
            >
              <Text style={styles.buttonText}>Go to Home</Text>
            </Pressable>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
} 