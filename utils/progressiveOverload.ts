import { Exercise } from '../types';

/**
 * Calculate the next week's target for progressive overload
 */
export const calculateNextWeekTarget = (exercise: Exercise): number => {
  const nextTarget = exercise.currentTarget + exercise.weeklyIncrease;
  
  // Check if we've reached the max target for current difficulty
  if (nextTarget >= exercise.maxTarget) {
    return exercise.maxTarget;
  }
  
  return nextTarget;
};

/**
 * Check if exercise should level up to next difficulty
 */
export const shouldLevelUp = (exercise: Exercise): boolean => {
  return exercise.currentTarget >= exercise.maxTarget;
};

/**
 * Create a new difficulty challenge when max target is reached
 * Returns updated exercise with increased difficulty and reset progression
 */
export const levelUpExercise = (exercise: Exercise): Exercise => {
  const newDifficulty = exercise.difficulty + 1;
  
  // Reset to a challenging but achievable starting point for new difficulty
  const newStartingTarget = Math.floor(exercise.maxTarget * 0.6);
  
  return {
    ...exercise,
    difficulty: newDifficulty,
    currentTarget: newStartingTarget,
    // Increase the max target for the new difficulty level
    maxTarget: exercise.maxTarget + Math.floor(exercise.maxTarget * 0.5),
  };
};

/**
 * Update exercise for weekly progression
 */
export const progressExerciseWeekly = (exercise: Exercise): Exercise => {
  if (shouldLevelUp(exercise)) {
    return levelUpExercise(exercise);
  }
  
  return {
    ...exercise,
    currentTarget: calculateNextWeekTarget(exercise),
  };
};

/**
 * Get the date for next week's progression
 */
export const getNextProgressionDate = (startDate: Date): Date => {
  const nextDate = new Date(startDate);
  nextDate.setDate(nextDate.getDate() + 7);
  return nextDate;
};

/**
 * Check if it's time for weekly progression
 */
export const isProgressionDay = (
  exerciseCreatedAt: string,
  currentDate: Date = new Date()
): boolean => {
  const createdDate = new Date(exerciseCreatedAt);
  const daysDifference = Math.floor(
    (currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Progress every 7 days
  return daysDifference > 0 && daysDifference % 7 === 0;
};
