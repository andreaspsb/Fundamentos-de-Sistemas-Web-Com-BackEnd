# Dockerfile para o frontend mobile (Expo Web)
# Serve o app React Native como aplicação web

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build para web
RUN npx expo export --platform web

# Stage 2: Serve com Nginx
FROM nginx:alpine

# Copiar configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar build do Expo
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor porta
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost || exit 1

CMD ["nginx", "-g", "daemon off;"]
