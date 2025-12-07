# Changelog

All notable changes to Fitness Quest App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-05

### 🎉 Initial Release

#### Added
- **Daily Quest System**
  - View and complete daily exercises
  - Mark exercises as complete with checkmarks
  - Input actual amounts completed
  - Visual quest cards with exercise details

- **Progressive Overload System**
  - Automatic weekly target increases
  - Customizable progression rates
  - Difficulty level system
  - Level up mechanism when max target reached
  - Smart progression algorithm

- **Exercise Management**
  - Quick add templates (Push-ups, Running, Pull-ups)
  - Custom exercise creation
  - Exercise deletion
  - Display of current targets and difficulty levels

- **Progress Tracking**
  - Level system with EXP
  - Visual EXP progress bar
  - Current streak tracking
  - Longest streak tracking
  - Total days completed counter
  - 100 EXP reward per completed quest

- **Data Persistence**
  - AsyncStorage integration
  - Local data storage
  - Automatic data loading
  - No backend required

- **User Interface**
  - Dark theme inspired by Solo Leveling
  - Modern, clean design
  - Responsive layout
  - Modal dialogs for exercise creation
  - Color-coded completion states
  - Intuitive navigation

- **TypeScript Support**
  - Full type safety
  - Interface definitions for all data models
  - Type-safe storage utilities

### Technical Details

**Dependencies:**
- React Native 0.81.5
- Expo SDK ~54.0.27
- TypeScript ~5.9.2
- @react-native-async-storage/async-storage ^2.2.0

**Architecture:**
- Screen-based navigation
- Utility-based code organization
- Type-safe data models
- Separation of concerns

**Data Models:**
- Exercise: Core exercise definition
- DailyQuest: Daily quest instance
- QuestExercise: Exercise within a quest
- UserProgress: User statistics and progress

### Known Limitations
- Cannot edit exercises after creation
- Cannot add exercises after initial setup
- No rest day management
- No cloud sync
- No Strava integration yet
- Web version has limited functionality

### Future Plans
See [FEATURES_ROADMAP.md](./FEATURES_ROADMAP.md) for planned features.

---

## [Unreleased]

### Planned for v1.1.0
- Edit existing exercises
- Add exercises after initial setup
- Exercise notes
- Data export/import
- Bug fixes and performance improvements

---

## Version History

- **v1.0.0** (2025-12-05) - Initial release with core functionality
- **v1.1.0** (TBD) - Exercise editing and enhancements
- **v1.2.0** (Q1 2026) - Analytics and visualizations
- **v1.3.0** (Q2 2026) - Strava integration
- **v2.0.0** (2027) - Complete fitness platform

---

### Notes

**Progressive Overload Logic:**
- Checks for progression every 7 days from exercise creation
- Increases target by specified weekly increase amount
- When max target reached:
  - Difficulty level increases by 1
  - New starting target: 60% of previous max
  - New max target: 150% of previous max

**Level System:**
- 500 EXP per level
- 100 EXP per completed daily quest
- Level displayed prominently in UI

**Streak Calculation:**
- Increases by 1 for each consecutive day completed
- Resets to 0 if a day is missed
- Longest streak preserved

---

For detailed usage instructions, see [USER_GUIDE.md](./USER_GUIDE.md)

For quick start, see [QUICK_START.md](./QUICK_START.md)
