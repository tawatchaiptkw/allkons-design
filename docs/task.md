# Allkons MVP Task List

- [x] **Phase 0: Scaffolding & Planning**
    - [x] Create documentation artifacts (BRD, SRS, Flows, AC, RAID, Assumptions)
    - [x] Initialize Monorepo (pnpm + turborepo)
    - [x] Scaffold Backend (`apps/api` - NestJS)
    - [x] Scaffold Frontend - Seller (`apps/seller` - React + Vite + AntD)
    - [x] Scaffold Frontend - Storefront (`apps/storefront` - React + Vite + AntD)
    - [x] Scaffold Frontend - Admin (`apps/admin` - React + Vite + AntD)
    - [x] Scaffold Shared Package (`packages/shared` - Types, Utils)
    - [x] Setup Docker Compose (Postgres)

- [x] **Phase 1: Foundation**
    - [x] Setup TypeORM & Database Connection
    - [x] Setup Global Filters & Interceptors (NestJS)
    - [x] Setup Ant Design Config Provider (Frontend)
    - [x] Setup Zustand & TanStack Query wrapper

- [x] **Phase 2: Backend Core (Auth & User)**
    - [x] Implement Auth Module (JWT, Phone OTP mock)
    - [x] Implement User/Profile Entities
    - [x] Implement "Me/Profile Bootstrap" logic (Cross-platform checks)

- [x] **Phase 3: Seller Auth UI**
    - [x] Implement Seller Start Screen
    - [x] Implement Phone Input & OTP Screen
    - [x] Implement Login/Register routing logic

- [ ] **Phase 4: Org & Shop**
    - [ ] Organization Onboarding Flow
    - [ ] Shop Creation Flow (Slug validation)

- [ ] **Phase 5: Product CRUD**
    - [ ] Product Entities & API
    - [ ] Product Management UI

- [ ] **Phase 6: Storefront MVP**
    - [ ] Public Browse UI

- [ ] **Phase 7: Admin MVP**
    - [ ] Admin basic auditing

- [ ] **Phase 8: Hardening**
    - [ ] Tests and Polish
