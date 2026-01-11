# Allkons MVP Implementation Plan

## 1. Architecture Overview

**Monorepo Structure (pnpm workspaces):**
- `apps/api`: NestJS backend (REST, TypeORM, Postgres)
- `apps/seller`: React seller portal (AntD, Vite)
- `apps/storefront`: React public portal (AntD, Vite)
- `apps/admin`: React admin portal (AntD, Vite)
- `packages/shared`: Shared types, Zod schemas, UI constants, Helper functions

**Tech Stack:**
- **Frontend:** React, TypeScript, Vite, Ant Design, Zustand, TanStack Query, Zod.
- **Backend:** NestJS, TypeScript, PostgreSQL, TypeORM, Passport (JWT).
- **Infra:** Docker Compose (local DB).

## 2. API Schema & Contracts (Draft)

### Auth Module
- `POST /auth/otp/request` { phone } -> { refCode, expiration }
- `POST /auth/otp/verify` { phone, otp } -> { accessToken, refreshToken }
- `POST /auth/refresh` { refreshToken } -> { accessToken }

### User/Profile Module
- `GET /me/profile` -> Returns User + Org Status + Shop Count + Onboarding State.
    - **Response:**
      ```json
      {
        "id": "uuid",
        "phone": "+66...",
        "hasOrg": boolean,
        "orgId": "uuid" | null,
        "shops": [{ "id": "uuid", "name": "...", "slug": "..." }],
        "onboardingCompleted": boolean
      }
      ```

### Onboarding Module
- `POST /onboarding/org` { name, type, ... } -> { orgId }
- `POST /onboarding/shop` { name, slug, ... } -> { shopId }

## 3. Seller Registration Flows (Cross-Platform)

**Scenario 1: New User**
1. Enter Phone -> Request OTP.
2. Verify OTP -> Create User Account (Global).
3. Check `hasOrg`: False -> Redirect `/onboarding/org`.
4. Create Org -> Redirect `/onboarding/shop`.
5. Create Shop -> Redirect `/seller/shop/:id`.

**Scenario 2: Existing User (No Seller Profile)**
1. Enter Phone -> Request OTP (or Password login if exists).
2. Verify -> Check `hasOrg`: False -> Redirect `/onboarding/org`.
3. Create Org -> Create Shop -> Dashboard.

**Scenario 3: Existing Seller**
1. Login -> Check `hasOrg`: True.
2. Check `shops`:
    - count = 0 -> `/onboarding/shop`
    - count = 1 -> `/seller/shop/:id`
    - count > 1 -> `/seller/shops` (Select Shop)

## 4. Database Schema (Simplified)

**Entities:**
- **User:** `id, phone, password_hash, email, ...`
- **Organization:** `id, owner_id, legal_name, type (individual/registered/juristic), verification_status`
- **Shop:** `id, org_id, name, slug, status`
- **Product:** `id, shop_id, name, price, stock, ...`

## 5. UI/UX Implementation Strategy
- **Ant Design Token Config:** Standardize primary color, border radius, font family.
- **Form Handling:** `react-hook-form` or `antd Form` directly + `zod` resolver.
- **Error Handling:** Global Error Boundary + QueryClient `onError`.
    - 422: Map to form fields.
    - 401: Redirect login.
    - 500: Toast/Notification.

## 6. Phase 1 Immediate Steps
1. Initialize Repo.
2. Set up `apps/api` with Docker Postgres.
3. Set up `apps/seller` with React Router + AntD.
4. Implement "Me" endpoint mock.
