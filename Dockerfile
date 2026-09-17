# Build stage: install, test, and bundle everything into dist/.
FROM oven/bun:1.3-alpine AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY tsconfig.json tailwind.config.ts build.ts favicon.svg favicon.ico ./
COPY src/ src/
RUN bun test && bun run build

# Serve stage: static files only.
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80
