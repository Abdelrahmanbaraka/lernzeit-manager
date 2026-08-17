# Lernzeit-Manager

A responsive React application for planning study goals, scheduling learning sessions and comparing planned time with actual progress.

**Live demo:** https://lernzeitmanager.netlify.app/

## What the application does

- Creates, edits, completes and deletes study goals
- Plans monthly study hours and distributes them across calendar entries
- Records learning sessions manually or with a stopwatch
- Blocks conflicting calendar entries
- Compares planned and completed hours per goal
- Displays progress with charts and status indicators
- Stores separate local data for the included demonstration users
- Provides responsive layouts for desktop and mobile use

## Technical approach

The project is intentionally implemented as a client-side application. There is no backend, central database or production authentication. Goals, plans, sessions and the active stopwatch are stored in the browser using `localStorage`.

| Area | Technology |
|---|---|
| UI | React 19, JavaScript, CSS |
| Build tooling | Vite 8 |
| Routing | React Router 7 |
| Charts | Recharts 3 |
| Testing | Vitest, React Testing Library, jest-dom |
| Code quality | ESLint |
| Deployment | Netlify |

## Run locally

Requirements: Node.js 22 and npm.

```bash
git clone https://github.com/Abdelrahmanbaraka/lernzeit-manager.git
cd lernzeit-manager
npm install
npm run dev
```

Create a production build with `npm run build`.

## Tests

```bash
npm test
```

The test setup combines static source checks, utility tests, React component tests and integration-style logic tests. Manual UI and responsive checks are documented separately in [APP_TEST_DOKUMENTATION.md](APP_TEST_DOKUMENTATION.md).

## Main project structure

```text
src/
├── components/   Reusable UI and feature components
├── data/         Demonstration users
├── pages/        Route-level screens
├── services/     Storage and domain operations
├── styles/       Shared styling
└── utils/        Date, timer and validation helpers
```

## Current limitations

- Authentication is a mock implementation for demonstration purposes.
- Data is tied to the current browser and can be lost when browser storage is cleared.
- There is no synchronization between devices or browsers.
- Browser notifications depend on local permission and an open browser session.
- This project is a university team project and not a production service.

## Project context

The application was developed as part of a software-engineering project. My contribution focused on technical implementation, deployment preparation, bug tracking and quality-related improvements. The repository also contains the final sprint test documentation and results.
