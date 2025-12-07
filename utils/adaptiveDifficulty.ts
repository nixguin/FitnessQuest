import { Exercise } from '../types';
import { getTodayString } from './dateUtils';

/**
 * Check if user is consistently underperforming (< 75% of target for 3 days)
 */
export const shouldDecreaseTarget = (exercise: Exercise): boolean => {
    return exercise.underperformanceCount >= 3;
};

/**
 * Decrease exercise target due to consistent underperformance
 */
export const decreaseExerciseTarget = (exercise: Exercise): Exercise => {
    // Reduce by 20% but keep above minimum
    const newTarget = Math.max(
        Math.floor(exercise.currentTarget * 0.8),
        Math.floor(exercise.weeklyIncrease * 2) // Minimum is 2x weekly increase
    );

    return {
        ...exercise,
        currentTarget: newTarget,
        underperformanceCount: 0, // Reset counter
        pendingAmount: 0, // Clear penalties
        lastAdjustmentDate: getTodayString(),
    };
};

/**
 * Add incomplete work to pending amount (penalty system)
 */
export const applyPenalty = (
    exercise: Exercise,
    target: number,
    actualAmount: number
): Exercise => {
    const incomplete = Math.max(0, target - actualAmount);

    return {
        ...exercise,
        pendingAmount: exercise.pendingAmount + incomplete,
    };
};

/**
 * Track underperformance (logged less than 75% of target)
 */
export const trackPerformance = (
    exercise: Exercise,
    target: number,
    actualAmount: number
): Exercise => {
    const performanceRatio = actualAmount / target;

    if (performanceRatio < 0.75) {
        // User is struggling - increment underperformance counter
        return {
            ...exercise,
            underperformanceCount: exercise.underperformanceCount + 1,
        };
    } else if (performanceRatio >= 1.0) {
        // User completed or exceeded - reset counter
        return {
            ...exercise,
            underperformanceCount: 0,
        };
    }

    return exercise;
};

/**
 * Calculate today's target including any pending penalties
 */
export const calculateTodayTarget = (exercise: Exercise): number => {
    return exercise.currentTarget + exercise.pendingAmount;
};

/**
 * Clear pending amount after successful completion
 */
export const clearPenalty = (exercise: Exercise): Exercise => {
    return {
        ...exercise,
        pendingAmount: 0,
    };
};

/**
 * Check if performance tracking suggests difficulty adjustment
 */
export const analyzePerformance = (
    exercise: Exercise,
    target: number,
    actualAmount: number
): {
    shouldDecrease: boolean;
    message: string;
    updatedExercise: Exercise;
} => {
    let updated = trackPerformance(exercise, target, actualAmount);

    // Apply penalty if incomplete
    if (actualAmount < target) {
        updated = applyPenalty(updated, target, actualAmount);
    } else {
        // Clear penalty if completed
        updated = clearPenalty(updated);
    }

    // Check if we should decrease difficulty
    const shouldDecrease = shouldDecreaseTarget(updated);

    let message = '';
    if (shouldDecrease) {
        message = `${exercise.name} target will be reduced. You've struggled for 3 days - let's find the right level!`;
        updated = decreaseExerciseTarget(updated);
    } else if (updated.pendingAmount > 0) {
        message = `${updated.pendingAmount} ${exercise.unit} carried over to tomorrow for ${exercise.name}`;
    } else if (updated.underperformanceCount > 0) {
        message = `Underperformance day ${updated.underperformanceCount}/3 for ${exercise.name}. Keep trying!`;
    }

    return {
        shouldDecrease,
        message,
        updatedExercise: updated,
    };
};
