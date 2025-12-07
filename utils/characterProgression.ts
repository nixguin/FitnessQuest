export interface CharacterEquipment {
  weapon: string;
  armor: string;
  accessory: string;
}

export interface CharacterState {
  level: number;
  equipment: CharacterEquipment;
  unlockedItems: string[];
}

// Equipment unlocked at different levels
export const EQUIPMENT_PROGRESSION = {
  weapons: {
    1: { name: 'Wooden Stick', emoji: '🪵', color: '#8b4513' },
    10: { name: 'Iron Sword', emoji: '⚔️', color: '#c0c0c0' },
    20: { name: 'Steel Blade', emoji: '🗡️', color: '#4a4a4a' },
    30: { name: 'Knight Sword', emoji: '⚔️', color: '#ffd700' },
    40: { name: 'Magic Sword', emoji: '🔮', color: '#9370db' },
    50: { name: 'Legendary Blade', emoji: '⚡', color: '#ff0040' },
  },
  armor: {
    1: { name: 'Cloth Shirt', emoji: '👕', color: '#8b8b8b' },
    10: { name: 'Leather Armor', emoji: '🦺', color: '#8b4513' },
    20: { name: 'Chain Mail', emoji: '🛡️', color: '#c0c0c0' },
    30: { name: 'Knight Armor', emoji: '🛡️', color: '#ffd700' },
    40: { name: 'Enchanted Plate', emoji: '✨', color: '#9370db' },
    50: { name: 'Legendary Armor', emoji: '💎', color: '#00d9ff' },
  },
  accessories: {
    5: { name: 'Bronze Ring', emoji: '💍', color: '#cd7f32' },
    10: { name: 'Silver Necklace', emoji: '📿', color: '#c0c0c0' },
    15: { name: 'Gold Ring', emoji: '💍', color: '#ffd700' },
    20: { name: 'Ruby Pendant', emoji: '💎', color: '#ff0040' },
    25: { name: 'Emerald Ring', emoji: '💍', color: '#00ff41' },
    30: { name: 'Sapphire Crown', emoji: '👑', color: '#0000ff' },
    35: { name: 'Diamond Earring', emoji: '💎', color: '#ffffff' },
    40: { name: 'Mystic Amulet', emoji: '🔮', color: '#9370db' },
    45: { name: 'Dragon Scale', emoji: '🐉', color: '#ff6347' },
    50: { name: 'Divine Halo', emoji: '⭐', color: '#ffff00' },
  },
};

/**
 * Get current equipment based on level
 */
export const getCurrentEquipment = (level: number): CharacterEquipment => {
  // Find highest unlocked weapon
  const weaponLevels = Object.keys(EQUIPMENT_PROGRESSION.weapons)
    .map(Number)
    .filter(l => l <= level)
    .sort((a, b) => b - a);
  const weaponLevel = weaponLevels[0] || 1;

  // Find highest unlocked armor
  const armorLevels = Object.keys(EQUIPMENT_PROGRESSION.armor)
    .map(Number)
    .filter(l => l <= level)
    .sort((a, b) => b - a);
  const armorLevel = armorLevels[0] || 1;

  // Find highest unlocked accessory
  const accessoryLevels = Object.keys(EQUIPMENT_PROGRESSION.accessories)
    .map(Number)
    .filter(l => l <= level)
    .sort((a, b) => b - a);
  const accessoryLevel = accessoryLevels[0] || 5;

  return {
    weapon: EQUIPMENT_PROGRESSION.weapons[weaponLevel as keyof typeof EQUIPMENT_PROGRESSION.weapons].name,
    armor: EQUIPMENT_PROGRESSION.armor[armorLevel as keyof typeof EQUIPMENT_PROGRESSION.armor].name,
    accessory: accessoryLevel >= 5 
      ? EQUIPMENT_PROGRESSION.accessories[accessoryLevel as keyof typeof EQUIPMENT_PROGRESSION.accessories].name 
      : 'None',
  };
};

/**
 * Get equipment details for display
 */
export const getEquipmentDetails = (level: number) => {
  const weaponLevels = Object.keys(EQUIPMENT_PROGRESSION.weapons)
    .map(Number)
    .filter(l => l <= level)
    .sort((a, b) => b - a);
  const weaponLevel = weaponLevels[0] || 1;
  const weapon = EQUIPMENT_PROGRESSION.weapons[weaponLevel as keyof typeof EQUIPMENT_PROGRESSION.weapons];

  const armorLevels = Object.keys(EQUIPMENT_PROGRESSION.armor)
    .map(Number)
    .filter(l => l <= level)
    .sort((a, b) => b - a);
  const armorLevel = armorLevels[0] || 1;
  const armor = EQUIPMENT_PROGRESSION.armor[armorLevel as keyof typeof EQUIPMENT_PROGRESSION.armor];

  const accessoryLevels = Object.keys(EQUIPMENT_PROGRESSION.accessories)
    .map(Number)
    .filter(l => l <= level)
    .sort((a, b) => b - a);
  const accessoryLevel = accessoryLevels[0];
  const accessory = accessoryLevel >= 5
    ? EQUIPMENT_PROGRESSION.accessories[accessoryLevel as keyof typeof EQUIPMENT_PROGRESSION.accessories]
    : null;

  return { weapon, armor, accessory };
};

/**
 * Check if player unlocked new equipment at this level
 */
export const checkNewEquipment = (level: number): {
  hasNew: boolean;
  items: Array<{ type: string; item: any }>;
} => {
  const items = [];

  if (EQUIPMENT_PROGRESSION.weapons[level as keyof typeof EQUIPMENT_PROGRESSION.weapons]) {
    items.push({
      type: 'Weapon',
      item: EQUIPMENT_PROGRESSION.weapons[level as keyof typeof EQUIPMENT_PROGRESSION.weapons],
    });
  }

  if (EQUIPMENT_PROGRESSION.armor[level as keyof typeof EQUIPMENT_PROGRESSION.armor]) {
    items.push({
      type: 'Armor',
      item: EQUIPMENT_PROGRESSION.armor[level as keyof typeof EQUIPMENT_PROGRESSION.armor],
    });
  }

  if (EQUIPMENT_PROGRESSION.accessories[level as keyof typeof EQUIPMENT_PROGRESSION.accessories]) {
    items.push({
      type: 'Accessory',
      item: EQUIPMENT_PROGRESSION.accessories[level as keyof typeof EQUIPMENT_PROGRESSION.accessories],
    });
  }

  return {
    hasNew: items.length > 0,
    items,
  };
};

/**
 * Get next equipment unlock level
 */
export const getNextUnlocks = (level: number): {
  nextWeapon: number | null;
  nextArmor: number | null;
  nextAccessory: number | null;
} => {
  const weaponLevels = Object.keys(EQUIPMENT_PROGRESSION.weapons)
    .map(Number)
    .filter(l => l > level)
    .sort((a, b) => a - b);

  const armorLevels = Object.keys(EQUIPMENT_PROGRESSION.armor)
    .map(Number)
    .filter(l => l > level)
    .sort((a, b) => a - b);

  const accessoryLevels = Object.keys(EQUIPMENT_PROGRESSION.accessories)
    .map(Number)
    .filter(l => l > level)
    .sort((a, b) => a - b);

  return {
    nextWeapon: weaponLevels[0] || null,
    nextArmor: armorLevels[0] || null,
    nextAccessory: accessoryLevels[0] || null,
  };
};
