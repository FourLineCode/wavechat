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
    -   [x] custom not found page
    -   [x] add loading state after signup/signin process
    -   [x] pnpm migration
    -   [x] remove tailwind-spinner
    -   [x] prisma to name db
    -   [x] server side apollo client hostname dynamic
    -   [x] comments and docs
    -   [x] use alpine images
    -   [x] add traefik reverse proxy
    -   [x] requirement updates
    -   [x] images folder refactor
    -   [x] add prettierrc
    -   [x] full color revamp
    -   [x] docker prod env
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
        -   [x] multi page signup
            -   [x] uni infos
            -   [x] bio
    -   [x] setup zustand stores
    -   [x] setup auth hooks
    -   [x] signup / signin frontend
    -   [x] signout frontend
    -   [ ] refactor signup, signin store redirects
    -   [x] persist auth
        -   [ ] keep signed in option
    -   [x] protected routes
        -   [x] server sided auth redirects
    -   [x] when auth redirect happens, client store doesnt get auth info
    -   [ ] sign out of all devices
    -   [x] add faker.js for test user generation

-   [ ] users

    -   [ ] friends

        -   [ ] server side

            -   [x] send req
            -   [x] accept req
            -   [x] decline req
            -   [x] decline all
            -   [x] unfriend
            -   [x] check if user is friend
            -   [x] get all friends of a user
            -   [x] get all pending requests of a user
            -   [x] get all sent requests of a user
            -   [x] unsend requests

        -   [ ] client side

            -   [ ] discover page

                -   [x] add navigation for diff searches (people, server)
                -   [x] search people
                    -   [x] add friend button states
                        -   [x] already friend
                        -   [x] sent request
                            -   [x] unsend a request
                        -   [x] yourself (currently not rendered at all)
                        -   [x] loading states
                    -   [x] error handling
                    -   [x] refetching data
                -   [x] pagination
                    -   [x] infinite scroll
                -   [ ] search servers

            -   [x] send request
            -   [x] show pending requests on friends sidebar tab
            -   [x] accept/decline req button
            -   [x] show friends on right sidebar tab
                -   [x] open context menu
                    -   [x] show profile button
                    -   [x] unfriend button
                -   [x] onclick open profile modal
                -   [x] unfriend from modal
            -   [x] update cache on request accepted
                -   [x] friends tab + requests tab
            -   [x] decline all button

    -   [ ] profile modal

        -   [x] improve the signup before profile

        -   [ ] integrate in curr user profile
        -   [ ] integrate in friends tab
        -   [ ] integrate in requests tab
        -   [ ] integrate in discovered users
        -   [ ] integrate in messages

        -   [ ] add profile edit
        -   [ ] add profile picture + banner maybe

-   [ ] direct messages

    -   [ ] search friends with suggestions (eligible)
    -   [ ] click "+" opens modal with list of eligible people
    -   [ ] clicking on user creates thread

-   [ ] messages

    -   [ ] mentions
        -   [ ] shows user card on click
    -   [ ] images/videos
        -   [ ] use mediafire maybe
    -   [ ] reply to messages
    -   [ ] reactions to messages
        -   [ ] only emojis
    -   [ ] maybe markup

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

-   [ ] discover
    -   [ ] search users
    -   [ ] search public channels
    -   [ ] filter by uni/semester/department
    -   [ ] recommend users/servers
