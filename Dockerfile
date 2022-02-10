FROM node:14

WORKDIR /app
COPY package.json yarn.lock tsconfig.json ./
COPY db/assessment.db ./db/assessment.db

RUN [ "yarn" ]

ENTRYPOINT [ "yarn", "start-dev" ]