export type ExerciseType = 'pushups' | 'running' | 'pullups' | 'custom';

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  currentTarget: number;
  unit: string; // 'reps', 'miles', 'minutes', etc.
  weeklyIncrease: number;
  maxTarget: number; // When reached, triggers difficulty increase
  difficulty: number; // Current difficulty level (1, 2, 3, etc.)
  createdAt: string;
  pendingAmount: number; // Accumulated incomplete work
  underperformanceCount: number; // Track consecutive underperformances
  lastAdjustmentDate?: string; // When difficulty was last adjusted
}

export interface DailyQuest {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  exercises: QuestExercise[];
  completed: boolean;
  completedAt?: string;
}

export interface QuestExercise {
  exerciseId: string;
  exerciseName: string;
  target: number;
  unit: string;
  completed: boolean;
  actualAmount?: number;
  isUnderperformed?: boolean; // Did user log less than 75% of target?
}

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface UserProgress {
  totalDaysCompleted: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  exp: number;
  currentWeight?: number;
  goalWeight?: number;
  weightHistory: WeightEntry[];
}
