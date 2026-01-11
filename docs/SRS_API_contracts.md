# SRS & API Contracts

## 1. API Standards
- **Protocol:** REST JSON
- **Auth:** Bearer JWT (Access Token) + HttpOnly Cookie (Refresh Token)
- **Response Format:**
  ```json
  {
    "statusCode": 200,
    "message": "Success",
    "data": { ... }
  }
  ```
- **Error Format:**
  ```json
  {
    "statusCode": 400,
    "message": "Invalid input",
    "error": "Bad Request",
    "data": null // Optional validation details
  }
  ```

## 2. Core Endpoints

### Authentication
| Method | Path | Description | Access |
|Or|---|---|---|
| POST | `/auth/login/otp/init` | Request OTP for phone | Public |
| POST | `/auth/login/otp/verify` | Verify OTP, issue tokens | Public |
| POST | `/auth/logout` | Clear tokens | Private |

### Profile & Bootstrap
| Method | Path | Description | Access |
|---|---|---|---|
| GET | `/me` | Get current user context + onboarding state | Private |

### Organization
| Method | Path | Description | Access |
|---|---|---|---|
| POST | `/orgs` | Create new organization | Private |
| GET | `/orgs/mine` | Get my organization | Private |

### Shop
| Method | Path | Description | Access |
|---|---|---|---|
| POST | `/shops` | Create new shop | Private |
| GET | `/shops` | List my shops | Private |
| GET | `/shops/:id` | Get shop details | Private |

## 3. Data Models (TypeScript Interfaces)

```typescript
interface User {
  id: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface Organization {
  id: string;
  legalName: string;
  type: 'INDIVIDUAL' | 'REGISTERED_BUSINESS' | 'JURISTIC';
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

interface Shop {
  id: string;
  orgId: string;
  name: string;
  slug: string;
  logoUrl?: string;
}
```
