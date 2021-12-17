# ToDo's

-   [ ] general

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
    -   [x] add faker.js for test user generation
    -   [ ] sign out of all devices
    -   [ ] signin with username or email

-   [ ] users

    -   [x] friends

        -   [x] server side

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
            -   [ ] request button state update on pending request already
                -   [ ] on click opens modal and confirms accept or decline (maybe)

    -   [ ] profile modal

        -   [x] improve the signup before profile

        -   [x] integrate in curr user profile
        -   [x] integrate in friends tab
        -   [x] integrate in requests tab
        -   [x] integrate in discovered users
        -   [ ] integrate in messages

-   [ ] direct messages

    -   [x] message threads
        -   [x] search friends with suggestions (eligible)
            -   [x] server side searching with debounce
        -   [x] clicking on user in search creates thread
            -   [x] threads are always there
            -   [x] add active message threads on user
        -   [x] query active threads in direct messages component
            -   [x] redirect to thread page on click
        -   [x] make thread page by id
            -   [x] invalid thread id ui handling (probably redirect to index)
            -   [x] make a default page for initial render
        -   [x] usercards in friends tab context menu message option
        -   [x] default index page for /messages and /thread
        -   [x] profile modal message button
            -   [x] created thread on click
        -   [ ] click "+" opens modal with list of eligible people (not sure about this button, might be removed)
            -   [ ] implement searching with debounce in modal

-   [ ] chat service

    -   [x] general

        -   [x] add dockerignore config for prod+dev
        -   [x] add container names on prod
        -   [x] remove /ws route from traefik
        -   [x] add redis
        -   [x] fix shared folder in docker container
        -   [x] add new chat service
        -   [x] add production config for chat service

    -   [x] socket

        -   [x] remove socket from api/web
        -   [x] use zustand for client socket stuff
        -   [x] add ioredis
        -   [x] figure out auth

            -   [x] authenticate on ws connection handshake
                -   [x] store auth info in redis (socket id as key)
                -   [x] remove cache on disconnect
            -   [x] graphql route for ws auth
            -   [x] use lightweight gql client for auth
            -   [x] use error events for emitting error
                -   [x] listen for errors in client

        -   [x] make event names
            -   [x] scalability with servers
            -   [x] dynamic names to be able to migrate later

    -   [ ] Api

        -   [x] make auth + room eligibility validator queries
        -   [x] save messages gql queries
        -   [x] create messages + update thread in a transaction
            -   [x] queries should be fire and forget queries
            -   [x] prevent multiple instance of api from inserting same message (load balanced query anyway)
        -   [x] authenticate internal requests
            -   [x] use internal key to sign jwt
        -   [x] test all rtc and socket auth events
            -   [x] socket session auth
            -   [x] join room auth
            -   [x] auth info cache deletion in redis store
            -   [x] error events listener
        -   [ ] frontend gql queries
            -   [x] get initial messages
            -   [ ] edit messages (maybe)
            -   [ ] reactions (maybe)
        -   [x] api persisted messages duplicate on replicas (major bug fix)

    -   [ ] Web

        -   [ ] make chat ui
            -   [x] formik
            -   [x] add profile modal
            -   [x] thread page query no cache
            -   [x] group messages by same author
            -   [x] hold shift + enter shouldnt submit form
            -   [x] pre formatted text
            -   [x] up/down arrow key event
            -   [ ] emoji picker
            -   [ ] stop auto scroll on hover
            -   [ ] paginated messages
        -   [x] socket client connect/disconnect event
        -   [x] send messageDTO
        -   [x] join:room event happens before connected (bug fix)
        -   [x] initial query to fetch messages
        -   [x] add error events listeners

    -   [x] shared types
        -   [x] add path alias on all service
        -   [x] server events
        -   [x] pubsub events
        -   [x] messages types
        -   [x] auth user types

-   [x] media upload

    -   [x] setup localstack
    -   [x] setup aws sdk
    -   [x] services for aws media file upload
    -   [x] api mutations/resolvers for gql file upload
    -   [x] web
        -   [x] file uploader
            -   [x] remove single images
        -   [x] media viewer
            -   {x}] modal with backdrop
            -   [x] fixed size?
    -   [x] update production env
    -   [x] add aws config to docs
        -   [x] commands to create bucket
        -   [x] add acl permission to bucket

-   [ ] messages

    -   [ ] media upload
        -   [x] use localstack
        -   [x] s3 bucket
        -   [x] images
        -   [ ] videos
        -   [ ] audio
        -   [ ] file upload
    -   [ ] mentions
        -   [ ] shows user card on click
    -   [ ] reply to messages
    -   [ ] reactions to messages
        -   [ ] only emojis
    -   [ ] maybe markup

-   [ ] settings page

    -   [ ] add profile edit
    -   [ ] add profile picture
    -   [ ] add banner maybe
    -   [x] logout
    -   [ ] sign out of all sessions
    -   [ ] change password

-   [ ] reactions/emojis

    -   [ ] emoji picker
    -   [ ] message reactions

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
    -   [x] search users
    -   [ ] search public channels
    -   [ ] filter by uni/semester/department
    -   [ ] recommend users/servers
