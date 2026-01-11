# End-to-End Testing Guide

## Prerequisites
1. **Docker Desktop** running (for PostgreSQL)
2. **Node.js 18+** installed
3. **Terminal** (2 tabs needed)

## Step-by-Step Testing

### 1. Start PostgreSQL
```bash
cd /Users/tawatchaipetkaew/Vibe\ Code
docker compose up -d
```

Verify it's running:
```bash
docker ps
# Should show: allkons_postgres
```

### 2. Start the API (Terminal Tab 1)
```bash
cd apps/api
npm run start:dev
```

**Expected output:**
```
🚀 API is running on: http://localhost:3000/api
```

### 3. Start the Seller Portal (Terminal Tab 2)
```bash
cd apps/seller
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 4. Test the Full Flow

#### A. Open Browser
Navigate to: **http://localhost:5173**

You should see the **Seller Login** screen with:
- Left side: Green gradient background with floating phone/gift/coin icons
- Right side: White form area with "Register an account with us"

#### B. Register Flow (New User)

1. **Enter Phone Number:**
   - Input: `+66812345678`
   - Click "Register"

2. **Check API Console:**
   - You should see: `📱 OTP for +66812345678: 123456 (Ref: XXXXXX)`

3. **Enter OTP:**
   - The screen changes to show a lock icon with concentric circles
   - Input: `123456`
   - Click "Confirm"

4. **Expected Result:**
   - Since this is a new user with no organization:
   - You should be redirected to: `/seller/onboarding/org`
   - Page shows: "Org Onboarding (Coming Soon)"

#### C. Login Flow (Existing User)

1. **Repeat Steps B.1-B.3** with the same phone number

2. **Expected Result:**
   - Same user, still no org → `/seller/onboarding/org`

### 5. Test Cross-Platform Routing

To test different routing scenarios, you can manually create data:

#### Scenario 1: User with Org but No Shop
```bash
# In a new terminal, connect to Postgres
docker exec -it allkons_postgres psql -U postgres -d allkons

# Create an organization for the user
INSERT INTO organizations (id, "legalName", type, "ownerId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'Test Company',
  'INDIVIDUAL',
  (SELECT id FROM users WHERE phone = '+66812345678'),
  NOW(),
  NOW()
);

# Exit psql
\q
```

Now login again → Should redirect to `/seller/onboarding/shop`

#### Scenario 2: User with 1 Shop
```bash
docker exec -it allkons_postgres psql -U postgres -d allkons

# Create a shop
INSERT INTO shops (id, name, slug, "organizationId", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'My First Shop',
  'my-first-shop',
  (SELECT id FROM organizations WHERE "ownerId" = (SELECT id FROM users WHERE phone = '+66812345678')),
  NOW(),
  NOW()
);

\q
```

Now login again → Should redirect to `/seller/shop/{shopId}`

## Troubleshooting

### Port Already in Use
**API (3000):**
```bash
lsof -ti:3000 | xargs kill -9
```

**Frontend (5173):**
```bash
lsof -ti:5173 | xargs kill -9
```

### Database Connection Failed
```bash
# Check if Postgres is running
docker ps

# Restart if needed
docker compose down
docker compose up -d
```

### OTP Not Working
- OTP is always `123456` for MVP
- Check API console for the log message
- Ensure phone format is `+66XXXXXXXXX`

## What to Test

### ✅ Happy Path
- [x] Phone input validation (+66 format)
- [x] OTP request success
- [x] OTP verification success
- [x] New user creation
- [x] JWT token storage
- [x] Profile bootstrap call
- [x] Routing to onboarding (no org)

### ✅ Error Cases
- [ ] Invalid phone format
- [ ] Wrong OTP code
- [ ] Expired OTP (after 5 minutes)
- [ ] Network errors

### ✅ UI/UX
- [x] Split-screen layout (desktop)
- [x] Responsive design (mobile)
- [x] Loading states
- [x] Form validation
- [x] Success/error messages

## Next Steps
After Phase 3, we'll implement:
- **Phase 4:** Organization & Shop onboarding forms
- **Phase 5:** Product CRUD
- **Phase 6:** Public Storefront
