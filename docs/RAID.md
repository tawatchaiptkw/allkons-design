# RAID Log (Risks, Assumptions, Issues, Dependencies)

## Risks
- **R1:** Figma prototype access is limited/static. Some states might be missed.
  - *Mitigation:* Use Ant Design defaults for any missing states.
- **R2:** Shared Auth with Buyer App.
  - *Mitigation:* Ensure `User` entity is cleanly separated from `SellerProfile` to allow independent evolution.

## Assumptions
- **A1:** OTP Provider is mocked for MVP phases.
- **A2:** File storage is local-only initially.
- **A3:** No complex permissions (RBAC) needed for Phase 1 (Owner has full access).

## Issues
- (None yet)

## Dependencies
- **D1:** Figma Design (Source of Truth).
- **D2:** Ant Design Library.
