# WaveChat

**This is a Real Time Chat Application**

-   Preview - [WaveChat (Coming Soon)](#)

This is a real time chat app made for college/university students. In the recent couple years, the covid-19 pandemic
has changed how students of all level interact with each other. It has been really tough for students
to meet new people and make friends over the internet. This app was made for students to find other students
of their similar level and make new friends. It also makes it easy for students of a certain course or section to
communicate with each other about their activities and help each other.

## Stack

<table align="center" width="500">
  <tr>
    <td align="center" ><a href="https://www.typescriptlang.org"><img src=".github/images/typescript.png" width="70px;" height="75px;" alt="TypeScript" /><br /><b><font color="#777"> TypeScript</font></b></a></td>
    <td align="center"><a href="https://nextjs.org/"><img src=".github/images/nextjs.png" width="70px;" height="75px;" alt="Next JS"/><br /><b><font color="#777"> NextJs</font></b></a></td>
    <td align="center"><a href="https://reactjs.org"><img src=".github/images/react.png" width="80px;" height="75px;" alt="React JS"/><br /><b><font color="#777"> ReactJs</font></b></a></td>
    <td align="center"><a href="https://www.apollographql.com/"><img src=".github/images/apollo.png" width="75px;" height="75px;" alt="Apollo"/><br /><b><font color="#777"> Apollo</font></b></a></td>
    <td align="center"><a href="https://tailwindcss.com/"><img src=".github/images/tailwind.png" width="75px;" height="75px;" alt="Tailwind"/><br /><b><font color="#777"> Tailwind CSS</font></b></a></td>
    <td align="center"><a href="https://graphql.org/"><img src=".github/images/graphql.png" width="80px;" height="75px;" alt="GraphQL"/><br /><b><font color="#777"> GraphQL</font></b></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://socket.io"><img src=".github/images/socket.png" width="75px;" height="75px;" alt="Socket"/><br /><b><font color="#777"> Socket</font></b></a></td>
    <td align="center"><a href="https://nodejs.org/en/"><img src=".github/images/nodejs.png" width="70px;" height="75px;" alt="NodeJs"/><br /><b><font color="#777"> NodeJs</font></b></a></td>
    <td align="center"><a href="https://www.prisma.io/"><img src=".github/images/prisma.png" width="110px;" height="75px;" alt="Prisma"/><br /><b><font color="#777"> Prisma</font></b></a></td>
    <td align="center"><a href="https://www.postgresql.org/"><img src=".github/images/postgres.png" width="75px;" height="75px;" alt="PostgreSQL"/><br /><b><font color="#777"> PostgreSQL</font></b></a></td>
    <td align="center"><a href="https://www.docker.com/"><img src=".github/images/docker.png" width="75px;" height="75px;" alt="Docker"/><br /><b><font color="#777"> Docker</font></b></a></td>
    <td align="center"><a href="https://giraphql.com/"><img src=".github/images/giraphql.png" width="80px;" height="75px;" alt="GiraphQL"/><br /><b><font color="#777"> GiraphQL</font></b></a></td>
  </tr>
</table>

## If you want to run this application on your own follow the procedure below

## Requirements

-   [Node.js 16.0.0^](https://nodejs.org/en/)
-   [Pnpm 6.0.0^](https://pnpm.io/installation)
-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker-Compose](https://docs.docker.com/compose/install/)
-   [Git](https://git-scm.com/downloads)

## Clone the Repository

```console
git clone https://github.com/FourLineCode/wavechat.git
```

## Run in production mode

**Command**

```console
./deploy.sh
```

> Deploy script currently deploys 3 replicas of api image. Edit deploy script to change scaling factor

## Visit the site at your local custom domain

-   **Frontend - [http://wavechat.localhost](http://wavechat.localhost)**

---

## Run in development mode

**Command**

```console
./dev.sh
```

> Pass the `--build` flag to rebuild the containers.

## Open the development server on custom domain

-   **Frontend - [http://wavechat.localhost](http://wavechat.localhost)**
-   **GraphQL Playground - [http://wavechat.localhost/graphql](http://wavechat.localhost/graphql)**
