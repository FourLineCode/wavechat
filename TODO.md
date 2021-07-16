# ToDo's

-   [ ] bootstrap

    -   [x] init server
    -   [x] init client
    -   [x] github repo
    -   [x] init docker
    -   [x] pg service
    -   [x] prisma setup
    -   [x] apollo client
    -   [x] gql codegen
    -   [x] codegen watcher container
    -   [x] socket server
    -   [x] socket client
    -   [x] yarn migration
    -   [x] readme
    -   [ ] path alias

-   [ ] general

    -   [x] docker run prisma commands
    -   [x] move server env in docker-compose
    -   [x] dataloader
    -   [x] auth plugin
    -   [x] input server validation plugin
    -   [x] implement context properly
    -   [x] fix codegen

-   [ ] auth

    -   [x] user model
        -   [x] user infos
        -   [x] uni infos
    -   [x] sessions model
    -   [x] signup/ signin/ signout
    -   [x] auth scope plugin
        -   [ ] add top level auth
        -   [ ] csrf token
    -   [x] auth ui
        -   [ ] multi page signup
            -   [ ] uni infos
    -   [ ] setup zustand stores
    -   [ ] setup auth hooks
    -   [ ] persist auth
        -   [ ] keep signed in option
    -   [ ] protected routes
        -   [ ] server sided auth redirects
    -   [ ] sign out of all devices

-   [ ] users

    -   [ ] friends
    -   [ ] profile modal

-   [ ] channels

    -   [ ] user channels
        -   [ ] only 2 users
        -   [ ] cannot leave without unfriend
    -   [ ] server channels
        -   [ ] multiuser
        -   [ ] can leave
    -   [ ] private/public channels
        -   [ ] private invite only
        -   [ ] public discoverable
            -   [ ] anyone can join

-   [ ] messages

    -   [ ] mentions
        -   [ ] shows user card on click
    -   [ ] images/videos
        -   [ ] use mediafire maybe
    -   [ ] reply to messages
    -   [ ] reactions to messages
        -   [ ] only emojis
    -   [ ] maybe markup

-   [ ] discover
    -   [ ] search users
    -   [ ] search public channels
    -   [ ] filter by uni/semester/department
    -   [ ] recommend users/servers
