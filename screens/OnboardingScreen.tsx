import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      emoji: "⚔️",
      title: "Welcome, Hunter!",
      description: "Transform your fitness journey into an epic quest inspired by Solo Leveling. Track your progress, level up, and become stronger every day!",
    },
    {
      emoji: "📈",
      title: "Progressive Overload",
      description: "Your exercises automatically increase in difficulty each week. When you reach your max target, you level up to the next difficulty tier!",
    },
    {
      emoji: "🎯",
      title: "Adaptive System",
      description: "If you struggle for 3 days in a row, the system automatically adjusts to help you succeed. Miss a day? The work carries over as a penalty.",
    },
    {
      emoji: "👤",
      title: "Character Progression",
      description: "Level up your character by completing daily quests! Unlock new weapons every 10 levels, armor every 10, and accessories every 5 levels.",
    },
    {
      emoji: "💪",
      title: "Daily Quests",
      description: "Complete your exercises each day to earn 100 EXP and maintain your streak. Use quick increment buttons (+1, +5) for easy logging!",
    },
    {
      emoji: "😌",
      title: "Rest & Recovery",
      description: "Rest days are important! You can take a rest day without penalties. Your streak resets, but no exercises carry over.",
    },
    {
      emoji: "📸",
      title: "Track Progress",
      description: "Take daily photos, log your weight, and watch your stats grow. See your transformation over time!",
    },
  ];

  const currentPageData = pages[currentPage];
  const isLastPage = currentPage === pages.length - 1;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{currentPageData.emoji}</Text>
        </View>

        <Text style={styles.title}>{currentPageData.title}</Text>
        <Text style={styles.description}>{currentPageData.description}</Text>

        <View style={styles.dotsContainer}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentPage && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        {currentPage > 0 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage(currentPage - 1)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.nextButton, currentPage === 0 && styles.fullWidthButton]}
          onPress={() => {
            if (isLastPage) {
              onComplete();
            } else {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          <Text style={styles.nextButtonText}>
            {isLastPage ? "Start Your Journey! 🚀" : "Next →"}
          </Text>
        </TouchableOpacity>
      </View>

      {currentPage > 0 && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={onComplete}
        >
          <Text style={styles.skipButtonText}>Skip Tutorial</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  emojiContainer: {
    marginBottom: 32,
  },
  emoji: {
    fontSize: 80,
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4a9eff",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 2,
    textShadowColor: "#1a2f4a",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
  },
  description: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4a4a4a",
  },
  activeDot: {
    backgroundColor: "#4a9eff",
    width: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    padding: 24,
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: "#16213e",
    padding: 16,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: "#4a9eff",
  },
  backButtonText: {
    color: "#4a9eff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#4a9eff",
    padding: 16,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: "#fff",
  },
  fullWidthButton: {
    flex: 2,
  },
  nextButtonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  skipButton: {
    padding: 16,
    alignItems: "center",
  },
  skipButtonText: {
    color: "#8b8b8b",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
