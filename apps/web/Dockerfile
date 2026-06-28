FROM node:20-alpine AS runner
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install --frozen-lockfile && pnpm --filter @vercent/web build
CMD ["pnpm", "--filter", "@vercent/web", "start"]
