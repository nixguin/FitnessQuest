import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getEquipmentDetails } from '../utils/characterProgression';

interface PixelCharacterProps {
  level: number;
  size?: 'small' | 'medium' | 'large';
}

export default function PixelCharacter({ level, size = 'medium' }: PixelCharacterProps) {
  const equipment = getEquipmentDetails(level);
  
  const sizeMap = {
    small: { container: 80, emoji: 24, text: 10 },
    medium: { container: 120, emoji: 36, text: 12 },
    large: { container: 160, emoji: 48, text: 14 },
  };
  
  const dimensions = sizeMap[size];

  return (
    <View style={[styles.container, { width: dimensions.container, height: dimensions.container }]}>
      {/* Character Body - Pixelated Box */}
      <View style={styles.characterBody}>
        {/* Head */}
        <View style={[styles.pixelRow, styles.head]}>
          <View style={styles.pixel} />
          <View style={styles.pixel} />
          <View style={styles.pixel} />
        </View>
        
        {/* Body with Armor */}
        <View style={[styles.pixelRow, styles.body, { backgroundColor: equipment.armor.color }]}>
          <View style={[styles.pixel, { backgroundColor: equipment.armor.color }]} />
          <View style={[styles.pixel, { backgroundColor: equipment.armor.color }]} />
          <View style={[styles.pixel, { backgroundColor: equipment.armor.color }]} />
        </View>
        
        {/* Arms with Weapon */}
        <View style={styles.pixelRow}>
          <View style={[styles.pixel, styles.arm]} />
          <View style={styles.pixel} />
          <View style={[styles.pixel, styles.arm, { backgroundColor: equipment.weapon.color }]} />
        </View>
        
        {/* Legs */}
        <View style={styles.pixelRow}>
          <View style={[styles.pixel, styles.leg]} />
          <View style={styles.pixel} />
          <View style={[styles.pixel, styles.leg]} />
        </View>
      </View>

      {/* Equipment Emojis */}
      <View style={styles.equipment}>
        <Text style={[styles.equipmentEmoji, { fontSize: dimensions.emoji * 0.6 }]}>
          {equipment.weapon.emoji}
        </Text>
        <Text style={[styles.equipmentEmoji, { fontSize: dimensions.emoji * 0.6 }]}>
          {equipment.armor.emoji}
        </Text>
        {equipment.accessory && (
          <Text style={[styles.equipmentEmoji, { fontSize: dimensions.emoji * 0.5 }]}>
            {equipment.accessory.emoji}
          </Text>
        )}
      </View>

      {/* Level Badge */}
      <View style={styles.levelBadge}>
        <Text style={[styles.levelText, { fontSize: dimensions.text }]}>LV {level}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderWidth: 3,
    borderColor: '#4a9eff',
    padding: 8,
    position: 'relative',
  },
  characterBody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pixelRow: {
    flexDirection: 'row',
    gap: 2,
  },
  pixel: {
    width: 12,
    height: 12,
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#4a9eff',
  },
  head: {
    marginBottom: 2,
  },
  body: {
    marginBottom: 2,
  },
  arm: {
    backgroundColor: '#8b8b8b',
  },
  leg: {
    backgroundColor: '#4a4a4a',
  },
  equipment: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  equipmentEmoji: {
    fontSize: 20,
  },
  levelBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#4a9eff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: '#fff',
  },
  levelText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: 'monospace',
  },
});
