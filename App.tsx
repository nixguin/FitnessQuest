import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "./screens/OnboardingScreen";
import ExerciseSetupScreen from "./screens/ExerciseSetupScreen";
import DailyQuestScreen from "./screens/DailyQuestScreen";
import { getExercises } from "./utils/storage";

export default function App() {
  const [hasSetup, setHasSetup] = useState<boolean | null>(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    checkSetup();
  }, []);

  const checkSetup = async () => {
    const exercises = await getExercises();
    const onboarding = await AsyncStorage.getItem("@has_seen_onboarding");
    setHasSetup(exercises.length > 0);
    setHasSeenOnboarding(onboarding === "true");
  };

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("@has_seen_onboarding", "true");
    setHasSeenOnboarding(true);
  };

  if (hasSetup === null || hasSeenOnboarding === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a9eff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {!hasSeenOnboarding ? (
        <OnboardingScreen onComplete={completeOnboarding} />
      ) : hasSetup ? (
        <DailyQuestScreen />
      ) : (
        <ExerciseSetupScreen onComplete={() => setHasSetup(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    alignItems: "center",
    justifyContent: "center",
  },
});
