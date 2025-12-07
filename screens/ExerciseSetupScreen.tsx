import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { Exercise } from "../types";
import { getExercises, saveExercises } from "../utils/storage";

export default function ExerciseSetupScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: "",
    currentTarget: "",
    unit: "reps",
    weeklyIncrease: "",
    maxTarget: "",
  });

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    const loaded = await getExercises();
    setExercises(loaded);
  };

  const addExercise = async () => {
    if (
      !newExercise.name ||
      !newExercise.currentTarget ||
      !newExercise.weeklyIncrease ||
      !newExercise.maxTarget
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const exercise: Exercise = {
      id: Date.now().toString(),
      name: newExercise.name,
      type: "custom",
      currentTarget: parseInt(newExercise.currentTarget),
      unit: newExercise.unit,
      weeklyIncrease: parseInt(newExercise.weeklyIncrease),
      maxTarget: parseInt(newExercise.maxTarget),
      difficulty: 1,
      createdAt: new Date().toISOString(),
      pendingAmount: 0,
      underperformanceCount: 0,
    };

    const updated = [...exercises, exercise];
    await saveExercises(updated);
    setExercises(updated);
    setModalVisible(false);
    setNewExercise({
      name: "",
      currentTarget: "",
      unit: "reps",
      weeklyIncrease: "",
      maxTarget: "",
    });
  };

  const addQuickExercise = async (type: "pushups" | "running" | "pullups") => {
    const templates = {
      pushups: {
        name: "Push-ups",
        currentTarget: 20,
        unit: "reps",
        weeklyIncrease: 5,
        maxTarget: 100,
      },
      running: {
        name: "Running",
        currentTarget: 1,
        unit: "miles",
        weeklyIncrease: 0.5,
        maxTarget: 5,
      },
      pullups: {
        name: "Pull-ups",
        currentTarget: 5,
        unit: "reps",
        weeklyIncrease: 2,
        maxTarget: 30,
      },
    };

    const template = templates[type];
    const exercise: Exercise = {
      id: Date.now().toString(),
      name: template.name,
      type: type,
      currentTarget: template.currentTarget,
      unit: template.unit,
      weeklyIncrease: template.weeklyIncrease,
      maxTarget: template.maxTarget,
      difficulty: 1,
      createdAt: new Date().toISOString(),
      pendingAmount: 0,
      underperformanceCount: 0,
    };

    const updated = [...exercises, exercise];
    await saveExercises(updated);
    setExercises(updated);
  };

  const removeExercise = async (id: string) => {
    const updated = exercises.filter((e) => e.id !== id);
    await saveExercises(updated);
    setExercises(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚔️ Setup Your Daily Quest</Text>
      <Text style={styles.subtitle}>Create your training regimen</Text>

      <View style={styles.quickAddContainer}>
        <Text style={styles.sectionTitle}>Quick Add:</Text>
        <View style={styles.quickButtonRow}>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => addQuickExercise("pushups")}
          >
            <Text style={styles.quickButtonText}>💪 Push-ups</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => addQuickExercise("running")}
          >
            <Text style={styles.quickButtonText}>🏃 Running</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => addQuickExercise("pullups")}
          >
            <Text style={styles.quickButtonText}>🏋️ Pull-ups</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.exerciseList}>
        <Text style={styles.sectionTitle}>Your Exercises:</Text>
        {exercises.length === 0 ? (
          <Text style={styles.emptyText}>
            No exercises added yet. Start by adding some!
          </Text>
        ) : (
          exercises.map((exercise) => (
            <View key={exercise.id} style={styles.exerciseCard}>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetail}>
                  Target: {exercise.currentTarget} {exercise.unit}
                </Text>
                <Text style={styles.exerciseDetail}>
                  Weekly +{exercise.weeklyIncrease} | Max: {exercise.maxTarget}
                </Text>
                <Text style={styles.exerciseDetail}>
                  Difficulty Level: {exercise.difficulty}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeExercise(exercise.id)}
              >
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addCustomButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addCustomButtonText}>+ Add Custom Exercise</Text>
      </TouchableOpacity>

      {exercises.length > 0 && (
        <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
          <Text style={styles.completeButtonText}>Start Training ⚡</Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Custom Exercise</Text>

            <TextInput
              style={styles.input}
              placeholder="Exercise Name"
              value={newExercise.name}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, name: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Starting Target"
              keyboardType="numeric"
              value={newExercise.currentTarget}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, currentTarget: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Unit (reps, miles, minutes)"
              value={newExercise.unit}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, unit: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Weekly Increase"
              keyboardType="numeric"
              value={newExercise.weeklyIncrease}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, weeklyIncrease: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Max Target (triggers level up)"
              keyboardType="numeric"
              value={newExercise.maxTarget}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, maxTarget: text })
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButton]}
                onPress={addExercise}
              >
                <Text style={styles.modalButtonText}>Add</Text>
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
    backgroundColor: "#1a1a2e",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4a9eff",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "#1a2f4a",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#8b8b8b",
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 1,
  },
  quickAddContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  quickButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  quickButton: {
    flex: 1,
    backgroundColor: "#16213e",
    padding: 12,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: "#4a9eff",
    borderStyle: "solid",
  },
  quickButtonText: {
    color: "#4a9eff",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  exerciseList: {
    flex: 1,
    marginBottom: 20,
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
  exerciseCard: {
    backgroundColor: "#16213e",
    padding: 16,
    borderRadius: 0,
    marginBottom: 12,
    borderWidth: 4,
    borderColor: "#00d9ff",
    borderStyle: "solid",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
    letterSpacing: 1,
  },
  exerciseDetail: {
    fontSize: 11,
    color: "#8b8b8b",
    marginBottom: 2,
    fontFamily: "monospace",
  },
  removeButton: {
    padding: 8,
    backgroundColor: "#ff0040",
    borderWidth: 2,
    borderColor: "#fff",
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addCustomButton: {
    backgroundColor: "#16213e",
    padding: 16,
    borderRadius: 0,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#ffaa00",
  },
  addCustomButtonText: {
    color: "#ffaa00",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  completeButton: {
    backgroundColor: "#4a9eff",
    padding: 18,
    borderRadius: 0,
    borderWidth: 4,
    borderColor: "#fff",
  },
  completeButtonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  modalContent: {
    backgroundColor: "#16213e",
    padding: 24,
    borderRadius: 0,
    width: "85%",
    borderWidth: 4,
    borderColor: "#4a9eff",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a9eff",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 2,
  },
  input: {
    backgroundColor: "#1a1a2e",
    color: "#ffffff",
    padding: 12,
    borderRadius: 0,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#4a9eff",
    fontSize: 14,
    fontFamily: "monospace",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 0,
    borderWidth: 3,
  },
  cancelButton: {
    backgroundColor: "#16213e",
    borderColor: "#ff0040",
  },
  addButton: {
    backgroundColor: "#4a9eff",
    borderColor: "#fff",
  },
  modalButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
