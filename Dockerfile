# Використовуємо офіційний образ Node.js (легкий варіант Alpine)
FROM node:18-alpine AS builder

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json (щоб кешувати залежності)
COPY package.json package-lock.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі файли проекту
COPY . .

# Будуємо Next.js застосунок
RUN npm run build

# Другий етап: запуск застосунку у продакшн-режимі
FROM node:18-alpine

WORKDIR /app

# Копіюємо файли зі стадії "builder"
COPY --from=builder /app ./

# Визначаємо порт (той, що Next.js використовує за замовчуванням)
EXPOSE 3000

# Запускаємо Next.js у продакшн-режимі
CMD ["npm", "start"]