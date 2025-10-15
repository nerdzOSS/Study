# Authentication Setup Guide

This guide explains how to set up the complete authentication flow with email verification and profile management using Supabase.

## Overview

The authentication system implements the following flow:
1. **User Registration**: Users sign up with email/password and select their role (student/teacher)
2. **Email Verification**: After signup, users receive a verification email
3. **Profile Completion**: Users complete their profile (name, display name, bio)
4. **Email Verification Required**: Users must verify email before they can login
5. **Login**: Once verified, users can login with email/password or biometrics

## Database Setup

### 1. Run the SQL Schema

Execute the schema in your Supabase SQL Editor:

```bash
# The schema file is located at: database/schema.sql
```

This creates:
- **profiles table**: Stores user profile information
- **RLS policies**: Row Level Security for data protection
- **Triggers**: Automatically creates profile on signup
- **Functions**: Handles profile creation and updates

### 2. Verify the Setup

After running the schema, verify:
- Table `public.profiles` exists
- RLS is enabled on the table
- Triggers `on_auth_user_created` and `on_profile_updated` are active
- Function `handle_new_user()` exists

## Supabase Dashboard Configuration

### 1. Enable Email Verification

1. Go to **Authentication** → **Settings** → **Email Auth**
2. **Enable** the "Confirm email" option
3. Set "Confirm email" to **Required**
4. This prevents users from logging in until they verify their email

### 2. Customize Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the "Confirm signup" template
3. You can customize:
   - Subject line
   - Email body
   - Sender name
   - Redirect URL after confirmation

### 3. Configure Email Provider (Optional)

By default, Supabase uses its own email service. For production:
1. Go to **Settings** → **Auth** → **SMTP Settings**
2. Configure your own SMTP provider (SendGrid, AWS SES, etc.)

## Environment Variables

Ensure your `.env` file has the following:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## How the Flow Works

### 1. Signup Process

```typescript
// User fills the signup form
const response = await ApiService.signUp(email, password, userType);

// Behind the scenes:
// 1. Supabase creates auth.users entry
// 2. Trigger automatically creates profiles row
// 3. User receives verification email
// 4. Profile completion modal is shown
```

### 2. Profile Completion

```typescript
// User completes their profile
await ApiService.completeProfile(
  userId,
  firstName,
  lastName,
  displayName,
  bio
);

// Updates the profiles table with user details
```

### 3. Email Verification

- User clicks the verification link in their email
- Supabase marks the email as confirmed
- User can now login

### 4. Login Process

```typescript
// User attempts to login
const response = await ApiService.login(email, password);

// If email not verified:
// - Login fails with error message
// - User is prompted to check email

// If email verified:
// - Session is created
// - Profile is fetched
// - User is redirected to dashboard
```

## Testing the Flow

### Development Testing

1. **Sign up a new user**
   ```typescript
   // Use a real email you can access
   await ApiService.signUp('test@example.com', 'password123', 'student');
   ```

2. **Check your email**
   - Look for the verification email
   - Click the verification link

3. **Try to login before verification**
   - Should fail with "Please verify your email" error

4. **Login after verification**
   - Should succeed and redirect to dashboard

### Production Testing

Before going live:
1. Test the complete signup flow with a real email
2. Verify email templates look correct
3. Test password reset flow
4. Test biometric authentication (if enabled)
5. Verify RLS policies are working correctly

## Security Best Practices

### Row Level Security (RLS)

The profiles table has RLS enabled with these policies:
- Users can only view their own profile
- Users can only update their own profile
- Users can only insert their own profile

### Password Requirements

Current requirements (can be customized in Supabase):
- Minimum 6 characters
- Can be strengthened in Supabase Dashboard

### Biometric Authentication

- Credentials are stored in device's secure storage
- Only accessible after biometric verification
- Can be disabled at any time

## Common Issues

### Issue: "User already registered"

**Solution**: User tried to signup with an email that's already in use. Direct them to login instead.

### Issue: "Please verify your email"

**Solution**: User hasn't clicked the verification link. Resend verification email:

```typescript
await ApiService.resendVerificationEmail(email);
```

### Issue: Profile not found after login

**Solution**: 
1. Check if the trigger `on_auth_user_created` is active
2. Verify the function `handle_new_user()` exists
3. Check if RLS policies allow the user to read their profile

### Issue: Email verification link not working

**Solution**:
1. Check Site URL in Supabase Dashboard (Settings → General)
2. Verify redirect URLs are configured correctly
3. For mobile apps, use deep linking configuration

## API Reference

### ApiService Methods

```typescript
// Sign up
ApiService.signUp(email: string, password: string, userType: UserType)

// Complete profile
ApiService.completeProfile(userId, firstName, lastName, displayName, bio?)

// Login
ApiService.login(email: string, password: string)

// Logout
ApiService.logout()

// Get profile
ApiService.getProfile(userId: string)

// Update profile
ApiService.updateProfile(userId: string, updates: ProfileUpdate)

// Resend verification email
ApiService.resendVerificationEmail(email: string)

// Password reset
ApiService.sendPasswordReset(email: string)
```

### AuthContext Hooks

```typescript
const {
  user,           // Current user object
  session,        // Current session
  isAuthenticated, // Boolean
  isLoading,      // Boolean
  login,          // Login function
  logout,         // Logout function
  loginWithBiometric, // Biometric login
  enableBiometric,    // Enable biometric
  disableBiometric,   // Disable biometric
  refreshProfile,     // Refresh profile data
} = useAuth();
```

## Future Enhancements

- [ ] Social login (Google, GitHub, etc.)
- [ ] Two-factor authentication
- [ ] Phone number verification
- [ ] Profile picture upload
- [ ] Password strength indicator
- [ ] Account deletion

## Support

If you encounter issues:
1. Check Supabase logs in the Dashboard
2. Check console logs in the app
3. Verify database schema is correct
4. Ensure environment variables are set
5. Test with a different email provider

---

Last Updated: October 2024
