# ✅ Coupon Management – Production Readiness Guide

## Overview
The coupon admin experience (`app/admin/coupons/client-wrapper.tsx`) is now production-ready. This document covers the UI surface area, API dependencies, testing strategy, and Storybook coverage so releases stay predictable.

---

## Feature Surface
- **Coupon CRUD**: Create, edit, activate/deactivate, and delete coupons via `/api/admin/coupons`.
- **User Redemptions**: View grouped redemption history, inspect status, and enable/disable individual redemptions via `/api/admin/coupons/redemptions`.
- **Dialogs & Forms**: Create/edit dialogs enforce code uppercasing, numeric validation, optional expiration, and active-state toggles.
- **Status Signals**: Badges for active/inactive/expired coupons plus on-demand redemption history using `<details>`.

### Key UX Contracts
| Area | Expectation |
| --- | --- |
| Loading | Skeleton replaced by data once both coupon+redemption fetches finish. |
| Empty State | Copy: `No coupons created yet. Click "Create Coupon" to get started.` |
| Confirmations | Deletes require `confirm()`; success/failure routed through `toast`. |
| Sorting | `groupRedemptions` keeps latest redemption per user+coupon first. |

---

## API Dependencies
| Endpoint | Method | Purpose | Notes |
| --- | --- | --- | --- |
| `/api/admin/coupons` | `GET` | Seed coupon grid | Must return array with `currentUsages`, `maxUsages`. |
| `/api/admin/coupons` | `POST` | Create coupon | Payload: `{ code, description?, maxUsages, durationDays, expiresAt? }`. |
| `/api/admin/coupons/:id` | `PUT` | Update coupon | Accepts same shape as POST + `isActive`. |
| `/api/admin/coupons/:id` | `PATCH` | Toggle active | Body `{ isActive: boolean }`. |
| `/api/admin/coupons/:id` | `DELETE` | Remove coupon | Returns `{ message }` for toast. |
| `/api/admin/coupons/redemptions` | `GET` | List redemptions | Each record includes `userId | user.userId`, `coupon.code`, `isActive`, `proEndsAt`, `redeemedAt`. |
| `/api/admin/coupons/redemptions/:id` | `PATCH` | Enable/disable redemption | Body `{ action: "disable" | "enable" }`. |

---

## Testing Strategy
| Layer | Location | What It Covers |
| --- | --- | --- |
| Unit/UI | `__tests__/app/admin/coupons/client-wrapper.test.tsx` | Empty state rendering, populated coupon cards, redemption history, and `groupRedemptions` ordering. Uses injectable `fetcher` to avoid touching global `fetch`. |
| Helper | Exported `groupRedemptions` | Deterministic grouping ensures collapsible history shows newest first. |
| Setup | `vitest.setup.ts` | Registers `@testing-library/jest-dom`, mocks `next/image`, `next/navigation`, and handles cleanup so coupon tests run cleanly in jsdom. |

### Running Tests
```bash
npm test __tests__/app/admin/coupons/client-wrapper.test.tsx
```

---

## Storybook Coverage
- **File**: `app/admin/coupons/client-wrapper.stories.tsx`
- **Story**: `Admin/Coupons/CouponManagementClient/DefaultExperience`
- **Mocking**: Provides in-memory `fetch` implementation for all CRUD/redemption actions so designers/product can demo workflows end-to-end.

### Usage
```bash
npm run storybook
# Navigate to Admin → Coupons → CouponManagementClient
```

---

## Rollout Checklist
1. **API smoke test** – Hit all coupon endpoints in staging; verify JSON shape matches table above.
2. **Vitest run** – Execute coupon test file (fails fast if the UI contract changes).
3. **Storybook review** – Confirm flows (create, toggle, delete, redemption disable) in the mocked story.
4. **Accessibility pass** – Ensure buttons remain focusable and badges convey state with text (already in component but re-check before release).
5. **Toast copy** – Validate localized strings if intl is enabled (defaults documented above).

---

## Notes for Future Enhancements
- Replace browser `confirm()` with consistent dialog for destructive actions.
- Introduce typed interfaces for `Coupon` and `Redemption` to catch regressions at compile time.
- Expand tests to cover failure toasts once API error shapes stabilize.
- Consider server-side pagination when coupon volume grows.

This guide should live alongside release notes so any engineer can verify the coupon admin area is ready for production without spelunking through components. Keep it updated when endpoints or UX flows change.
