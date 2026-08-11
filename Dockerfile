# Multi-stage build for Vite + Node.js Socket.io server

FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install all dependencies (including devDependencies for vite build)
RUN npm ci

# Copy full application code
COPY . .

# Build frontend static assets into dist/
RUN npm run build

# Production runtime stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy dependency files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy compiled frontend and server script from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

EXPOSE 8080

CMD ["npm", "start"]
