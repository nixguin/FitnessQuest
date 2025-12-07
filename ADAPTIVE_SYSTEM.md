# 🧠 Adaptive Difficulty System

## How It Works

Your app now **learns from your performance** and adapts to keep you motivated!

---

## 📊 Penalty System (Rollover)

### Incomplete Work Carries Over

**If you don't complete your target:**
- The incomplete amount is added to tomorrow's goal
- This continues until you complete the full amount

**Example:**
```
Day 1: Target 20 push-ups, you do 0
  → Tomorrow you owe 20

Day 2: Target 20 + 20 penalty = 40 push-ups, you do 15
  → Tomorrow you owe (40 - 15) = 25

Day 3: Target 20 + 25 penalty = 45 push-ups, you complete all!
  → Penalty cleared! ✅
```

**Visual Indicator:**
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ PUSH-UPS                       ┃
┃ TARGET: 45 REPS                ┃ ← Shows total
┃   (20 + 25 PENALTY)            ┃ ← Breakdown
┃ ⚠️ INCOMPLETE WORK FROM        ┃
┃    PREVIOUS DAYS               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 🎯 Performance Tracking

### The App Watches How You're Doing

**Three performance levels:**

1. **🟢 Good Performance (100%+)**
   - You hit or exceed your target
   - Underperformance counter resets to 0
   - Penalties cleared
   - Keep going! 💪

2. **🟡 Acceptable (75-99%)**
   - You did most of it but not all
   - Incomplete work rolls over
   - Counter doesn't increase
   - You got this!

3. **🔴 Struggling (< 75%)**
   - You completed less than 75% of target
   - Underperformance counter increases
   - Incomplete work rolls over
   - App starts tracking this

---

## 📉 Automatic Difficulty Adjustment

### App Reduces Target After 3 Struggling Days

**When you log < 75% for 3 days in a row:**
- Target automatically decreases by 20%
- Underperformance counter resets
- All penalties cleared
- Fresh start! 🎯

**Example Journey:**
```
Day 1: Target 20, you log 12 (60%) ❌
  → Underperformance: 1/3
  → Penalty: +8 for tomorrow

Day 2: Target 28 (20 + 8), you log 15 (54%) ❌
  → Underperformance: 2/3
  → Penalty: +13 for tomorrow

Day 3: Target 33 (20 + 13), you log 18 (55%) ❌
  → Underperformance: 3/3
  → 🎯 DIFFICULTY ADJUSTED!

Day 4: Target reduced to 16 (20 × 80%)
  → Fresh start, no penalties
  → Counter reset to 0/3
```

**Alert Message:**
```
📉 Difficulty Adjusted

Push-ups target will be reduced.
You've struggled for 3 days - 
let's find the right level!

New target: 16 reps
```

---

## 🎮 Visual Indicators

### Quest Card Colors

**Normal (Cyan border):**
```
┏━━━━━━━━━━━━━━━━━━━━┓ ← Cyan = normal
┃ PUSH-UPS           ┃
┃ TARGET: 20 REPS    ┃
┗━━━━━━━━━━━━━━━━━━━━┛
```

**With Penalty (Orange warning):**
```
┏━━━━━━━━━━━━━━━━━━━━┓
┃ PUSH-UPS           ┃
┃ TARGET: 45 REPS    ┃
┃ ⚠️ INCOMPLETE WORK ┃ ← Orange warning
┗━━━━━━━━━━━━━━━━━━━━┛
```

**Struggling (Red warning):**
```
┏━━━━━━━━━━━━━━━━━━━━┓
┃ PUSH-UPS           ┃
┃ TARGET: 45 REPS    ┃
┃ ⚠️ INCOMPLETE WORK ┃
┃ 📉 STRUGGLING 2/3  ┃ ← Red warning
┗━━━━━━━━━━━━━━━━━━━━┛
```

**Completed (Green):**
```
┏━━━━━━━━━━━━━━━━━━━━┓ ← Green = done!
┃ PUSH-UPS      ✓    ┃
┃ TARGET: 45 REPS    ┃
┃ ✓ COMPLETED: 45    ┃
┗━━━━━━━━━━━━━━━━━━━━┛
```

**Underperformed (Orange border):**
```
┏━━━━━━━━━━━━━━━━━━━━┓ ← Orange = struggling
┃ PUSH-UPS      ✓    ┃
┃ TARGET: 20 REPS    ┃
┃ ✓ COMPLETED: 12    ┃ ← Less than 75%
┗━━━━━━━━━━━━━━━━━━━━┛
```

---

## 💡 Smart Features

### 1. **Penalty Accumulation**
```typescript
Day 1 incomplete: 20 - 0 = 20 penalty
Day 2 incomplete: 20 - 15 = 5 penalty
Total penalty: 20 + 5 = 25

Day 3 target: 20 + 25 = 45 reps
```

### 2. **Performance Ratio**
```typescript
actualAmount / target = performance ratio

Examples:
20 / 20 = 1.00 (100%) ✅ Good
15 / 20 = 0.75 (75%)  🟡 Acceptable
12 / 20 = 0.60 (60%)  ❌ Struggling
```

### 3. **Adaptive Reduction**
```typescript
Current: 20 reps
After 3 struggles: 20 × 0.8 = 16 reps
Minimum: weeklyIncrease × 2

If weekly increase = 5:
Minimum = 5 × 2 = 10 reps
```

---

## 🎯 Strategy Guide

### To Avoid Penalties
1. ✅ Complete your full target daily
2. ✅ Be honest about what you log
3. ✅ Do it early in the day
4. ✅ Break it into sets if needed

### If You Get Penalties
1. 📝 Don't panic - they clear when you complete
2. 💪 Chip away at them gradually
3. 🎯 Focus on consistency over perfection
4. 🔄 Let the system adjust if needed

### If You're Struggling
1. 🆗 It's okay to struggle!
2. 📉 System will auto-adjust after 3 days
3. 🎯 New lower target will be more achievable
4. 💪 Build back up slowly

---

## 📊 Performance Thresholds

| Performance | Ratio | Counter | Penalty | Action |
|------------|-------|---------|---------|--------|
| Excellent  | 100%+ | Reset   | Clear   | Keep going! |
| Good       | 90-99%| Reset   | Small   | Almost there! |
| Acceptable | 75-89%| No change| Medium | Push harder! |
| Struggling | <75%  | +1      | Large   | Tracked |
| Auto-adjust| <75% × 3| Reset  | Clear   | Target reduced |

---

## 🔄 Reset Conditions

**Underperformance counter resets when:**
- ✅ You complete 100%+ of target
- ✅ System auto-adjusts difficulty
- ✅ You manually adjust the exercise

**Penalties clear when:**
- ✅ You complete full target (including penalties)
- ✅ System auto-adjusts difficulty

---

## 🧠 Why This Works

### Psychological Benefits
1. **Accountability** - Can't skip without consequences
2. **Flexibility** - System adapts to your reality
3. **Motivation** - Clear path to success
4. **No Shame** - Auto-adjusts if you're struggling
5. **Honesty** - Rewards accurate logging

### Training Benefits
1. **Consistency** - Encourages daily completion
2. **Progressive** - Still increases weekly
3. **Sustainable** - Adjusts to prevent burnout
4. **Realistic** - Finds your true capability
5. **Recovery** - Reduces load when needed

---

## 📱 User Experience

### Good Day Example
```
✅ Completed 20/20 push-ups
No penalties tomorrow
Counter reset
Keep it up! 💪
```

### Partial Day Example
```
📝 Completed 15/20 push-ups
5 reps roll over to tomorrow
Tomorrow's target: 25 reps
You can do this!
```

### Struggling Example
```
📉 Completed 12/20 push-ups (60%)
Underperformance: 1/3
8 reps roll over to tomorrow
Tomorrow's target: 28 reps
2 more struggles = auto-adjust
```

### Auto-Adjust Example
```
📉 Difficulty Adjusted
You struggled for 3 days
New target: 16 reps
Penalties cleared
Fresh start! 🎯
```

---

## 🎮 Game Design Philosophy

This system is inspired by:
- 🎯 **Adaptive Difficulty** (Resident Evil 4)
- 📊 **Performance Metrics** (Fitness games)
- 🔄 **Debt System** (Animal Crossing)
- 🧠 **Learning Algorithms** (AI trainers)
- ⚖️ **Balance** (Keeps it challenging but fair)

---

**The app now learns and adapts to YOU! 🧠💪**

No more arbitrary targets - it finds YOUR level!
