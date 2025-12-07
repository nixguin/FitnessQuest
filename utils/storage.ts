import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise, DailyQuest, UserProgress } from '../types';

const KEYS = {
  EXERCISES: '@fitness_quest_exercises',
  DAILY_QUESTS: '@fitness_quest_daily_quests',
  USER_PROGRESS: '@fitness_quest_user_progress',
};

// Exercise Storage
export const saveExercises = async (exercises: Exercise[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.EXERCISES, JSON.stringify(exercises));
  } catch (error) {
    console.error('Error saving exercises:', error);
    throw error;
  }
};

export const getExercises = async (): Promise<Exercise[]> => {
  try {
    const data = await AsyncStorage.getItem(KEYS.EXERCISES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading exercises:', error);
    return [];
  }
};

// Daily Quest Storage
export const saveDailyQuest = async (quest: DailyQuest): Promise<void> => {
  try {
    const quests = await getDailyQuests();
    const existingIndex = quests.findIndex(q => q.date === quest.date);

    if (existingIndex >= 0) {
      quests[existingIndex] = quest;
    } else {
      quests.push(quest);
    }

    await AsyncStorage.setItem(KEYS.DAILY_QUESTS, JSON.stringify(quests));
  } catch (error) {
    console.error('Error saving daily quest:', error);
    throw error;
  }
};

export const getDailyQuests = async (): Promise<DailyQuest[]> => {
  try {
    const data = await AsyncStorage.getItem(KEYS.DAILY_QUESTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading daily quests:', error);
    return [];
  }
};

export const getTodayQuest = async (today: string): Promise<DailyQuest | null> => {
  try {
    const quests = await getDailyQuests();
    return quests.find(q => q.date === today) || null;
  } catch (error) {
    console.error('Error loading today quest:', error);
    return null;
  }
};

// User Progress Storage
export const saveUserProgress = async (progress: UserProgress): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.USER_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving user progress:', error);
    throw error;
  }
};

export const getUserProgress = async (): Promise<UserProgress> => {
  try {
    const data = await AsyncStorage.getItem(KEYS.USER_PROGRESS);
    return data ? JSON.parse(data) : {
      totalDaysCompleted: 0,
      currentStreak: 0,
      longestStreak: 0,
      level: 1,
      exp: 0,
      weightHistory: [],
      photos: [],
    };
  } catch (error) {
    console.error('Error loading user progress:', error);
    return {
      totalDaysCompleted: 0,
      currentStreak: 0,
      longestStreak: 0,
      level: 1,
      exp: 0,
      weightHistory: [],
      photos: [],
    };
  }
};

// Utility to clear all data (for testing/reset)
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      KEYS.EXERCISES,
      KEYS.DAILY_QUESTS,
      KEYS.USER_PROGRESS,
    ]);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};
