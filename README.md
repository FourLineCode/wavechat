# WaveChat

**This is a Real Time Chat Application**

-   Preview - [WaveChat (Coming Soon)](#)

This is a real time chat app made for college/university students. In the recent couple years, the covid-19 pandemic
has changed how students of all level interact with each other. It has been really tough for students
to meet new people and make friends over the internet. This app was made for students to find other students
of their similar level and make new friends. It also makes it easy for students of a certain course or section to
communicate with each other about their activities and help each other.

# Stack

-   [Typescript](https://www.typescriptlang.org/)
-   [Next.js](https://nextjs.org/)
-   [React](https://reactjs.org)
-   [Apollo](https://www.apollographql.com/)
-   [Zustand](https://github.com/pmndrs/zustand)
-   [TailwindCSS](https://tailwindcss.com/)
-   [Nodejs](https://nodejs.org/en/)
-   [GraphQL](https://graphql.org/)
-   [GiraphQL - SchemaBuilder](https://giraphql.com/)
-   [Socket.IO](https://socket.io/)
-   [Prisma](https://www.prisma.io/)
-   [PostgresSQL](https://www.postgresql.org/)

# If you want to run this application on your own follow the procedure below

## Requirements

-   Node.js 14.0.0^
-   Pnpm 6.0.0^
-   Docker
-   Docker-Compose
-   Git

## Clone the Repository

```
git clone https://github.com/FourLineCode/wavechat.git
```

## Install Dependencies

```
pnpm --dir api install
pnpm --dir web install
```

> You can run these commands from the root directory as specified or change your directory if you want.

## Run development server

```
docker-compose up
```

> Pass the `--build` flag to rebuild the containers.

## Migrate database

```
pnpm --dir api migrate
```

> **This step is very important for the app to work**
