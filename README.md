# xflow-builder-integration

Minimal reproduction of the xflow-web Builder.io integration — basic setup only.

## Purpose

Reproduces the core Builder.io integration (content fetching, preview mode, component registration) with minimal moving parts, for isolating issues.

## Setup

```bash
cp .env.example .env.local
# open .env.local and replace the value of NEXT_PUBLIC_BUILDERIO with the Builder.io space API key
yarn
yarn dev
```

1. Copy the env file: `cp .env.example .env.local`
2. In `.env.local`, set `NEXT_PUBLIC_BUILDERIO` to the Builder.io space API key 
3. Run `yarn && yarn dev` — the app will be available at `http://localhost:3000`
4. Set the preview URL in Builder to `http://localhost:3000` to test draft changes live

## Integration layers

| File | Role |
|---|---|
| `src/utils/builderRequestWrapper.ts` | Server-side content fetch with cache/preview flags |
| `src/components/Builderio/RenderBuilderContent.tsx` | Client component wrapping `BuilderComponent` |

## Registered components (tools model)

- **SimpleHero** — title, subtitle, CTA link
- **CardList** — section title + list of cards (title + description)
- **FaqBlock** — section title + FAQ accordion (question + answer)

## Testing preview mode

1. Open the Builder.io visual editor and set the preview URL to `http://localhost:3000`
2. Navigate to a page that uses the `tools` model
3. Make a draft change — it should appear immediately via `useIsPreviewing`
