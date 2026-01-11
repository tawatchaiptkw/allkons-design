# BRD Summary: Allkons Seller Portal MVP

## 1. Executive Summary
Build a Seller Portal for the Allkons ecosystem to allow construction material vendors to onboard, set up shops, and manage products. The system must support users who already have Allkons accounts (from Buyer apps) and new users.

## 2. Business Objectives
- Enable self-service onboarding for sellers.
- Support 3 business types: Individual, Registered Business, Juristic.
- Seamless integration with existing Allkons identity (one phone number, multiple roles).

## 3. Key Features
- **Authentication:** Phone OTP based. Password optional for initial flow, set later.
- **Onboarding:** Step-by-step wizard (Personal -> Business -> Shop).
- **Multi-Shop Support:** One Organization can have multiple Shops.
- **Product Management:** Basic Create/Read/Update/Delete.

## 4. User Segments
- **Nid (Staff):** Needs simple UI, clear errors.
- **Boss (Owner):** Needs efficiency, overview.
- **May (Admin):** Needs verification tools.

## 5. Success Metrics
- Successful registration rate.
- Time to first product listing.
- Zero data discrepancies between Auth and Profile services.
