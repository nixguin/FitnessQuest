import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  getEquipmentDetails,
  getNextUnlocks,
} from "../utils/characterProgression";

interface CharacterStatsProps {
  level: number;
}

export default function CharacterStats({ level }: CharacterStatsProps) {
  const equipment = getEquipmentDetails(level);
  const nextUnlocks = getNextUnlocks(level);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚔️ EQUIPMENT</Text>

      <View style={styles.equipmentGrid}>
        {/* Weapon */}
        <View style={styles.equipmentSlot}>
          <Text style={styles.slotLabel}>WEAPON</Text>
          <View
            style={[styles.slotBox, { borderColor: equipment.weapon.color }]}
          >
            <Text style={styles.slotEmoji}>{equipment.weapon.emoji}</Text>
          </View>
          <Text style={styles.slotName}>{equipment.weapon.name}</Text>
          {nextUnlocks.nextWeapon && (
            <Text style={styles.nextUnlock}>
              Next: Lv {nextUnlocks.nextWeapon}
            </Text>
          )}
        </View>

        {/* Armor */}
        <View style={styles.equipmentSlot}>
          <Text style={styles.slotLabel}>ARMOR</Text>
          <View
            style={[styles.slotBox, { borderColor: equipment.armor.color }]}
          >
            <Text style={styles.slotEmoji}>{equipment.armor.emoji}</Text>
          </View>
          <Text style={styles.slotName}>{equipment.armor.name}</Text>
          {nextUnlocks.nextArmor && (
            <Text style={styles.nextUnlock}>
              Next: Lv {nextUnlocks.nextArmor}
            </Text>
          )}
        </View>

        {/* Accessory */}
        <View style={styles.equipmentSlot}>
          <Text style={styles.slotLabel}>ACCESSORY</Text>
          <View
            style={[
              styles.slotBox,
              { borderColor: equipment.accessory?.color || "#8b8b8b" },
            ]}
          >
            <Text style={styles.slotEmoji}>
              {equipment.accessory?.emoji || "?"}
            </Text>
          </View>
          <Text style={styles.slotName}>
            {equipment.accessory?.name || "Locked"}
          </Text>
          {nextUnlocks.nextAccessory && (
            <Text style={styles.nextUnlock}>
              Next: Lv {nextUnlocks.nextAccessory}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#16213e",
    padding: 16,
    borderWidth: 3,
    borderColor: "#4a9eff",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a9eff",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 2,
  },
  equipmentGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  equipmentSlot: {
    flex: 1,
    alignItems: "center",
  },
  slotLabel: {
    fontSize: 9,
    color: "#8b8b8b",
    marginBottom: 4,
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  slotBox: {
    width: 60,
    height: 60,
    backgroundColor: "#1a1a2e",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  slotEmoji: {
    fontSize: 32,
  },
  slotName: {
    fontSize: 10,
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "monospace",
    marginBottom: 2,
  },
  nextUnlock: {
    fontSize: 8,
    color: "#ffaa00",
    fontFamily: "monospace",
  },
});
