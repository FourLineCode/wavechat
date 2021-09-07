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
    -   [x] when auth redirect happens, client store doesnt get auth info
    -   [ ] sign out of all devices

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
                    -   [x] error handling
                    -   [x] refetching data
                -   [ ] pagination
                    -   [ ] has next page info
                -   [ ] search servers

            -   [x] send request
            -   [ ] show pending requests on friends page
            -   [ ] accept req button
            -   [ ] show friends on right side bar
            -   [ ] update cache on request accepted

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
