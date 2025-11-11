# Ocean LMS React Frontend

Modern, accessible React app aligned with the Ocean Professional theme.

## Quick Start
1. copy `.env.example` to `.env` and configure:
   - REACT_APP_API_BASE_URL
   - REACT_APP_WS_URL
   - REACT_APP_SSO_PROVIDER_URL (optional)
   - REACT_APP_BRAND_NAME
2. npm install
3. npm start

## Features
- Routing with guarded areas (auth, roles)
- JWT API client with automatic refresh
- WebSocket notifications with toasts
- Dashboards (employee/manager/admin), courses, quizzes, paths, reports, admin
- Ocean Professional theme (blue/amber, subtle shadows, rounded corners)

## Roles
- employee: default access
- manager: /manager
- admin: /admin and subroutes

## Security
- No secrets in code. Configure via .env
- JWT stored in localStorage under a namespace
- 401 triggers refresh token flow; failed refresh clears session

Reviewed & Approved by Frontend Engineering.
