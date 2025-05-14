FROM node:18-alpine AS build

# 安装编译依赖
RUN apk add --no-cache python3 make g++ && \
    ln -sf $(which python3) /usr/local/bin/python

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build   # ← 如果你有前端打包命令

# ---- 运行阶段，干净瘦身 ----
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app .

EXPOSE 3000

CMD ["yarn", "start"]