import { Exercise } from '../types';

/**
 * Exercise progression chains - when you master one, advance to the next variation
 */
export const EXERCISE_PROGRESSIONS = {
  'pushups': [
    { name: 'Push-ups', startTarget: 20, increment: 5, maxTarget: 100 },
    { name: 'Diamond Push-ups', startTarget: 10, increment: 3, maxTarget: 50, description: 'Hands together, harder on triceps' },
    { name: 'Archer Push-ups', startTarget: 5, increment: 2, maxTarget: 30, description: 'One arm emphasis, builds unilateral strength' },
    { name: 'One-Arm Push-ups', startTarget: 3, increment: 1, maxTarget: 20, description: 'Ultimate push-up mastery!' },
    { name: 'Planche Push-ups', startTarget: 1, increment: 1, maxTarget: 10, description: 'Elite level strength move' },
  ],
  'pullups': [
    { name: 'Pull-ups', startTarget: 5, increment: 2, maxTarget: 30 },
    { name: 'Wide-Grip Pull-ups', startTarget: 3, increment: 2, maxTarget: 25, description: 'Wider grip, harder on lats' },
    { name: 'Archer Pull-ups', startTarget: 2, increment: 1, maxTarget: 15, description: 'One arm emphasis' },
    { name: 'One-Arm Pull-ups', startTarget: 1, increment: 1, maxTarget: 10, description: 'Peak pulling strength!' },
    { name: 'Muscle-ups', startTarget: 1, increment: 1, maxTarget: 15, description: 'Explosive pull to dip transition' },
  ],
  'squats': [
    { name: 'Bodyweight Squats', startTarget: 30, increment: 10, maxTarget: 150 },
    { name: 'Jump Squats', startTarget: 15, increment: 5, maxTarget: 80, description: 'Explosive power training' },
    { name: 'Pistol Squats', startTarget: 5, increment: 2, maxTarget: 30, description: 'Single leg strength and balance' },
    { name: 'Shrimp Squats', startTarget: 3, increment: 2, maxTarget: 25, description: 'Advanced single leg variation' },
    { name: 'Dragon Pistol Squats', startTarget: 2, increment: 1, maxTarget: 15, description: 'Elite leg strength' },
  ],
  'dips': [
    { name: 'Bench Dips', startTarget: 15, increment: 5, maxTarget: 80 },
    { name: 'Parallel Bar Dips', startTarget: 8, increment: 3, maxTarget: 50, description: 'Full bodyweight dips' },
    { name: 'Ring Dips', startTarget: 5, increment: 2, maxTarget: 30, description: 'Instability increases difficulty' },
    { name: 'Weighted Dips', startTarget: 5, increment: 2, maxTarget: 25, description: 'Add weight for strength' },
    { name: 'Korean Dips', startTarget: 3, increment: 1, maxTarget: 15, description: 'Extreme range of motion' },
  ],
  'running': [
    { name: 'Running', startTarget: 1, increment: 0.5, maxTarget: 5, unit: 'miles' },
    { name: 'Interval Sprints', startTarget: 0.5, increment: 0.25, maxTarget: 3, unit: 'miles', description: '30s sprint, 30s jog intervals' },
    { name: 'Hill Sprints', startTarget: 0.5, increment: 0.25, maxTarget: 2, unit: 'miles', description: 'Explosive power on inclines' },
    { name: 'Long Distance', startTarget: 3, increment: 1, maxTarget: 13, unit: 'miles', description: 'Endurance building' },
    { name: 'Tempo Runs', startTarget: 2, increment: 0.5, maxTarget: 8, unit: 'miles', description: 'Sustained hard effort' },
  ],
  'plank': [
    { name: 'Plank Hold', startTarget: 30, increment: 15, maxTarget: 300, unit: 'seconds' },
    { name: 'Side Plank', startTarget: 20, increment: 10, maxTarget: 180, unit: 'seconds', description: 'Oblique strength' },
    { name: 'Plank with Leg Lift', startTarget: 15, increment: 10, maxTarget: 150, unit: 'seconds', description: 'Added instability' },
    { name: 'Dragon Flag Hold', startTarget: 5, increment: 5, maxTarget: 60, unit: 'seconds', description: 'Advanced core control' },
    { name: 'Human Flag Hold', startTarget: 3, increment: 3, maxTarget: 30, unit: 'seconds', description: 'Elite strength feat' },
  ],
  'burpees': [
    { name: 'Burpees', startTarget: 10, increment: 5, maxTarget: 60 },
    { name: 'Burpee Pull-ups', startTarget: 5, increment: 3, maxTarget: 40, description: 'Burpee + pull-up combo' },
    { name: 'Burpee Box Jumps', startTarget: 5, increment: 3, maxTarget: 35, description: 'Explosive jump variation' },
    { name: 'Muscle-up Burpees', startTarget: 3, increment: 2, maxTarget: 25, description: 'Elite conditioning' },
    { name: 'Devil Press', startTarget: 5, increment: 2, maxTarget: 30, description: 'Burpee + dumbbell snatch' },
  ],
  'handstand': [
    { name: 'Wall Handstand', startTarget: 20, increment: 10, maxTarget: 180, unit: 'seconds' },
    { name: 'Free Handstand', startTarget: 10, increment: 5, maxTarget: 120, unit: 'seconds', description: 'No wall support' },
    { name: 'Handstand Push-ups', startTarget: 3, increment: 2, maxTarget: 25, description: 'Shoulder strength' },
    { name: 'Handstand Walk', startTarget: 5, increment: 3, maxTarget: 50, unit: 'steps', description: 'Balance and control' },
    { name: 'One-Arm Handstand', startTarget: 3, increment: 2, maxTarget: 30, unit: 'seconds', description: 'Ultimate skill' },
  ],
};

/**
 * Map generic exercise names to progression chains
 */
export const getProgressionChain = (exerciseName: string): typeof EXERCISE_PROGRESSIONS[keyof typeof EXERCISE_PROGRESSIONS] | null => {
  const normalized = exerciseName.toLowerCase().trim();
  
  // Direct matches
  for (const [key, chain] of Object.entries(EXERCISE_PROGRESSIONS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return chain;
    }
  }
  
  // Fuzzy matches for common variations
  if (normalized.includes('push') && normalized.includes('up')) return EXERCISE_PROGRESSIONS.pushups;
  if (normalized.includes('pull') && normalized.includes('up')) return EXERCISE_PROGRESSIONS.pullups;
  if (normalized.includes('squat')) return EXERCISE_PROGRESSIONS.squats;
  if (normalized.includes('dip')) return EXERCISE_PROGRESSIONS.dips;
  if (normalized.includes('run')) return EXERCISE_PROGRESSIONS.running;
  if (normalized.includes('plank')) return EXERCISE_PROGRESSIONS.plank;
  if (normalized.includes('burpee')) return EXERCISE_PROGRESSIONS.burpees;
  if (normalized.includes('handstand')) return EXERCISE_PROGRESSIONS.handstand;
  
  return null;
};

/**
 * Get the next exercise variation when current is mastered
 */
export const getNextVariation = (exercise: Exercise): {
  hasNext: boolean;
  nextExercise?: {
    name: string;
    startTarget: number;
    increment: number;
    maxTarget: number;
    unit: string;
    description?: string;
  };
  currentLevel?: number;
  totalLevels?: number;
} => {
  const chain = getProgressionChain(exercise.name);
  
  if (!chain) {
    return { hasNext: false };
  }
  
  // Find current position in the chain
  const currentIndex = chain.findIndex(v => 
    exercise.name.toLowerCase().includes(v.name.toLowerCase()) ||
    v.name.toLowerCase().includes(exercise.name.toLowerCase())
  );
  
  if (currentIndex === -1 || currentIndex >= chain.length - 1) {
    return { 
      hasNext: false,
      currentLevel: currentIndex + 1,
      totalLevels: chain.length
    };
  }
  
  const nextVariation = chain[currentIndex + 1];
  
  return {
    hasNext: true,
    nextExercise: {
      name: nextVariation.name,
      startTarget: nextVariation.startTarget,
      increment: nextVariation.increment,
      maxTarget: nextVariation.maxTarget,
      unit: nextVariation.unit || exercise.unit,
      description: nextVariation.description,
    },
    currentLevel: currentIndex + 1,
    totalLevels: chain.length,
  };
};

/**
 * Suggest alternative exercises if no progression exists
 */
export const suggestAlternatives = (exercise: Exercise): string[] => {
  const suggestions: { [key: string]: string[] } = {
    'upper body push': ['Push-ups', 'Dips', 'Handstand Push-ups', 'Pike Push-ups'],
    'upper body pull': ['Pull-ups', 'Chin-ups', 'Australian Pull-ups', 'Inverted Rows'],
    'legs': ['Squats', 'Lunges', 'Step-ups', 'Box Jumps'],
    'core': ['Plank', 'Hollow Body Hold', 'L-Sit', 'Leg Raises'],
    'cardio': ['Running', 'Burpees', 'Jump Rope', 'Mountain Climbers'],
  };
  
  // Categorize the current exercise
  const name = exercise.name.toLowerCase();
  if (name.includes('push') || name.includes('dip') || name.includes('bench')) {
    return suggestions['upper body push'];
  }
  if (name.includes('pull') || name.includes('row') || name.includes('chin')) {
    return suggestions['upper body pull'];
  }
  if (name.includes('squat') || name.includes('lunge') || name.includes('leg')) {
    return suggestions['legs'];
  }
  if (name.includes('plank') || name.includes('core') || name.includes('sit')) {
    return suggestions['core'];
  }
  if (name.includes('run') || name.includes('sprint') || name.includes('cardio')) {
    return suggestions['cardio'];
  }
  
  return ['Try adding a new exercise type!'];
};
