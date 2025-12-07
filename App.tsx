import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import ExerciseSetupScreen from './screens/ExerciseSetupScreen';
import DailyQuestScreen from './screens/DailyQuestScreen';
import { getExercises } from './utils/storage';

export default function App() {
  const [hasSetup, setHasSetup] = useState<boolean | null>(null);

  useEffect(() => {
    checkSetup();
  }, []);

  const checkSetup = async () => {
    const exercises = await getExercises();
    setHasSetup(exercises.length > 0);
  };

  if (hasSetup === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a9eff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {hasSetup ? (
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
    backgroundColor: '#1a1a2e',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
