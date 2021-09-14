# WaveChat

**This is a Real Time Chat Application**

- Preview - [WaveChat (Coming Soon)](#)

This is a real time chat app made for college/university students. In the recent couple years, the covid-19 pandemic
has changed how students of all level interact with each other. It has been really tough for students
to meet new people and make friends over the internet. This app was made for students to find other students
of their similar level and make new friends. It also makes it easy for students of a certain course or section to
communicate with each other about their activities and help each other.

## Stack

| [![TypeScript](images/typescript.png)](https://www.typescriptlang.org/)| [![TypeScript](images/nextjs.png)](https://nextjs.org/)| [![TypeScript](images/react.png)](https://reactjs.org) | [![TypeScript](images/apollo.png)](https://www.apollographql.com/) |
|---|---|---|---|
| [![TypeScript](images/tailwind.png)](https://tailwindcss.com/) | [![TypeScript](images/nodejs.png)](https://nodejs.org/en/)| [![TypeScript](images/graphql.png)](https://graphql.org/) | [![TypeScript](images/socket.png)](https://socket.io) |
| [![TypeScript](images/prisma.png)](https://www.prisma.io/) | [![TypeScript](images/postgres.png)](https://www.postgresql.org/) | [![TypeScript](images/docker.png)](https://www.docker.com/)| [![TypeScript](images/giraphql.png)](https://giraphql.com/) |

## If you want to run this application on your own follow the procedure below

## Requirements

- Node.js 14.0.0^
- Pnpm 6.0.0^
- Docker
- Docker-Compose
- Git

## Clone the Repository

```bash
git clone https://github.com/FourLineCode/wavechat.git
```

## Install Dependencies

```bash
pnpm --dir api install
pnpm --dir web install
```

> You can run these commands from the root directory as specified or change your directory if you want.

## Run development server

```bash
docker-compose up
```

> Pass the `--build` flag to rebuild the containers.

## Migrate database

```bash
pnpm --dir api migrate
```

> **This step is very important for the app to work**
