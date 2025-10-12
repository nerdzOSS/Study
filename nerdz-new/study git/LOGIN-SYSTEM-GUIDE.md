# Login System with Role-Based Redirect 🔐

## Overview
The login system now supports role-based authentication with automatic redirects:
- **Students** → `student-dashboard.html`
- **Teachers** → `teachers.html`

## Files Modified/Created

### 1. ✅ `login.js` - Updated
**Features Added:**
- Loading state with spinner animation
- Role-based redirect logic
- LocalStorage session management
- Login timestamp tracking
- Better error handling

### 2. ✅ `auth-check.js` - New File
**Features:**
- Automatic login verification
- Role-based access control
- Logout functionality
- User info display

## How It Works

### Login Flow:

```
1. User visits login.html
   ↓
2. User selects role (Student/Teacher)
   ↓
3. User enters credentials
   ↓
4. Form submits → Shows loading spinner
   ↓
5. Credentials stored in localStorage
   ↓
6. Redirect based on role:
   - Student → student-dashboard.html
   - Teacher → teachers.html
```

### Authentication Check Flow:

```
1. User visits dashboard page
   ↓
2. auth-check.js runs automatically
   ↓
3. Checks if user is logged in
   ↓
4. Checks if user has correct role
   ↓
5. If valid → Allow access
   If invalid → Redirect to login
```

## Implementation Guide

### Step 1: Add to Dashboard Pages

Add this to **student-dashboard.html**, **teachers.html**, and any protected pages:

```html
<head>
    <!-- Other head content -->
    <script src="auth-check.js"></script>
</head>
```

Place it **BEFORE** any other scripts to ensure authentication runs first.

### Step 2: Add Logout Button

Add a logout button to your navigation or settings:

```html
<!-- Method 1: Using data attribute -->
<button data-logout>Logout</button>

<!-- Method 2: Using class -->
<button class="logout-btn">Logout</button>

<!-- Method 3: Using ID -->
<button id="logoutBtn">Logout</button>
```

All three methods will work automatically!

### Step 3: Optional - Display User Info

Add elements to show user information:

```html
<span class="user-email"></span>
```

The script will automatically populate it with the logged-in user's email.

## Features

### ✨ Login Features
- [x] Role selection (Student/Teacher)
- [x] Email and password validation
- [x] Remember me checkbox
- [x] Password visibility toggle
- [x] Loading state with spinner
- [x] Automatic redirect
- [x] Session persistence
- [x] Theme preference saved

### 🔒 Security Features
- [x] Login required for dashboards
- [x] Role-based access control
- [x] Automatic redirect if wrong role
- [x] Logout functionality
- [x] Session management

### 🎨 UX Features
- [x] Loading spinner on login
- [x] Smooth transitions
- [x] Console logging for debugging
- [x] Confirmation on logout
- [x] Error prevention

## Data Stored in LocalStorage

### After Login:
```javascript
{
  "userData": {
    "email": "user@example.com",
    "userType": "student",
    "remember": true,
    "loginTime": "2024-10-08T12:34:56.789Z"
  },
  "isLoggedIn": "true",
  "theme": "dark"
}
```

## Testing the System

### Test as Student:
1. Open `login.html`
2. Select **Student** role
3. Enter any email/password
4. Click Sign In
5. Should redirect to `student-dashboard.html`

### Test as Teacher:
1. Open `login.html`
2. Select **Teacher** role
3. Enter any email/password
4. Click Sign In
5. Should redirect to `teachers.html`

### Test Authentication:
1. Try to directly access `student-dashboard.html` without logging in
2. Should redirect to `login.html`
3. Login as teacher
4. Try to access `student-dashboard.html`
5. Should redirect back to `teachers.html`

## Console Messages

You'll see these messages in the browser console:

**On Login:**
```
✅ Redirecting to Student Dashboard...
```
or
```
✅ Redirecting to Teacher Dashboard...
```

**On Dashboard Access:**
```
✅ Authenticated as: student
📧 Email: user@example.com
🕐 Login time: 10/8/2024, 12:34:56 PM
```

**On Logout:**
```
👋 Logged out successfully
```

## Logout Implementation

### JavaScript:
```javascript
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
}
```

### HTML Button:
```html
<button onclick="logout()">Logout</button>
```

## Customization

### Change Redirect Delay:
In `login.js`, change the timeout value:
```javascript
setTimeout(() => {
    // redirect logic
}, 1000); // Change 1000 to desired milliseconds
```

### Add More Roles:
In `login.html`, add new role button:
```html
<button class="user-type-btn" data-type="admin">
    <span class="user-type-icon">👑</span>
    <span>Admin</span>
</button>
```

In `login.js`, add redirect logic:
```javascript
else if (selectedUserType === 'admin') {
    window.location.href = 'admin-dashboard.html';
}
```

## Troubleshooting

**Q: Login button doesn't work?**
A: Check that `login.js` is loaded at the end of `<body>`

**Q: Not redirecting?**
A: Check console for errors and verify file paths are correct

**Q: Can access dashboard without login?**
A: Make sure `auth-check.js` is loaded in the dashboard page `<head>`

**Q: Spinner not showing?**
A: The animation CSS is injected automatically, check browser console for errors

**Q: Logout not working?**
A: Ensure button has one of these: `data-logout`, `class="logout-btn"`, or `id="logoutBtn"`

## Security Notes

⚠️ **Important:** This is a frontend-only demo system. For production:

1. **Never store passwords** in localStorage
2. **Use proper backend authentication** (JWT, OAuth, etc.)
3. **Implement HTTPS** for all requests
4. **Use secure session management**
5. **Add CSRF protection**
6. **Implement rate limiting**
7. **Add proper validation** on backend
8. **Hash passwords** properly

## Next Steps

1. ✅ Add `auth-check.js` to all dashboard pages
2. ✅ Add logout buttons to navigation
3. ✅ Test both student and teacher flows
4. ⬜ Connect to real backend API
5. ⬜ Add password reset functionality
6. ⬜ Add email verification
7. ⬜ Add 2FA (Two-Factor Authentication)

## Browser Compatibility

✅ Chrome/Edge (Latest)
✅ Firefox (Latest)
✅ Safari (Latest)
✅ Mobile Browsers

## Demo Credentials

For testing, any email/password combination works since this is a frontend demo.

**Example:**
- Email: `student@nerdz.com`
- Password: `anything`

---

**Your login system is now fully functional! 🎉**

Users can select their role, login, and be automatically redirected to the correct dashboard based on their role selection.
