FROM docker.io/node:22-alpine AS build
WORKDIR /app
COPY src/beslutningslog.ts .
RUN npx -y esbuild beslutningslog.ts --bundle --platform=node --outfile=beslutningslog.mjs

FROM docker.io/node:22-alpine AS runtime
WORKDIR /repo
COPY --from=build /app/beslutningslog.mjs /bin/beslutningslog.mjs
ENTRYPOINT ["node", "/bin/beslutningslog.mjs"]
