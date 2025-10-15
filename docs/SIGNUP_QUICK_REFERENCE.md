# Signup Flow - Quick Reference

## 📋 Pre-Setup Checklist

Before testing the signup flow, complete these steps:

### 1. Database Setup
- [ ] Run `database/schema.sql` in Supabase SQL Editor
- [ ] Verify `profiles` table exists
- [ ] Check that trigger `on_auth_user_created` is active

### 2. Supabase Dashboard Configuration
- [ ] Authentication → Settings → Email Auth → Enable "Confirm email"
- [ ] Verify Site URL is correct (Settings → General)
- [ ] (Optional) Customize email templates

### 3. Environment Variables
- [ ] `.env` file has `EXPO_PUBLIC_SUPABASE_URL`
- [ ] `.env` file has `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## 🔄 Complete Signup Flow

### Step 1: User Signs Up
```
User enters:
- Email
- Password
- User Type (student/teacher)
- Agrees to terms

→ Clicks "Create Account"
```

**What happens:**
1. `ApiService.signUp()` is called
2. Supabase creates auth entry
3. Trigger auto-creates profile row with `user_type`
4. Verification email is sent
5. Profile completion modal opens

### Step 2: Profile Completion
```
User enters:
- First Name *
- Last Name *
- Display Name *
- Bio (optional)

→ Clicks "Complete Profile"
```

**What happens:**
1. `ApiService.completeProfile()` is called
2. Profile row is updated with user details
3. Success message shown
4. (Optional) Biometric setup prompt
5. Redirected to login

### Step 3: Email Verification
```
User checks email
→ Clicks verification link
→ Email is confirmed in Supabase
```

**What happens:**
1. User is redirected to app (or web)
2. `email_confirmed_at` is set in auth.users
3. User can now login

### Step 4: Login
```
User enters:
- Email
- Password

→ Clicks "Sign In"
```

**What happens:**
1. `ApiService.login()` is called
2. Email verification is checked
3. If verified: Session created, profile fetched, redirected to dashboard
4. If not verified: Error shown with reminder

## 🧪 Testing Steps

### 1. Test Signup
```typescript
// Use a real email you can access
Email: your-email@example.com
Password: password123
User Type: Student
```

### 2. Complete Profile
```typescript
First Name: John
Last Name: Doe
Display Name: johndoe
Bio: I love learning!
```

### 3. Check Email
- Open your email inbox
- Look for "Confirm Your Email" from Supabase
- Click the verification link

### 4. Try Login Before Verification
- Attempt to login with the same credentials
- **Expected**: Error message "Please verify your email..."

### 5. Login After Verification
- Click verification link in email
- Return to app and login
- **Expected**: Success! Redirected to dashboard

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "User already registered" | Email is already in use. Use login instead or different email |
| "Please verify your email" | User hasn't clicked verification link. Check email/spam folder |
| Profile not showing | Check if trigger is active and RLS policies allow reading |
| Email not received | Check Supabase Email settings, verify SMTP config |
| Modal doesn't show | Check console for errors, verify ApiService.signUp() returns user |

## 📝 Code Snippets

### Using in Components

```typescript
// In any component
import { useAuth } from '@/contexts/AuthContext';
import { ApiService } from '@/services/api';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleSignup = async () => {
    const response = await ApiService.signUp(email, password, 'student');
    // Show profile modal
  };

  const handleLogin = async () => {
    await login(email, password);
    // Will redirect via AuthContext
  };
}
```

### Checking Auth State

```typescript
const { user, isAuthenticated } = useAuth();

if (isAuthenticated && user) {
  // User is logged in
  console.log('Logged in as:', user.email);
  console.log('User type:', user.userType);
  console.log('Profile:', user.profile);
}
```

### Getting Profile Data

```typescript
const { user, refreshProfile } = useAuth();

// Access profile
const displayName = user?.profile?.display_name;
const bio = user?.profile?.bio;

// Refresh profile after update
await refreshProfile();
```

## 🔐 Security Notes

1. **Email verification is enforced** - Users cannot login without verifying
2. **RLS is enabled** - Users can only see/update their own profiles
3. **Passwords are hashed** - Supabase handles password security
4. **Biometric credentials** - Stored in device's secure storage
5. **Session tokens** - Auto-refresh handled by Supabase

## 📱 User Experience Flow

```
┌─────────────┐
│   Signup    │
│   Screen    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Profile   │
│  Completion │
│   Modal     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Email Sent │
│   Message   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Email    │
│ Verification│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Login    │
│   Screen    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Dashboard  │
└─────────────┘
```

## 🚀 Next Steps

After implementing the basic flow:
1. Add profile picture upload
2. Implement social login (Google, GitHub)
3. Add password strength indicator
4. Implement password reset flow
5. Add two-factor authentication
6. Create account deletion flow

---

**Need Help?** Check `AUTHENTICATION_SETUP.md` for detailed documentation.
