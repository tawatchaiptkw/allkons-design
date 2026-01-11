# API Testing Guide

## Start the API

1. **Make sure PostgreSQL is running:**
   ```bash
   docker compose up -d
   ```

2. **Start the API in development mode:**
   ```bash
   cd apps/api
   npm run start:dev
   ```

## Test Endpoints

### 1. Request OTP
```bash
curl -X POST http://localhost:3000/api/auth/otp/request \
  -H "Content-Type: application/json" \
  -d '{"phone": "+66812345678"}'
```

**Expected Response:**
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {
    "refCode": "ABC123",
    "expiresAt": "2026-01-11T...",
    "message": "OTP sent successfully (check console for mock OTP)"
  }
}
```

**Check API console** - you'll see:
```
📱 OTP for +66812345678: 123456 (Ref: ABC123)
```

### 2. Verify OTP
```bash
curl -X POST http://localhost:3000/api/auth/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"phone": "+66812345678", "otp": "123456"}'
```

**Expected Response:**
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "phone": "+66812345678",
      "email": null,
      "firstName": null,
      "lastName": null
    }
  }
}
```

### 3. Get Profile Bootstrap (Protected)
```bash
# Replace YOUR_ACCESS_TOKEN with the token from step 2
curl -X GET http://localhost:3000/api/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Expected Response (New User):**
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {
    "id": "uuid",
    "phone": "+66812345678",
    "hasOrg": false,
    "shops": [],
    "onboardingCompleted": false
  }
}
```

## Mock OTP Code
For MVP, the OTP is always **`123456`** for any phone number.

## Database Tables Created
- `users`
- `otp_codes`
- `organizations`
- `shops`

Check with:
```bash
docker exec -it allkons_postgres psql -U postgres -d allkons -c "\dt"
```
