# 🎮 Fitness Quest App - Solo Leveling Inspired Tracker

A fitness tracking app inspired by Solo Leveling's daily quest system. Track your exercises, achieve daily goals, and level up through progressive overload!

## ✨ Features

### 🎯 Daily Quest System
- Track daily exercise completion with checkmarks
- Visual progress tracking with level, streak, and EXP
- Beautiful dark theme UI inspired by Solo Leveling

### 💪 Progressive Overload
- **Automatic weekly progression** - Your targets increase every week
- **Difficulty levels** - When you reach your max target (e.g., 100 push-ups), unlock a new difficulty level
- **Customizable progression** - Set your own weekly increases and max targets

### 🏋️ Exercise Management
- **Quick add templates**: Push-ups, Running, Pull-ups
- **Custom exercises**: Add any exercise with custom units (reps, miles, minutes, etc.)
- **Multiple exercises**: Track as many exercises as you want daily

### 📊 Progress Tracking
- **Level system** with EXP (100 EXP per completed quest)
- **Streak tracking** - Keep your daily completion streak alive
- **Total days completed** counter

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your phone (for mobile testing)

### Installation

1. **Install dependencies:**
   ```bash
   cd "Fitness App"
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on your device:**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## 📱 How to Use

### First Time Setup
1. **Add your exercises** - Choose from quick templates or create custom ones
   - Push-ups: Starts at 20, increases by 5/week, max 100
   - Running: Starts at 1 mile, increases by 0.5/week, max 5 miles
   - Pull-ups: Starts at 5, increases by 2/week, max 30
   - Custom: Set your own parameters

2. **Set progression rules**:
   - **Starting target**: Your initial goal
   - **Weekly increase**: How much to add each week
   - **Max target**: When reached, you level up to a new difficulty

3. **Start Training** - Begin your daily quest!

### Daily Usage
1. Open the app to see today's quest
2. Complete each exercise and enter the amount
3. Tap the circle button to mark it complete
4. Complete all exercises to finish the daily quest
5. Earn 100 EXP and increase your streak!

### Progressive Overload System
- Every **7 days**, your targets automatically increase
- When you reach your **max target** (e.g., 100 push-ups):
  - 🎉 **Level up** to next difficulty
  - Get a new, higher max target
  - Start at 60% of previous max for the new level
  - Max target increases by 50%

Example progression:
```
Week 1: 20 push-ups → Week 2: 25 → ... → Week 16: 100
🎉 LEVEL UP to Difficulty 2! 🎉
Week 17: 60 push-ups (new starting point) → ... → Max: 150
```

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tooling
- **TypeScript** - Type-safe JavaScript
- **AsyncStorage** - Local data persistence

## 📁 Project Structure

```
fitness-quest-app/
├── screens/
│   ├── ExerciseSetupScreen.tsx    # Initial setup & exercise management
│   └── DailyQuestScreen.tsx       # Main daily quest interface
├── types/
│   └── index.ts                   # TypeScript type definitions
├── utils/
│   ├── storage.ts                 # AsyncStorage functions
│   ├── progressiveOverload.ts     # Progression logic
│   └── dateUtils.ts               # Date helper functions
└── App.tsx                        # Main app component
```

## 🎨 Customization

### Adding Custom Exercises
1. Tap "Add Custom Exercise"
2. Fill in:
   - Exercise name (e.g., "Squats")
   - Starting target (e.g., 30)
   - Unit (e.g., "reps")
   - Weekly increase (e.g., 5)
   - Max target before level up (e.g., 100)

### Modifying Templates
Edit `ExerciseSetupScreen.tsx` to change quick add templates:
```typescript
const templates = {
  pushups: {
    name: 'Push-ups',
    currentTarget: 20,     // Starting amount
    unit: 'reps',
    weeklyIncrease: 5,     // Weekly progression
    maxTarget: 100,        // Level up threshold
  },
  // Add more templates...
};
```

## 🔮 Future Features (Roadmap)

- ✅ Basic daily quest tracking
- ✅ Progressive overload system
- ✅ Difficulty levels
- ⏳ **Strava integration** for running
- ⏳ Calendar view of completed quests
- ⏳ Detailed statistics and graphs
- ⏳ Social features & challenges
- ⏳ Rewards & achievement system
- ⏳ Rest day management
- ⏳ Notification reminders

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this for your own fitness journey!

## 💡 Inspiration

Inspired by the manhwa/anime "Solo Leveling" (나 혼자만 레벨업) where the protagonist Sung Jin-Woo receives daily quests to train and level up.

---

**Start your journey to become stronger every day! 💪⚡**
