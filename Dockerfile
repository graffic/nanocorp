FROM node:10.9-alpine

ENV NANOCORP_BACKEND_STATIC_PATH=/app/static \
    NANOCORP_BACKEND_PORT=8080 \
    NODE_ENV=production

EXPOSE 8080

WORKDIR /app
COPY backend/yarn.lock backend/package.json backend/src ./
COPY frontend/dist/* ./static/
COPY db /db
RUN yarn
CMD node index.js 
    
