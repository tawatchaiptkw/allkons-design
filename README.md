# Allkons MVP - Getting Started

## Prerequisites
- Node.js 18+
- Docker Desktop (for PostgreSQL)
- npm or pnpm

## Installation

1. **Install dependencies:**
   ```bash
   # Install dependencies for all apps
   cd apps/api && npm install
   cd ../seller && npm install
   cd ../storefront && npm install
   cd ../admin && npm install
   cd ../../packages/shared && npm install
   ```

2. **Start PostgreSQL:**
   ```bash
   # Make sure Docker Desktop is running, then:
   docker compose up -d
   ```

3. **Start the API:**
   ```bash
   cd apps/api
   npm run start:dev
   ```

4. **Start the Seller Portal:**
   ```bash
   cd apps/seller
   npm run dev
   ```

## Project Structure

```
/Users/tawatchaipetkaew/Vibe Code/
├── apps/
│   ├── api/          # NestJS Backend (Port 3000)
│   ├── seller/       # React Seller Portal (Port 5173)
│   ├── storefront/   # React Storefront (Port 5174)
│   └── admin/        # React Admin Portal (Port 5175)
├── packages/
│   └── shared/       # Shared types and utilities
├── docs/             # Documentation
├── docker-compose.yml
└── turbo.json
```

## Environment Variables

### API (.env in apps/api/)
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=allkons
JWT_SECRET=supersecret_change_in_production
```

### Seller App (.env in apps/seller/)
```
VITE_API_URL=http://localhost:3000/api
```

## Next Steps

**Phase 1 Complete ✅**
- ✅ Monorepo scaffolded
- ✅ TypeORM configured
- ✅ Global filters & interceptors
- ✅ Ant Design + React Router setup

**Phase 2: Backend Core (Auth & User)**
- Implement Auth Module (JWT, Phone OTP mock)
- Implement User/Profile Entities
- Implement "Me/Profile Bootstrap" logic

**Phase 3: Seller Auth UI (Figma-based)**
- Implement Seller Login Screen
- Implement Phone Input & OTP Screen
- Implement routing logic

## Troubleshooting

**Docker not found:**
- Install Docker Desktop from https://www.docker.com/products/docker-desktop

**Port conflicts:**
- API: Change PORT in apps/api/.env
- Frontend: Vite will auto-increment if 5173 is taken
