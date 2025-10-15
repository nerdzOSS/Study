# 📋 Command Reference

## 🚀 Quick Commands

```bash
# Install all dependencies
npm install

# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web

# Clear cache and restart
npm start --clear

# Install specific packages (if needed)
npm install react-native-url-polyfill
```

## 🧪 Testing Biometric - iOS Simulator

```bash
# 1. Start app
npm run ios

# 2. In simulator menu:
# Features → Face ID → Enrolled

# 3. When testing biometric login:x
# Features → Face ID → Matching Face (for success)
# Features → Face ID → Non-matching Face (for failure)
```

## 🔧 Troubleshooting Commands

```bash
# Clear npm cache
npm cache clean --force

# Reinstall node_modules
rm -rf node_modules && npm install

# Clear Metro bundler cache
npm start --reset-cache

# Clear iOS build
cd ios && rm -rf build && cd ..

# Rebuild pods (iOS)
cd ios && pod install && cd ..

# Clean Android build
cd android && ./gradlew clean && cd ..
```

## 📦 Package Management

```bash
# Check for outdated packages
npm outdated

# Update a specific package
npm update package-name

# Install exact versions
npm install package-name@version --save-exact

# Check installed versions
npm list expo-local-authentication
npm list expo-secure-store
npm list @supabase/supabase-js
```

## 🐛 Debug Commands

```bash
# Open React Native debugger
# In running app, press: Cmd+D (iOS) or Cmd+M (Android)
# Then select "Debug"

# Check Metro bundler logs
npm start -- --verbose

# Check device logs
# iOS: Cmd+Shift+R in simulator
# Android: adb logcat

# Test TypeScript compilation
npx tsc --noEmit
```

## 🔍 Environment Check

```bash
# Check if .env file exists
ls -la | grep .env

# View .env contents (be careful with sensitive data)
cat .env

# Check environment variables are loaded
# In your code, add: console.log(process.env.EXPO_PUBLIC_SUPABASE_URL)
```

## 📱 Simulator/Emulator Commands

```bash
# List iOS simulators
xcrun simctl list devices

# Boot specific iOS simulator
xcrun simctl boot "iPhone 15 Pro"

# List Android emulators
emulator -list-avds

# Start Android emulator
emulator -avd Pixel_7_Pro_API_34

# Reset iOS simulator (clears all data)
xcrun simctl erase all

# Reset Android emulator (wipe data)
emulator -avd YourDeviceName -wipe-data
```

## 🛠️ Development Workflow

```bash
# 1. Make code changes
# 2. Save file (auto-refresh in most cases)

# If changes don't appear, reload app:
# iOS: Cmd+R in simulator
# Android: RR (double R key)

# For major changes, restart metro:
# Ctrl+C to stop
npm start --reset-cache
```

## 📊 Useful Scripts to Add

Add these to your `package.json` scripts:

```json
{
  "scripts": {
    "start": "expo start",
    "ios": "expo start --ios",
    "android": "expo start --android",
    "web": "expo start --web",
    "clean": "rm -rf node_modules && npm install",
    "clean:ios": "cd ios && rm -rf build && pod install && cd ..",
    "clean:android": "cd android && ./gradlew clean && cd ..",
    "test": "jest",
    "lint": "expo lint",
    "type-check": "tsc --noEmit"
  }
}
```

## 🔐 Biometric Testing

```bash
# Test biometric availability (add to component)
# BiometricAuthService.isAvailable()

# Check supported types
# BiometricAuthService.getSupportedTypes()

# View secure store contents (debug only)
# SecureStore.getItemAsync('biometric_enabled')
```

## 📝 Git Commands (if using version control)

```bash
# Don't commit .env file
echo ".env" >> .gitignore

# Check status
git status

# Commit changes
git add .
git commit -m "Add biometric authentication"

# Push to remote
git push origin main
```

## 🎯 Production Build Commands

```bash
# Build for iOS (requires Mac + Xcode)
npm run ios --configuration Release

# Build for Android
cd android
./gradlew assembleRelease
cd ..

# Using EAS Build (Expo Application Services)
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

## 💡 Quick Fixes

```bash
# "Port already in use" error
# Kill process on port 8081:
lsof -ti:8081 | xargs kill

# "Command not found: expo"
npm install -g expo-cli

# "Unable to resolve module"
npm start --reset-cache

# "Network request failed"
# Check .env file exists and has correct values
```

## 🔍 Check Installation Status

```bash
# Verify biometric packages installed
npm list expo-local-authentication expo-secure-store

# Should show:
# ├── expo-local-authentication@~17.0.7
# └── expo-secure-store@~15.0.7

# Verify Supabase installed
npm list @supabase/supabase-js

# Should show:
# └── @supabase/supabase-js@^2.75.0
```

## 🎮 Test Data Commands

```bash
# Clear AsyncStorage (add to your app)
# AsyncStorage.clear()

# Clear SecureStore (add to your app)
# await SecureStore.deleteItemAsync('biometric_enabled')
# await SecureStore.deleteItemAsync('saved_credentials')

# View stored data (debug only)
# const data = await AsyncStorage.getAllKeys()
# console.log('Stored keys:', data)
```

---

## 🚀 Daily Development Workflow

```bash
# Morning startup:
npm start

# If issues:
npm start --reset-cache

# Test biometric:
npm run ios
# Features → Face ID → Enrolled → Matching Face

# Before committing:
npm run lint
npx tsc --noEmit
git add .
git commit -m "Your message"
```

**Most used:** `npm start`, `npm run ios`, `npm run android`

**When stuck:** `npm start --reset-cache` or `rm -rf node_modules && npm install`
