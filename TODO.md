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
    -   [ ] custom not found page
    -   [ ] use prisma giraphql plugin

-   [ ] auth

    -   [x] user model
        -   [x] user infos
        -   [x] uni infos
    -   [x] sessions model
    -   [x] signup/ signin/ signout backend
    -   [x] auth scope plugin
        -   [ ] add top level public auth
        -   [ ] csrf token
    -   [x] auth ui
        -   [ ] multi page signup
            -   [ ] uni infos
    -   [x] setup zustand stores
    -   [x] setup auth hooks
    -   [x] signup / signin frontend
    -   [x] signout frontend
    -   [ ] refactor signup, signin store redirects
    -   [x] persist auth
        -   [ ] keep signed in option
    -   [x] protected routes
        -   [x] server sided auth redirects
    -   [ ] sign out of all devices

-   [ ] users

    -   [ ] friends

        -   [x] send req
        -   [x] accept req
        -   [x] decline req
        -   [x] decline all
        -   [x] unfriend
        -   [x] check if user is friend
        -   [x] get all friends of a user
        -   [x] get all pending requests of a user
        -   [x] get all sent requests of a user

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
