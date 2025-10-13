# Login System - Quick Reference Card 🚀

## 🔐 How Users Login

### Student Login:
1. Go to `login.html`
2. Click **Student** button (🎓)
3. Enter email & password
4. Click **Sign In**
5. → Redirects to `student-dashboard.html`

### Teacher Login:
1. Go to `login.html`
2. Click **Teacher** button (👨‍🏫)
3. Enter email & password
4. Click **Sign In**
5. → Redirects to `teachers.html`

## ⚡ Quick Setup Checklist

### For Any Protected Page:

```html
<head>
    <!-- Add this line at the TOP of <head> -->
    <script src="auth-check.js"></script>
    
    <!-- Rest of your head content -->
    <link rel="stylesheet" href="style.css">
</head>
```

### Add Logout Button:

```html
<!-- Any of these will work: -->
<button data-logout>Logout</button>
<button class="logout-btn">Logout</button>
<button id="logoutBtn">Logout</button>
```

## 📋 Files You Need

| File | Purpose | Status |
|------|---------|--------|
| `login.html` | Login page | ✅ Ready |
| `login.js` | Login logic | ✅ Updated |
| `login.css` | Login styles | ✅ Ready |
| `auth-check.js` | Auth protection | ✅ Created |

## 🎯 What Each File Does

### `login.js`
- Handles form submission
- Shows loading spinner
- Stores user data
- Redirects based on role

### `auth-check.js`
- Checks if user is logged in
- Verifies user has correct role
- Auto-redirects if not authenticated
- Handles logout functionality

## 🔄 User Flow Diagram

```
┌─────────────┐
│ login.html  │
└──────┬──────┘
       │
   [Select Role]
       │
   [Enter Creds]
       │
   [Click Login]
       │
       ├──── Student? ──→ student-dashboard.html
       │
       └──── Teacher? ──→ teachers.html
```

## 💾 What's Stored

```javascript
localStorage = {
  "isLoggedIn": "true",
  "userData": {
    "email": "user@example.com",
    "userType": "student",
    "remember": true,
    "loginTime": "2024-10-08..."
  }
}
```

## 🧪 Testing

### Test Student Login:
```
1. Open login.html
2. Select "Student"
3. Enter: test@student.com / password123
4. Should go to: student-dashboard.html
```

### Test Teacher Login:
```
1. Open login.html
2. Select "Teacher"
3. Enter: test@teacher.com / password123
4. Should go to: teachers.html
```

### Test Protection:
```
1. Clear localStorage (F12 → Application → Clear)
2. Try to open student-dashboard.html directly
3. Should redirect to: login.html
```

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| Not redirecting | Check console for errors |
| Can access without login | Add `auth-check.js` to page |
| Logout doesn't work | Check button has correct attribute |
| Spinner not showing | Check browser console |

## 📞 Quick Commands

### Clear All Data (Console):
```javascript
localStorage.clear();
```

### Check Login Status (Console):
```javascript
console.log(localStorage.getItem('isLoggedIn'));
```

### See User Data (Console):
```javascript
console.log(JSON.parse(localStorage.getItem('userData')));
```

### Manual Logout (Console):
```javascript
logout();
```

## ✅ Pages Protected

- ✅ `student-dashboard.html`
- ✅ `teachers.html`
- ⬜ Add to other protected pages as needed

## 🎨 UI Features

- ✨ Loading spinner during login
- 🎯 Role selector with icons
- 👁️ Password show/hide toggle
- 💾 Remember me option
- 🌗 Theme toggle
- 📱 Fully responsive

## 🔒 Security Level

Current: **Frontend Demo** (Good for prototyping)
Production: **Need Backend** (Required for real app)

---

**Everything is ready to use! Just add `auth-check.js` to protected pages and test! 🎉**
