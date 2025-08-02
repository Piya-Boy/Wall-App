import React, { useState, useCallback } from "react";
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useSignUp, useSSO, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { styles } from "@/assets/styles/auth.styles.js";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import * as AuthSession from 'expo-auth-session';

export default function SignUpScreen() {
  useWarmUpBrowser();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { startSSOFlow } = useSSO();

  const onGoogleSignUp = useCallback(async () => {
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
        //  console.log("No session created, checking for additional requirements...");
         if (signUp && signUp.status === 'missing_requirements') {
          //  console.log("SignUp missing requirements:", signUp.missingFields);
           
           // Handle missing username requirement
           if (signUp.missingFields.includes('username')) {
             const { emailAddress } = signUp;
             const username = emailAddress.split('@')[0];
             console.log("Setting username:", username);
             
             try {
               await signUp.update({ username });
              //  console.log("Username updated successfully");
               
               // Try to complete the sign-up process
               const signUpAttempt = await signUp.create();
               if (signUpAttempt.status === 'complete') {
                 await setActive({ session: signUpAttempt.createdSessionId });
                 router.replace("/");
               } else {
                 console.log("SignUp attempt status:", signUpAttempt.status);
                 setError("Please complete all required fields.");
               }
             } catch (updateErr) {
               console.error("Error updating username:", updateErr);
               setError("Failed to complete sign-up. Please try again.");
             }
           } else {
             setError("Please complete all required fields.");
           }
         } else if (signIn && signIn.status === 'needs_identifier') {
           console.log("SignIn needs identifier");
           setError("Please provide your email address.");
         } else {
           setError("Additional verification required. Please check your email or try again.");
         }
       }

    } catch (err) {
      console.error("OAuth error", err);
      setError("Something went wrong during Google sign-up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [startSSOFlow, router]);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      if (err.errors?.[0]?.code === "form_identifier_exists") {
        setError("That email address is already in use. Please try another.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.log(err);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your email</Text>

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
          style={[styles.verificationInput, error && styles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#9A8478"
          onChangeText={(code) => setCode(code)}
        />

        <Pressable onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >
      <View style={styles.container}>
        <Image source={require("../../assets/images/revenue-i2.png")} style={styles.illustration} />

        <Text style={styles.title}>Create Account</Text>

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
          placeholderTextColor="#9A8478"
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
        />

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <Pressable style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
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
          onPress={onGoogleSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <>
              <Ionicons name="logo-google" size={22} color={"#000"} />
              <Text style={styles.oauthButtonText}>Sign up with Google</Text>
            </>
          )}
        </Pressable>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.linkText}>Sign in</Text>
          </Pressable>
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