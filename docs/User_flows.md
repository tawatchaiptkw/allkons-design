# User Flows

## Flow 1: New Seller Registration
1. **Landing:** User visits `/seller/login`.
2. **Input:** Enters Phone Number.
3. **Verify:** System checks DB. Phone not found.
4. **OTP:** User requests and Enters OTP.
5. **Create Account:** User sets basics (Password).
6. **Onboarding:**
   - User redirected to `/seller/onboarding/org`.
   - Fills Layout: Personal Info -> Business Type -> Consent.
7. **Shop Setup:**
   - User redirected to `/seller/onboarding/shop`.
   - Enters Shop Name & Slug.
8. **Success:** Redirects to `/seller/shop/:newShopId`.

## Flow 2: Existing Buyer becomes Seller
1. **Landing:** User visits `/seller/login`.
2. **Input:** Enters Phone Number (Already exists in Buyer DB).
3. **Auth:** System prompts for Password OR OTP.
4. **Bootstrap:** System detects `hasOrg = false`.
5. **Redirect:** To `/seller/onboarding/org`.
6. **Proceed:** Same as Flow 1 Step 6.

## Flow 3: Existing Seller Login
1. **Landing:** User visits `/seller/login`.
2. **Auth:** Logs in via OTP/Password.
3. **Bootstrap:** System detects `hasOrg = true`, `shops.length > 0`.
4. **Redirect:**
   - If 1 shop -> `/seller/shop/:id`.
   - If >1 shop -> `/seller/shops` (Selector).

## Flow 4: Error Handling
- **Invalid OTP:** Show inline error, allow retry after 30s.
- **Slug Taken:** Show inline error "Slug already in use".
- **Network Fail:** Show Toast "Connection failed, retrying...".
