# 🚀 Quick Start Guide

## Running Your Fitness Quest App

### Option 1: Expo Go (Recommended for Testing)

1. **Install Expo Go on your phone:**

   - [Android - Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Start the development server:**

   ```bash
   cd "Fitness App"
   npm start
   ```

3. **Scan the QR code:**

   - **Android**: Use the Expo Go app to scan
   - **iOS**: Use your Camera app to scan, then open in Expo Go

4. **Start using the app!** 🎉

### Option 2: Android Emulator

1. **Install Android Studio** and set up an emulator
2. **Start the emulator**
3. **Run:**
   ```bash
   npm run android
   ```

### Option 3: iOS Simulator (Mac Only)

1. **Install Xcode** from the App Store
2. **Run:**
   ```bash
   npm run ios
   ```

### Option 4: Web Browser (Limited Features)

```bash
npm run web
```

⚠️ Note: AsyncStorage and some mobile features may not work fully in web mode.

## First Time Setup in App

### Step 1: Add Your First Exercise

**Option A - Quick Add (Recommended for beginners):**

- Tap "💪 Push-ups" - Starts at 20, progresses to 100
- Perfect for getting started quickly!

**Option B - Custom Exercise:**

1. Tap "+ Add Custom Exercise"
2. Fill in the form:
   ```
   Exercise Name: Squats
   Starting Target: 30
   Unit: reps
   Weekly Increase: 5
   Max Target: 100
   ```
3. Tap "Add"

### Step 2: Add More Exercises (Optional)

Add 2-3 exercises for a complete daily routine:

- Upper body: Push-ups, Pull-ups
- Cardio: Running
- Lower body: Squats
- Core: Planks

### Step 3: Start Training

Tap "Start Training ⚡" to begin your fitness journey!

## Your First Day

1. **View your daily quest** - See all exercises for today
2. **Complete an exercise** - Do your push-ups!
3. **Log your progress:**
   - Enter amount in the input field (e.g., "20")
   - Tap the circle to mark complete ✓
4. **Repeat** for all exercises
5. **Celebrate!** 🎉 Complete all tasks to finish the quest

## What Happens Next?

- **Tomorrow**: New quest with same targets
- **Next Week**: Targets increase automatically (e.g., 20→25)
- **Week 16**: Reach 100 push-ups → **LEVEL UP** to Difficulty 2!
- **Continue forever**: Keep leveling up indefinitely

## Troubleshooting

### "Cannot find module" error

```bash
npm install
```

### "Metro bundler not starting"

```bash
npm start -- --reset-cache
```

### App crashes on launch

1. Close the app completely
2. Stop the development server (Ctrl+C)
3. Restart with `npm start`

### Changes not reflecting

- Shake your phone → "Reload"
- Or press `r` in the terminal

## Development Commands

```bash
# Start development server
npm start

# Start with cache cleared
npm start -- --reset-cache

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Run in web browser
npm run web

# Install new packages
npm install <package-name>
```

## File Structure Overview

```
Fitness App/
├── screens/              # App screens
│   ├── ExerciseSetupScreen.tsx
│   └── DailyQuestScreen.tsx
├── types/               # TypeScript types
│   └── index.ts
├── utils/               # Helper functions
│   ├── storage.ts
│   ├── progressiveOverload.ts
│   └── dateUtils.ts
├── App.tsx              # Main app entry
├── package.json         # Dependencies
└── README.md           # Full documentation
```

## Next Steps

1. ✅ **Run the app** using Expo Go
2. ✅ **Add 2-3 exercises** to start with
3. ✅ **Complete your first daily quest**
4. ✅ **Come back tomorrow** to maintain your streak
5. ✅ **Watch yourself progress** week by week

## Need Help?

- 📖 Read the full [README.md](./README.md)
- 📚 Check out [USER_GUIDE.md](./USER_GUIDE.md) for detailed instructions
- 🐛 Found a bug? The code is open for you to fix!

---

**Ready to start your leveling journey? Let's go! 💪⚡**
