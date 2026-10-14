# iOS-application

CoinSaveKeeper: Expo (React Native, TypeScript, Expo Router) app. iOS only for now.

## Commands

```bash
npm install          # install dependencies
npm run ios          # start Expo and open the iOS simulator
npm run typecheck    # tsc --noEmit
npm run lint         # expo lint
npm test             # jest (jest-expo preset, Testing Library)
```

CI (`.github/workflows/ci.yml`) runs typecheck, lint and tests on every pull request.

## Layout

- `src/app` - Expo Router routes only
- `src/screens` - screen bodies rendered by routes
- `src/__tests__` - tests that render routes
