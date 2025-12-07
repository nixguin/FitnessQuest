# 📂 Project File Structure

```
Fitness App/
│
├── 📱 CORE APP FILES
│   ├── App.tsx                      # Main app entry point
│   ├── app.json                     # Expo configuration
│   ├── index.ts                     # App index
│   ├── tsconfig.json                # TypeScript config
│   ├── package.json                 # Dependencies & scripts
│   └── .gitignore                   # Git ignore rules
│
├── 📖 DOCUMENTATION (START HERE!)
│   ├── START_HERE.md                # ⭐ READ THIS FIRST!
│   ├── QUICK_START.md               # 5-minute setup guide
│   ├── README.md                    # Complete feature overview
│   ├── USER_GUIDE.md                # Detailed usage instructions
│   ├── PROJECT_SUMMARY.md           # What was built & why
│   ├── FEATURES_ROADMAP.md          # Future features & plans
│   └── CHANGELOG.md                 # Version history
│
├── 📱 screens/                      # UI Screens
│   ├── ExerciseSetupScreen.tsx     # Initial setup - add exercises
│   └── DailyQuestScreen.tsx        # Main screen - daily quests
│
├── 🏗️ types/                        # TypeScript Types
│   └── index.ts                     # Type definitions
│       ├── Exercise                 # Exercise model
│       ├── DailyQuest              # Quest model
│       ├── QuestExercise           # Quest exercise model
│       └── UserProgress            # Progress model
│
├── 🛠️ utils/                        # Utility Functions
│   ├── storage.ts                   # AsyncStorage operations
│   │   ├── saveExercises()
│   │   ├── getExercises()
│   │   ├── saveDailyQuest()
│   │   ├── getDailyQuests()
│   │   ├── getTodayQuest()
│   │   ├── saveUserProgress()
│   │   └── getUserProgress()
│   │
│   ├── progressiveOverload.ts       # Progressive overload logic
│   │   ├── calculateNextWeekTarget()
│   │   ├── shouldLevelUp()
│   │   ├── levelUpExercise()
│   │   ├── progressExerciseWeekly()
│   │   └── isProgressionDay()
│   │
│   └── dateUtils.ts                 # Date helper functions
│       ├── getTodayString()
│       ├── formatDateToString()
│       ├── parseStringToDate()
│       ├── isSameDay()
│       ├── getDaysAgo()
│       └── daysBetween()
│
├── 🎨 assets/                       # Images & Icons
│   ├── icon.png                     # App icon
│   ├── splash-icon.png              # Splash screen
│   ├── adaptive-icon.png            # Android adaptive icon
│   └── favicon.png                  # Web favicon
│
└── 📦 node_modules/                 # Dependencies (auto-generated)
    ├── expo
    ├── react-native
    ├── @react-native-async-storage/async-storage
    └── ... (697 packages)
```

---

## 📄 Key Files Explained

### 🎯 App Entry Point

**`App.tsx`** - Main component

- Checks if exercises are setup
- Shows ExerciseSetupScreen or DailyQuestScreen
- Handles app-wide state

### 🖥️ Screens

**`ExerciseSetupScreen.tsx`** - First-time setup

- Quick add templates (Push-ups, Running, Pull-ups)
- Custom exercise creation
- Exercise list with delete option
- Modal for adding exercises

**`DailyQuestScreen.tsx`** - Main app screen

- Daily quest list
- Exercise completion tracking
- Progress stats (Level, Streak, Total Days)
- EXP bar visualization
- Progressive overload notifications

### 🏗️ Data Models

**`types/index.ts`** - All TypeScript types

```typescript
Exercise {
  id, name, type, currentTarget, unit,
  weeklyIncrease, maxTarget, difficulty, createdAt
}

DailyQuest {
  id, date, exercises[], completed, completedAt?
}

QuestExercise {
  exerciseId, exerciseName, target, unit,
  completed, actualAmount?
}

UserProgress {
  totalDaysCompleted, currentStreak,
  longestStreak, level, exp
}
```

### 🛠️ Utilities

**`storage.ts`** - Data persistence

- Save/load exercises
- Save/load daily quests
- Save/load user progress
- Uses AsyncStorage (local storage)

**`progressiveOverload.ts`** - Core logic

- Calculate weekly progression
- Determine level ups
- Handle difficulty increases
- Check if progression day

**`dateUtils.ts`** - Date helpers

- Format dates consistently
- Calculate date differences
- Get today's date string

---

## 🎨 UI Components Breakdown

### ExerciseSetupScreen Components:

```
┌─────────────────────────────────┐
│ ⚔️ Setup Your Daily Quest      │ ← Title
│ Create your training regimen    │ ← Subtitle
├─────────────────────────────────┤
│ Quick Add:                      │
│ [💪] [🏃] [🏋️]                 │ ← Quick buttons
├─────────────────────────────────┤
│ Your Exercises:                 │
│ ┌─────────────────────────────┐ │
│ │ Push-ups            [×]     │ │ ← Exercise card
│ │ Target: 20 reps            │ │
│ │ Weekly +5 | Max: 100       │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ [+ Add Custom Exercise]         │ ← Add button
│ [Start Training ⚡]             │ ← Complete button
└─────────────────────────────────┘
```

### DailyQuestScreen Components:

```
┌─────────────────────────────────┐
│ ⚔️ Daily Quest                  │ ← Title
│ 2025-12-05                      │ ← Date
├─────────────────────────────────┤
│ Level │ Streak 🔥 │ Total Days │ ← Stats
│   1   │     5     │     12     │
├─────────────────────────────────┤
│ [████████░░] 300/500 EXP        │ ← Progress bar
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ Push-ups              [○]   │ │ ← Quest card
│ │ Target: 20 reps            │ │
│ │ Difficulty Level 1         │ │
│ │ Completed: [20] reps       │ │ ← Input
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

---

## 🔄 Data Flow

### App Launch:

```
1. App.tsx loads
2. Checks for existing exercises
3. If none → ExerciseSetupScreen
4. If exist → DailyQuestScreen
```

### Exercise Setup:

```
User Action → State Update → AsyncStorage Save
   ↓              ↓                ↓
Add Exercise → exercises[] → saveExercises()
```

### Daily Quest Flow:

```
1. Load exercises from storage
2. Check for today's quest
3. If none, create new quest
4. Display quest with inputs
5. User marks complete
6. Update quest + progress
7. Save to storage
```

### Progressive Overload:

```
App Launch
   ↓
Check each exercise creation date
   ↓
If 7 days passed → Calculate new target
   ↓
If max reached → Level up!
   ↓
Update exercise in storage
   ↓
Show notification
```

---

## 📊 Data Storage

All data stored locally using AsyncStorage:

```
@fitness_quest_exercises
└── Exercise[]

@fitness_quest_daily_quests
└── DailyQuest[]

@fitness_quest_user_progress
└── UserProgress
```

No internet required! Works offline.

---

## 🎨 Color Scheme

```css
/* Dark Theme - Solo Leveling Inspired */
Background:       #0a0e27  /* Deep blue-black */
Secondary BG:     #1a1f3a  /* Lighter blue-black */
Borders:          #2a3f5f  /* Subtle blue */
Primary (Blue):   #4a9eff  /* Bright blue */
Text Primary:     #ffffff  /* White */
Text Secondary:   #888888  /* Gray */
Success:          #4a9eff  /* Blue */
Error:            #ff4444  /* Red */
```

---

## 🚀 Build Commands

```bash
# Development
npm start              # Start Expo dev server
npm run android        # Run on Android
npm run ios            # Run on iOS
npm run web            # Run in browser

# Dependencies
npm install            # Install packages
npm install <pkg>      # Add new package

# Troubleshooting
npm start -- --reset-cache    # Clear cache
```

---

## 📱 App Size & Performance

**Development Build:**

- App bundle: ~30 MB (with all dependencies)
- Load time: ~2-3 seconds

**Production Build (future):**

- Optimized: ~15-20 MB
- Load time: ~1 second

---

## 🔮 Extensibility

Easy to add new features:

1. **New Screen**: Create in `screens/`
2. **New Utility**: Add to `utils/`
3. **New Type**: Define in `types/`
4. **New Storage**: Extend `storage.ts`

Example - Add Settings Screen:

```typescript
// screens/SettingsScreen.tsx
export default function SettingsScreen() {
  // Your settings UI
}

// App.tsx - add navigation logic
{
  showSettings && <SettingsScreen />;
}
```

---

## 📦 Dependencies Explained

```json
{
  "expo": "~54.0.27", // Expo framework
  "react": "19.1.0", // React library
  "react-native": "0.81.5", // React Native
  "@react-native-async-storage/async-storage": "^2.2.0", // Storage
  "expo-status-bar": "~3.0.9", // Status bar control
  "typescript": "~5.9.2" // TypeScript
}
```

Total packages: 697 (including all dependencies)

---

This structure is designed for:
✅ Easy navigation
✅ Clear separation of concerns
✅ Type safety throughout
✅ Easy to extend
✅ Well documented

Ready to explore the code? Start with `App.tsx`! 🚀
