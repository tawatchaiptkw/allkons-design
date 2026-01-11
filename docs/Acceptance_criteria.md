# Acceptance Criteria

## AC 01: Seller Login / Registration
- **Given** a user is on the login page
- **When** they enter a valid Thai phone number (+66)
- **Then** the "Request OTP" button becomes active.

- **Given** a new user verifies OTP
- **Then** a new User record is created
- **And** they are redirected to `/onboarding/org`.

- **Given** an existing seller verifies OTP
- **Then** they are redirected to their Shop Dashboard (if 1 shop) or Shop Select (if >1).

## AC 02: Onboarding - Organization
- **Given** a user is on the Org Step
- **When** they select "Juristic" or "Registered Business"
- **Then** a Consent Modal must appear before proceeding.
- **And** the validation for Tax ID (format only) must pass.

## AC 03: Shop Creation
- **Given** a user is creating a shop
- **When** they enter a slug "myshop"
- **Then** the system checks availability asynchronously.
- **If** unavailable, an inline error is shown.
- **If** valid, they can proceed to create.
