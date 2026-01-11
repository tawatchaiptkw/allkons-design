# Assumptions & Design Decisions

## 1. Authentication
- We assume phone numbers are unique identifiers for the User/Person level.
- We assume "Password" is an optional enhancement for this phase, prioritizing OTP.

## 2. Organization Structure
- We assume an Organization is 1:1 with a Tax Entity.
- We assume one User can own only one Organization (for MVP complexity reduction, though DB schema should allow many).

## 3. UI/UX
- We use standard Ant Design `primaryColor` (blue) unless Figma dictates a specific brand color (we will infer from "Allkons" usually being Construction related, maybe Orange/Blue, but will stick to default Ant Blue or Neutral if undefined).
- **Decision:** Use Ant Design `ProLayout` or standard Setup for Admin/Seller portal for speed.

## 4. Tech
- Using `pnpm` workspaces for strict dependency management.
- `Vite` for all frontend apps for performance.
