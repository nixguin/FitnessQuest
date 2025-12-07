import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { Exercise, DailyQuest, QuestExercise, UserProgress } from '../types';
import {
  getExercises,
  getTodayQuest,
  saveDailyQuest,
  getUserProgress,
  saveUserProgress,
  saveExercises,
} from '../utils/storage';
import { getTodayString, getDaysAgo } from '../utils/dateUtils';
import { progressExerciseWeekly, isProgressionDay } from '../utils/progressiveOverload';
import { 
  calculateTodayTarget, 
  analyzePerformance,
  shouldDecreaseTarget,
  decreaseExerciseTarget 
} from '../utils/adaptiveDifficulty';
import PixelCharacter from '../components/PixelCharacter';
import CharacterStats from '../components/CharacterStats';
import { checkNewEquipment } from '../utils/characterProgression';

export default function DailyQuestScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [todayQuest, setTodayQuest] = useState<DailyQuest | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    currentTarget: '',
    weeklyIncrease: '',
    maxTarget: '',
    unit: 'reps',
  });
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [weightInput, setWeightInput] = useState('');
  const [goalWeightInput, setGoalWeightInput] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const today = getTodayString();
    const loadedExercises = await getExercises();
    const loadedProgress = await getUserProgress();
    
    // Check for weekly progression
    const updatedExercises = await checkAndApplyProgression(loadedExercises);
    
    setExercises(updatedExercises);
    setProgress(loadedProgress);

    // Load or create today's quest
    let quest = await getTodayQuest(today);
    if (!quest) {
      quest = createTodayQuest(today, updatedExercises);
      await saveDailyQuest(quest);
    }
    setTodayQuest(quest);

    // Initialize input values
    const initialInputs: { [key: string]: string } = {};
    quest.exercises.forEach((ex) => {
      initialInputs[ex.exerciseId] = ex.actualAmount?.toString() || '';
    });
    setInputValues(initialInputs);
  };

  const checkAndApplyProgression = async (currentExercises: Exercise[]): Promise<Exercise[]> => {
    const today = new Date();
    let hasChanges = false;
    
    const updatedExercises = currentExercises.map((exercise) => {
      if (isProgressionDay(exercise.createdAt, today)) {
        hasChanges = true;
        const progressed = progressExerciseWeekly(exercise);
        
        if (progressed.difficulty > exercise.difficulty) {
          Alert.alert(
            '🎉 Level Up!',
            `${exercise.name} has reached Difficulty Level ${progressed.difficulty}!\nNew target: ${progressed.currentTarget} ${progressed.unit}`
          );
        } else {
          Alert.alert(
            '📈 Progressive Overload',
            `${exercise.name} target increased to ${progressed.currentTarget} ${progressed.unit}`
          );
        }
        
        return progressed;
      }
      return exercise;
    });

    if (hasChanges) {
      await saveExercises(updatedExercises);
    }

    return updatedExercises;
  };

  const createTodayQuest = (date: string, exs: Exercise[]): DailyQuest => {
    return {
      id: Date.now().toString(),
      date,
      exercises: exs.map((ex) => ({
        exerciseId: ex.id,
        exerciseName: ex.name,
        target: calculateTodayTarget(ex), // Include pending penalties
        unit: ex.unit,
        completed: false,
      })),
      completed: false,
    };
  };

  const updateWeight = async () => {
    if (!weightInput) {
      Alert.alert('Missing Information', 'Please enter your weight');
      return;
    }

    if (!progress) return;

    const today = getTodayString();
    const weight = parseFloat(weightInput);
    
    // Check if already logged today
    const todayEntry = progress.weightHistory?.find(entry => entry.date === today);
    
    let updatedHistory = progress.weightHistory || [];
    if (todayEntry) {
      // Update existing entry
      updatedHistory = updatedHistory.map(entry =>
        entry.date === today ? { date: today, weight } : entry
      );
    } else {
      // Add new entry
      updatedHistory.push({ date: today, weight });
    }

    const updatedProgress: UserProgress = {
      ...progress,
      currentWeight: weight,
      goalWeight: goalWeightInput ? parseFloat(goalWeightInput) : progress.goalWeight,
      weightHistory: updatedHistory,
    };

    await saveUserProgress(updatedProgress);
    setProgress(updatedProgress);
    setShowWeightModal(false);
    setWeightInput('');
    setGoalWeightInput('');

    Alert.alert('✅ Weight Updated!', `Current weight: ${weight} lbs`);
  };

  const addNewExercise = async () => {
    if (!newExercise.name || !newExercise.currentTarget || !newExercise.weeklyIncrease || !newExercise.maxTarget) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    const exercise: Exercise = {
      id: Date.now().toString(),
      name: newExercise.name,
      currentTarget: parseInt(newExercise.currentTarget),
      weeklyIncrease: parseInt(newExercise.weeklyIncrease),
      maxTarget: parseInt(newExercise.maxTarget),
      unit: newExercise.unit,
      difficulty: 1,
      createdAt: new Date().toISOString(),
      pendingAmount: 0,
      underperformanceCount: 0,
      type: 'custom',
    };

    const updatedExercises = [...exercises, exercise];
    await saveExercises(updatedExercises);
    setExercises(updatedExercises);

    // Add to today's quest
    if (todayQuest) {
      const newQuestExercise: QuestExercise = {
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        target: exercise.currentTarget,
        unit: exercise.unit,
        completed: false,
      };

      const updatedQuest: DailyQuest = {
        ...todayQuest,
        exercises: [...todayQuest.exercises, newQuestExercise],
        completed: false,
      };

      await saveDailyQuest(updatedQuest);
      setTodayQuest(updatedQuest);
      setInputValues({ ...inputValues, [exercise.id]: '' });
    }

    // Reset form
    setNewExercise({
      name: '',
      currentTarget: '',
      weeklyIncrease: '',
      maxTarget: '',
      unit: 'reps',
    });
    setShowAddModal(false);

    Alert.alert('✅ Exercise Added!', `${exercise.name} has been added to your daily quest.`);
  };

  const toggleExerciseComplete = async (exerciseId: string) => {
    if (!todayQuest) return;

    const questExercise = todayQuest.exercises.find(ex => ex.exerciseId === exerciseId);
    if (!questExercise) return;

    const exercise = exercises.find(e => e.id === exerciseId);
    if (!exercise) return;

    const actualAmount = parseInt(inputValues[exerciseId] || '0');
    
    // Only analyze performance when marking as complete (not when unchecking)
    if (!questExercise.completed && actualAmount > 0) {
      // Analyze performance and update exercise
      const analysis = analyzePerformance(exercise, questExercise.target, actualAmount);
      
      // Update the exercise with new stats
      const updatedExercisesList = exercises.map(e => 
        e.id === exerciseId ? analysis.updatedExercise : e
      );
      await saveExercises(updatedExercisesList);
      setExercises(updatedExercisesList);

      // Show feedback to user
      if (analysis.message) {
        Alert.alert(
          analysis.shouldDecrease ? '📉 Difficulty Adjusted' : '📝 Performance Tracked',
          analysis.message
        );
      }
    }

    const updatedExercises = todayQuest.exercises.map((ex) => {
      if (ex.exerciseId === exerciseId) {
        const amount = actualAmount > 0 ? actualAmount : ex.target;
        return {
          ...ex,
          completed: !ex.completed,
          actualAmount: amount,
          isUnderperformed: amount < ex.target * 0.75,
        };
      }
      return ex;
    });

    const allCompleted = updatedExercises.every((ex) => ex.completed);
    const updatedQuest: DailyQuest = {
      ...todayQuest,
      exercises: updatedExercises,
      completed: allCompleted,
      completedAt: allCompleted ? new Date().toISOString() : undefined,
    };

    await saveDailyQuest(updatedQuest);
    setTodayQuest(updatedQuest);

    // Update progress if quest completed
    if (allCompleted && !todayQuest.completed && progress) {
      const oldLevel = progress.level;
      const newProgress: UserProgress = {
        ...progress,
        totalDaysCompleted: progress.totalDaysCompleted + 1,
        currentStreak: progress.currentStreak + 1,
        longestStreak: Math.max(progress.longestStreak, progress.currentStreak + 1),
        exp: progress.exp + 100,
        level: Math.floor((progress.exp + 100) / 500) + 1,
      };
      await saveUserProgress(newProgress);
      setProgress(newProgress);

      // Check for level up and new equipment
      const leveledUp = newProgress.level > oldLevel;
      if (leveledUp) {
        const newEquipment = checkNewEquipment(newProgress.level);
        
        let equipmentMsg = '';
        if (newEquipment.hasNew) {
          equipmentMsg = '\n\n🎁 NEW EQUIPMENT UNLOCKED!\n';
          newEquipment.items.forEach(item => {
            equipmentMsg += `${item.item.emoji} ${item.type}: ${item.item.name}\n`;
          });
        }

        Alert.alert(
          '⭐ LEVEL UP! ⭐',
          `Level ${newProgress.level}!\nYou've earned 100 EXP!\nCurrent Streak: ${newProgress.currentStreak} days${equipmentMsg}`
        );
      } else {
        Alert.alert(
          '✅ Daily Quest Complete!',
          `You've earned 100 EXP!\nCurrent Streak: ${newProgress.currentStreak} days\nLevel: ${newProgress.level}`
        );
      }
    }
  };

  if (!todayQuest || !progress) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading your quest...</Text>
      </View>
    );
  }

  const expProgress = (progress.exp % 500) / 500;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⚔️ Daily Quest</Text>
        <Text style={styles.date}>{getTodayString()}</Text>
        
        {/* Pixel Character Display */}
        <View style={styles.characterContainer}>
          <PixelCharacter level={progress.level} size="medium" />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{progress.level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{progress.currentStreak}</Text>
            <Text style={styles.statLabel}>Streak 🔥</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{progress.totalDaysCompleted}</Text>
            <Text style={styles.statLabel}>Total Days</Text>
          </View>
        </View>

        <View style={styles.expBarContainer}>
          <View style={[styles.expBar, { width: `${expProgress * 100}%` }]} />
        </View>
        <Text style={styles.expText}>
          {progress.exp % 500} / 500 EXP to Level {progress.level + 1}
        </Text>
      </View>

      {/* Character Equipment Stats */}
      <ScrollView style={styles.questList}>
        <CharacterStats level={progress.level} />

        {/* Weight Tracker */}
        <View style={styles.weightContainer}>
          <Text style={styles.weightTitle}>⚖️ WEIGHT TRACKER</Text>
          <View style={styles.weightStats}>
            <View style={styles.weightBox}>
              <Text style={styles.weightLabel}>Current</Text>
              <Text style={styles.weightValue}>
                {progress.currentWeight ? `${progress.currentWeight} lbs` : '-'}
              </Text>
            </View>
            <View style={styles.weightBox}>
              <Text style={styles.weightLabel}>Goal</Text>
              <Text style={styles.weightValue}>
                {progress.goalWeight ? `${progress.goalWeight} lbs` : '-'}
              </Text>
            </View>
            {progress.currentWeight && progress.goalWeight && (
              <View style={styles.weightBox}>
                <Text style={styles.weightLabel}>Remaining</Text>
                <Text style={[styles.weightValue, { fontSize: 14 }]}>
                  {Math.abs(progress.currentWeight - progress.goalWeight).toFixed(1)} lbs
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.updateWeightButton}
            onPress={() => {
              setWeightInput(progress.currentWeight?.toString() || '');
              setGoalWeightInput(progress.goalWeight?.toString() || '');
              setShowWeightModal(true);
            }}
          >
            <Text style={styles.updateWeightButtonText}>Update Weight</Text>
          </TouchableOpacity>
        </View>

        {todayQuest.exercises.map((questEx) => {
          const exercise = exercises.find((e) => e.id === questEx.exerciseId);
          const hasPenalty = exercise && exercise.pendingAmount > 0;
          const isStruggling = exercise && exercise.underperformanceCount > 0;
          
          return (
            <View
              key={questEx.exerciseId}
              style={[
                styles.questCard,
                questEx.completed && styles.questCardCompleted,
                questEx.isUnderperformed && styles.questCardUnderperformed,
              ]}
            >
              <View style={styles.questInfo}>
                <Text style={styles.questName}>{questEx.exerciseName}</Text>
                <Text style={styles.questTarget}>
                  Target: {questEx.target} {questEx.unit}
                  {hasPenalty && ` (${exercise.currentTarget} + ${exercise.pendingAmount} penalty)`}
                </Text>
                {exercise && (
                  <>
                    <Text style={styles.questDifficulty}>
                      Difficulty Level {exercise.difficulty}
                    </Text>
                    {hasPenalty && (
                      <Text style={styles.penaltyWarning}>
                        ⚠️ Incomplete work from previous days
                      </Text>
                    )}
                    {isStruggling && (
                      <Text style={styles.struggleWarning}>
                        📉 Struggling {exercise.underperformanceCount}/3 days
                      </Text>
                    )}
                  </>
                )}
                
                {!questEx.completed && (
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Completed:</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor="#666"
                      value={inputValues[questEx.exerciseId] || ''}
                      onChangeText={(text) =>
                        setInputValues({ ...inputValues, [questEx.exerciseId]: text })
                      }
                    />
                    <Text style={styles.inputUnit}>{questEx.unit}</Text>
                  </View>
                )}
                
                {questEx.completed && questEx.actualAmount && (
                  <Text style={styles.completedAmount}>
                    ✓ Completed: {questEx.actualAmount} {questEx.unit}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={[
                  styles.checkButton,
                  questEx.completed && styles.checkButtonCompleted,
                ]}
                onPress={() => toggleExerciseComplete(questEx.exerciseId)}
              >
                <Text style={styles.checkButtonText}>
                  {questEx.completed ? '✓' : '○'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {/* Add Exercise Button */}
        <TouchableOpacity
          style={styles.addExerciseButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addExerciseButtonText}>+ Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>

      {todayQuest.completed && (
        <View style={styles.completeBanner}>
          <Text style={styles.completeBannerText}>
            🎉 Today's Quest Complete! 🎉
          </Text>
        </View>
      )}

      {/* Add Exercise Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>+ ADD EXERCISE</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Exercise Name"
              placeholderTextColor="#666"
              value={newExercise.name}
              onChangeText={(text) => setNewExercise({ ...newExercise, name: text })}
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Starting Target"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={newExercise.currentTarget}
              onChangeText={(text) => setNewExercise({ ...newExercise, currentTarget: text })}
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Weekly Increment"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={newExercise.weeklyIncrease}
              onChangeText={(text) => setNewExercise({ ...newExercise, weeklyIncrease: text })}
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Max Target (for level up)"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={newExercise.maxTarget}
              onChangeText={(text) => setNewExercise({ ...newExercise, maxTarget: text })}
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Unit (reps, km, min)"
              placeholderTextColor="#666"
              value={newExercise.unit}
              onChangeText={(text) => setNewExercise({ ...newExercise, unit: text })}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddModal(false);
                  setNewExercise({
                    name: '',
                    currentTarget: '',
                    weeklyIncrease: '',
                    maxTarget: '',
                    unit: 'reps',
                  });
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={addNewExercise}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Weight Update Modal */}
      <Modal
        visible={showWeightModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowWeightModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>⚖️ UPDATE WEIGHT</Text>
            
            <Text style={styles.weightInputLabel}>Current Weight (lbs)</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter weight"
              placeholderTextColor="#666"
              keyboardType="decimal-pad"
              value={weightInput}
              onChangeText={setWeightInput}
            />
            
            <Text style={styles.weightInputLabel}>Goal Weight (lbs)</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter goal weight"
              placeholderTextColor="#666"
              keyboardType="decimal-pad"
              value={goalWeightInput}
              onChangeText={setGoalWeightInput}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowWeightModal(false);
                  setWeightInput('');
                  setGoalWeightInput('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={updateWeight}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  loadingText: {
    color: '#4a9eff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
    fontFamily: 'monospace',
    letterSpacing: 2,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#16213e',
    borderBottomWidth: 4,
    borderBottomColor: '#4a9eff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a9eff',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 2,
    textShadowColor: '#1a2f4a',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
  },
  date: {
    fontSize: 12,
    color: '#8b8b8b',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 8,
    borderWidth: 2,
    borderColor: '#4a9eff',
    minWidth: 80,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  statLabel: {
    fontSize: 10,
    color: '#8b8b8b',
    marginTop: 4,
    letterSpacing: 1,
  },
  expBarContainer: {
    height: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#4a9eff',
  },
  expBar: {
    height: '100%',
    backgroundColor: '#4a9eff',
  },
  expText: {
    fontSize: 11,
    color: '#8b8b8b',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  characterContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  questList: {
    flex: 1,
    padding: 20,
  },
  questCard: {
    backgroundColor: '#16213e',
    borderRadius: 0,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#4a9eff',
  },
  questCardCompleted: {
    borderColor: '#4a9eff',
    backgroundColor: '#1e2f3f',
  },
  questCardUnderperformed: {
    borderColor: '#ffaa00',
    backgroundColor: '#2a1f16',
  },
  questInfo: {
    flex: 1,
  },
  questName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: 1,
  },
  questTarget: {
    fontSize: 13,
    color: '#4a9eff',
    marginBottom: 2,
    fontFamily: 'monospace',
  },
  questDifficulty: {
    fontSize: 11,
    color: '#8b8b8b',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  inputLabel: {
    color: '#8b8b8b',
    fontSize: 12,
    marginRight: 8,
    fontFamily: 'monospace',
  },
  input: {
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    padding: 8,
    borderRadius: 0,
    width: 80,
    borderWidth: 2,
    borderColor: '#4a9eff',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  inputUnit: {
    color: '#8b8b8b',
    fontSize: 12,
    marginLeft: 8,
    fontFamily: 'monospace',
  },
  completedAmount: {
    color: '#4a9eff',
    fontSize: 13,
    marginTop: 8,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  penaltyWarning: {
    color: '#ffaa00',
    fontSize: 11,
    marginTop: 4,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  struggleWarning: {
    color: '#ff0040',
    fontSize: 11,
    marginTop: 4,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  checkButton: {
    width: 50,
    height: 50,
    borderRadius: 0,
    backgroundColor: '#16213e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4a9eff',
  },
  checkButtonCompleted: {
    backgroundColor: '#4a9eff',
    borderColor: '#fff',
  },
  checkButtonText: {
    fontSize: 28,
    color: '#4a9eff',
    fontWeight: 'bold',
  },
  completeBanner: {
    backgroundColor: '#4a9eff',
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 4,
    borderTopColor: '#fff',
  },
  completeBannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 2,
  },
  addExerciseButton: {
    backgroundColor: '#16213e',
    padding: 16,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: '#4a9eff',
    borderStyle: 'dashed',
    marginTop: 16,
    marginBottom: 32,
  },
  addExerciseButtonText: {
    color: '#4a9eff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: 'monospace',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#16213e',
    padding: 24,
    borderRadius: 0,
    width: '85%',
    borderWidth: 4,
    borderColor: '#4a9eff',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a9eff',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 2,
  },
  modalInput: {
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    padding: 12,
    borderRadius: 0,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#4a9eff',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 0,
    borderWidth: 3,
  },
  cancelButton: {
    backgroundColor: '#1a1a2e',
    borderColor: '#8b8b8b',
  },
  confirmButton: {
    backgroundColor: '#4a9eff',
    borderColor: '#fff',
  },
  modalButtonText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  weightContainer: {
    backgroundColor: '#16213e',
    padding: 16,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: '#4a9eff',
    marginBottom: 16,
  },
  weightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a9eff',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 2,
  },
  weightStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  weightBox: {
    alignItems: 'center',
    minWidth: 80,
  },
  weightLabel: {
    fontSize: 10,
    color: '#8b8b8b',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  weightValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  updateWeightButton: {
    backgroundColor: '#1a1a2e',
    padding: 12,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: '#4a9eff',
  },
  updateWeightButtonText: {
    color: '#4a9eff',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'monospace',
  },
  weightInputLabel: {
    color: '#8b8b8b',
    fontSize: 12,
    marginBottom: 6,
    marginTop: 4,
    fontFamily: 'monospace',
  },
});
