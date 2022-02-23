import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

/** Response object for authentication queries */
export type AuthResult = {
  __typename?: 'AuthResult';
  success: Scalars['Boolean'];
  user: User;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type CreateMessageInput = {
  attachments?: InputMaybe<Array<MediaDtoInput>>;
  author: UserDtoInput;
  authorId: Scalars['String'];
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  pk?: InputMaybe<Scalars['Int']>;
  threadId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CreateServerInput = {
  iconUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  type: Scalars['String'];
};

/** FriendRequest object type */
export type FriendRequest = {
  __typename?: 'FriendRequest';
  createdAt: Scalars['Date'];
  fromUser: User;
  fromUserId: Scalars['ID'];
  id: Scalars['ID'];
  pk: Scalars['Int'];
  toUser: User;
  toUserId: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

/** Friendship object type */
export type Friendship = {
  __typename?: 'Friendship';
  createdAt: Scalars['Date'];
  firstUser: User;
  firstUserId: Scalars['ID'];
  id: Scalars['ID'];
  pk: Scalars['Int'];
  secondUser: User;
  secondUserId: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

/** Media object */
export type Media = {
  __typename?: 'Media';
  createdAt: Scalars['Date'];
  encoding: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['ID'];
  message: Message;
  messageId: Scalars['ID'];
  mimetype: Scalars['String'];
  pk: Scalars['Int'];
  updatedAt: Scalars['Date'];
  url: Scalars['String'];
};

/** Response object for file upload */
export type MediaDto = {
  __typename?: 'MediaDTO';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  url: Scalars['String'];
};

export type MediaDtoInput = {
  encoding: Scalars['String'];
  filename: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  mimetype: Scalars['String'];
  url: Scalars['String'];
};

/** Message object type */
export type Message = {
  __typename?: 'Message';
  attachments: Array<Media>;
  author: User;
  authorId: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  pk: Scalars['Int'];
  thread: MessageThread;
  threadId: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

/** MessageThread object type */
export type MessageThread = {
  __typename?: 'MessageThread';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  messages: Array<Message>;
  participants: Array<User>;
  pk: Scalars['Int'];
  updatedAt: Scalars['Date'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Accept a pending friend request */
  acceptRequest: Friendship;
  /** Change users password */
  changePassword: SuccessResult;
  /** Saves a message to the database */
  createMessage: Message;
  /** Returns an existing or newly created MessageThread */
  createMessageThread: MessageThread;
  /** Create a new server */
  createServer: Server;
  /** Decline all pending friend requests */
  declineAllRequests: Scalars['Boolean'];
  /** Decline a pending friend request */
  declineRequest: FriendRequest;
  /** Invite a user to a server */
  inviteUserToServerById: ServerInvite;
  /** Removes all sessions other than current session */
  removeOtherSessions: SuccessResult;
  /** Send a friend request to a user */
  sendRequest: FriendRequest;
  /** Sign in user */
  signin: AuthResult;
  /** Sign out user */
  signout: SuccessResult;
  /** Sign up new user */
  signup: AuthResult;
  /** Unfriend a user */
  unfriend: Friendship;
  /** Unsend a sent friend request */
  unsendRequest: Scalars['Boolean'];
  /** Update info for a user */
  updateUser: User;
  /** Upload multiple files */
  uploadMultipleFiles: Array<MediaDto>;
  /** Upload single file */
  uploadSingleFile: MediaDto;
};


export type MutationAcceptRequestArgs = {
  requestId: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreateMessageArgs = {
  messageDTO: CreateMessageInput;
};


export type MutationCreateMessageThreadArgs = {
  userId: Scalars['String'];
};


export type MutationCreateServerArgs = {
  input: CreateServerInput;
};


export type MutationDeclineRequestArgs = {
  requestId: Scalars['String'];
};


export type MutationInviteUserToServerByIdArgs = {
  serverId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationSendRequestArgs = {
  userId: Scalars['String'];
};


export type MutationSigninArgs = {
  input: SigninInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationUnfriendArgs = {
  userId: Scalars['String'];
};


export type MutationUnsendRequestArgs = {
  requestId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUploadMultipleFilesArgs = {
  files: Array<Scalars['Upload']>;
};


export type MutationUploadSingleFileArgs = {
  file: Scalars['Upload'];
};

export type Query = {
  __typename?: 'Query';
  /** Returns currently active MessageThreads for user */
  activeMessageThreads: Array<MessageThread>;
  /** returns all users */
  allUsers: Array<User>;
  /** Authorize user session */
  authorize: AuthResult;
  /** Gets random discoverable users for a client */
  discoverUsers: Array<User>;
  /** Get friends list of current user */
  friendsList: Array<Friendship>;
  hello: Scalars['String'];
  /** Get user list for a server that are invitable */
  invitableUserList: Array<User>;
  /** Check if user is a friend */
  isFriend: Scalars['Boolean'];
  /** Authorizes any rtc connection */
  isSocketAuthorized: SocketAuthorizedResponse;
  /** Authorize a user to join a rtc socket room */
  isUserInThread: Scalars['Boolean'];
  /** Get all joined servers for current user */
  joinedServers: Array<Server>;
  /** Returns a MessageThread by id */
  messageThread: MessageThread;
  /** Get pending requests of current user */
  pendingRequests: Array<FriendRequest>;
  /** Returns list of friends matching search term */
  searchFriends: Array<User>;
  /** Get sent requests of current user */
  sentRequests: Array<FriendRequest>;
  /** Get a server by id */
  server: Server;
  /** Returns all active sessions */
  sessions: Array<Session>;
  /** Returns all messages owned by a thread */
  threadMessages: Array<Message>;
  /** returns info for a user */
  user: User;
  /** returns info for a user by username */
  userByUsername: User;
};


export type QueryDiscoverUsersArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit?: Scalars['Int'];
  query: Scalars['String'];
};


export type QueryHelloArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryInvitableUserListArgs = {
  serverId: Scalars['String'];
};


export type QueryIsFriendArgs = {
  userId: Scalars['String'];
};


export type QueryIsSocketAuthorizedArgs = {
  sessionId: Scalars['String'];
};


export type QueryIsUserInThreadArgs = {
  threadId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryMessageThreadArgs = {
  threadId: Scalars['String'];
};


export type QuerySearchFriendsArgs = {
  searchTerm: Scalars['String'];
};


export type QueryServerArgs = {
  serverId: Scalars['String'];
};


export type QueryThreadMessagesArgs = {
  threadId: Scalars['String'];
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};

/** Server object type */
export type Server = {
  __typename?: 'Server';
  adminUserIds: Array<Scalars['String']>;
  bannedUserIds: Array<Scalars['String']>;
  bannerUrl?: Maybe<Scalars['String']>;
  channels: Array<ServerChannel>;
  createdAt: Scalars['Date'];
  iconUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  members: Array<User>;
  name: Scalars['String'];
  owner: User;
  ownerId: Scalars['String'];
  pendingInvites: Array<ServerInvite>;
  pk: Scalars['Int'];
  type: Scalars['String'];
  updatedAt: Scalars['Date'];
};

/** ServerChannel object type */
export type ServerChannel = {
  __typename?: 'ServerChannel';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  locked: Scalars['Boolean'];
  name: Scalars['String'];
  pk: Scalars['Int'];
  server: Server;
  serverId: Scalars['String'];
  thread: MessageThread;
  threadId: Scalars['String'];
  updatedAt: Scalars['Date'];
};

/** ServerInvite object type */
export type ServerInvite = {
  __typename?: 'ServerInvite';
  createdAt: Scalars['Date'];
  fromUser: User;
  fromUserId: Scalars['String'];
  id: Scalars['ID'];
  pk: Scalars['Int'];
  server: Server;
  serverId: Scalars['String'];
  toUser: User;
  toUserId: Scalars['String'];
  updatedAt: Scalars['Date'];
};

/** Information about user session */
export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  pk: Scalars['Int'];
  updatedAt: Scalars['Date'];
  user: User;
  userAgent?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};

export type SigninInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignupInput = {
  bio?: InputMaybe<Scalars['String']>;
  department?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  semester?: InputMaybe<Scalars['Int']>;
  university?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

/** Response object for authorized socket connections */
export type SocketAuthorizedResponse = {
  __typename?: 'SocketAuthorizedResponse';
  authorized: Scalars['Boolean'];
  user?: Maybe<User>;
};

/** Response object for succesful queries */
export type SuccessResult = {
  __typename?: 'SuccessResult';
  success: Scalars['Boolean'];
};

export type UpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  department?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  semester?: InputMaybe<Scalars['Int']>;
  university?: InputMaybe<Scalars['String']>;
};

/** User object type */
export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  department?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  email: Scalars['String'];
  friends: Array<Friendship>;
  id: Scalars['ID'];
  messageThreads: Array<MessageThread>;
  messages: Array<Message>;
  pendingRequests: Array<FriendRequest>;
  pk: Scalars['Int'];
  role: Scalars['String'];
  semester?: Maybe<Scalars['Int']>;
  sentRequests: Array<FriendRequest>;
  sessions: Array<Session>;
  university?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
};

export type UserDtoInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  displayName: Scalars['String'];
  id: Scalars['String'];
  username: Scalars['String'];
};

export type DiscoverUsersQueryVariables = Exact<{
  query: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type DiscoverUsersQuery = { __typename?: 'Query', discoverUsers: Array<{ __typename?: 'User', id: string, pk: number, displayName: string, avatarUrl?: string | null, university?: string | null, friends: Array<{ __typename?: 'Friendship', id: string, firstUserId: string, secondUserId: string }>, pendingRequests: Array<{ __typename?: 'FriendRequest', id: string, fromUserId: string }>, sentRequests: Array<{ __typename?: 'FriendRequest', id: string, toUserId: string }> }> };

export type FriendsListQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendsListQuery = { __typename?: 'Query', friendsList: Array<{ __typename?: 'Friendship', id: string, firstUserId: string, secondUserId: string, firstUser: { __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null, university?: string | null }, secondUser: { __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null, university?: string | null } }> };

export type PendingRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingRequestsQuery = { __typename?: 'Query', pendingRequests: Array<{ __typename?: 'FriendRequest', id: string, fromUserId: string, toUserId: string, fromUser: { __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null, university?: string | null }, toUser: { __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null, university?: string | null } }> };

export type DeclineAllRequestMutationVariables = Exact<{ [key: string]: never; }>;


export type DeclineAllRequestMutation = { __typename?: 'Mutation', declineAllRequests: boolean };

export type ActiveMessageThreadsQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveMessageThreadsQuery = { __typename?: 'Query', activeMessageThreads: Array<{ __typename?: 'MessageThread', id: string, updatedAt: any, participants: Array<{ __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null }> }> };

export type UploadMultipleFilesMutationVariables = Exact<{
  files: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type UploadMultipleFilesMutation = { __typename?: 'Mutation', uploadMultipleFiles: Array<{ __typename?: 'MediaDTO', url: string, filename: string, mimetype: string, encoding: string }> };

export type ThreadMessagesQueryVariables = Exact<{
  threadId: Scalars['String'];
}>;


export type ThreadMessagesQuery = { __typename?: 'Query', threadMessages: Array<{ __typename?: 'Message', id: string, pk: number, body: string, createdAt: any, updatedAt: any, threadId: string, authorId: string, attachments: Array<{ __typename?: 'Media', id: string, url: string, filename: string, mimetype: string }>, author: { __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null } }> };

export type GetJoinedServersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJoinedServersQuery = { __typename?: 'Query', joinedServers: Array<{ __typename?: 'Server', id: string, name: string, iconUrl?: string | null }> };

export type GetUserDataQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserDataQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, username: string, displayName: string, avatarUrl?: string | null, role: string, bio?: string | null, createdAt: any, updatedAt: any, university?: string | null, department?: string | null, semester?: number | null, pendingRequests: Array<{ __typename?: 'FriendRequest', id: string, fromUserId: string }>, sentRequests: Array<{ __typename?: 'FriendRequest', id: string, toUserId: string }>, friends: Array<{ __typename?: 'Friendship', firstUserId: string, secondUserId: string }> } };

export type SendRequestMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type SendRequestMutation = { __typename?: 'Mutation', sendRequest: { __typename?: 'FriendRequest', id: string } };

export type UnsendRequestMutationVariables = Exact<{
  requestId: Scalars['String'];
}>;


export type UnsendRequestMutation = { __typename?: 'Mutation', unsendRequest: boolean };

export type SearchFriendsQueryVariables = Exact<{
  searchTerm: Scalars['String'];
}>;


export type SearchFriendsQuery = { __typename?: 'Query', searchFriends: Array<{ __typename?: 'User', id: string, username: string, displayName: string, university?: string | null, avatarUrl?: string | null }> };

export type CreateServerMutationVariables = Exact<{
  input: CreateServerInput;
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer: { __typename?: 'Server', id: string } };

export type UploadServerIconMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadServerIconMutation = { __typename?: 'Mutation', uploadSingleFile: { __typename?: 'MediaDTO', url: string, filename: string, mimetype: string, encoding: string } };

export type InviteUserToServerByIdMutationVariables = Exact<{
  serverId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type InviteUserToServerByIdMutation = { __typename?: 'Mutation', inviteUserToServerById: { __typename?: 'ServerInvite', id: string } };

export type GetInvitableUserListQueryVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type GetInvitableUserListQuery = { __typename?: 'Query', invitableUserList: Array<{ __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null, university?: string | null }> };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'SuccessResult', success: boolean } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, email: string, username: string, displayName: string, avatarUrl?: string | null, bio?: string | null, role: string, createdAt: any, updatedAt: any, university?: string | null, department?: string | null, semester?: number | null } };

export type UploadAvatarMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadAvatarMutation = { __typename?: 'Mutation', uploadSingleFile: { __typename?: 'MediaDTO', url: string, filename: string, mimetype: string, encoding: string } };

export type GetSessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionsQuery = { __typename?: 'Query', sessions: Array<{ __typename?: 'Session', id: string, createdAt: any, userAgent?: string | null }> };

export type RemoveOtherSessionsMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveOtherSessionsMutation = { __typename?: 'Mutation', removeOtherSessions: { __typename?: 'SuccessResult', success: boolean } };

export type AcceptRequestMutationVariables = Exact<{
  requestId: Scalars['String'];
}>;


export type AcceptRequestMutation = { __typename?: 'Mutation', acceptRequest: { __typename?: 'Friendship', id: string } };

export type DeclineRequestMutationVariables = Exact<{
  requestId: Scalars['String'];
}>;


export type DeclineRequestMutation = { __typename?: 'Mutation', declineRequest: { __typename?: 'FriendRequest', id: string } };

export type IsFriendQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type IsFriendQuery = { __typename?: 'Query', isFriend: boolean };

export type CreateMessageThreadMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type CreateMessageThreadMutation = { __typename?: 'Mutation', createMessageThread: { __typename?: 'MessageThread', id: string, participants: Array<{ __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null }> } };

export type UnfriendMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UnfriendMutation = { __typename?: 'Mutation', unfriend: { __typename?: 'Friendship', id: string } };

export type GetMessageThreadQueryVariables = Exact<{
  threadId: Scalars['String'];
}>;


export type GetMessageThreadQuery = { __typename?: 'Query', messageThread: { __typename?: 'MessageThread', id: string, participants: Array<{ __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null }>, messages: Array<{ __typename?: 'Message', id: string, body: string, createdAt: any, author: { __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null } }> } };

export type GetServerQueryVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type GetServerQuery = { __typename?: 'Query', server: { __typename?: 'Server', id: string, name: string, type: string, iconUrl?: string | null, bannerUrl?: string | null, createdAt: any, members: Array<{ __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null, university?: string | null, department?: string | null }> } };

export type SignupMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthResult', success: boolean } };

export type SigninMutationVariables = Exact<{
  input: SigninInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'AuthResult', success: boolean, user: { __typename?: 'User', id: string, email: string, username: string, displayName: string, avatarUrl?: string | null, bio?: string | null, role: string, createdAt: any, updatedAt: any, university?: string | null, department?: string | null, semester?: number | null } } };

export type SignoutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignoutMutation = { __typename?: 'Mutation', signout: { __typename?: 'SuccessResult', success: boolean } };

export type AuthorizeQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthorizeQuery = { __typename?: 'Query', authorize: { __typename?: 'AuthResult', success: boolean, user: { __typename?: 'User', id: string, email: string, username: string, displayName: string, avatarUrl?: string | null, bio?: string | null, role: string, createdAt: any, updatedAt: any, university?: string | null, department?: string | null, semester?: number | null } } };


export const DiscoverUsersDocument = gql`
    query DiscoverUsers($query: String!, $limit: Int, $cursor: Int) {
  discoverUsers(query: $query, limit: $limit, cursor: $cursor) {
    id
    pk
    displayName
    avatarUrl
    university
    friends {
      id
      firstUserId
      secondUserId
    }
    pendingRequests {
      id
      fromUserId
    }
    sentRequests {
      id
      toUserId
    }
  }
}
    `;
export const FriendsListDocument = gql`
    query FriendsList {
  friendsList {
    id
    firstUserId
    firstUser {
      id
      username
      displayName
      avatarUrl
      university
    }
    secondUserId
    secondUser {
      id
      username
      displayName
      avatarUrl
      university
    }
  }
}
    `;
export const PendingRequestsDocument = gql`
    query PendingRequests {
  pendingRequests {
    id
    fromUserId
    fromUser {
      id
      username
      displayName
      avatarUrl
      university
    }
    toUserId
    toUser {
      id
      username
      displayName
      avatarUrl
      university
    }
  }
}
    `;
export const DeclineAllRequestDocument = gql`
    mutation DeclineAllRequest {
  declineAllRequests
}
    `;
export type DeclineAllRequestMutationOptions = Apollo.BaseMutationOptions<DeclineAllRequestMutation, DeclineAllRequestMutationVariables>;
export const ActiveMessageThreadsDocument = gql`
    query ActiveMessageThreads {
  activeMessageThreads {
    id
    updatedAt
    participants {
      id
      username
      displayName
      avatarUrl
    }
  }
}
    `;
export const UploadMultipleFilesDocument = gql`
    mutation UploadMultipleFiles($files: [Upload!]!) {
  uploadMultipleFiles(files: $files) {
    url
    filename
    mimetype
    encoding
  }
}
    `;
export type UploadMultipleFilesMutationOptions = Apollo.BaseMutationOptions<UploadMultipleFilesMutation, UploadMultipleFilesMutationVariables>;
export const ThreadMessagesDocument = gql`
    query ThreadMessages($threadId: String!) {
  threadMessages(threadId: $threadId) {
    id
    pk
    body
    attachments {
      id
      url
      filename
      mimetype
    }
    createdAt
    updatedAt
    threadId
    authorId
    author {
      id
      username
      displayName
      avatarUrl
    }
  }
}
    `;
export const GetJoinedServersDocument = gql`
    query GetJoinedServers {
  joinedServers {
    id
    name
    iconUrl
  }
}
    `;
export const GetUserDataDocument = gql`
    query GetUserData($userId: String!) {
  user(userId: $userId) {
    id
    email
    username
    displayName
    avatarUrl
    role
    bio
    createdAt
    updatedAt
    university
    department
    semester
    pendingRequests {
      id
      fromUserId
    }
    sentRequests {
      id
      toUserId
    }
    friends {
      firstUserId
      secondUserId
    }
  }
}
    `;
export const SendRequestDocument = gql`
    mutation SendRequest($userId: String!) {
  sendRequest(userId: $userId) {
    id
  }
}
    `;
export type SendRequestMutationOptions = Apollo.BaseMutationOptions<SendRequestMutation, SendRequestMutationVariables>;
export const UnsendRequestDocument = gql`
    mutation UnsendRequest($requestId: String!) {
  unsendRequest(requestId: $requestId)
}
    `;
export type UnsendRequestMutationOptions = Apollo.BaseMutationOptions<UnsendRequestMutation, UnsendRequestMutationVariables>;
export const SearchFriendsDocument = gql`
    query SearchFriends($searchTerm: String!) {
  searchFriends(searchTerm: $searchTerm) {
    id
    username
    displayName
    university
    avatarUrl
  }
}
    `;
export const CreateServerDocument = gql`
    mutation CreateServer($input: CreateServerInput!) {
  createServer(input: $input) {
    id
  }
}
    `;
export type CreateServerMutationOptions = Apollo.BaseMutationOptions<CreateServerMutation, CreateServerMutationVariables>;
export const UploadServerIconDocument = gql`
    mutation UploadServerIcon($file: Upload!) {
  uploadSingleFile(file: $file) {
    url
    filename
    mimetype
    encoding
  }
}
    `;
export type UploadServerIconMutationOptions = Apollo.BaseMutationOptions<UploadServerIconMutation, UploadServerIconMutationVariables>;
export const InviteUserToServerByIdDocument = gql`
    mutation InviteUserToServerById($serverId: String!, $userId: String!) {
  inviteUserToServerById(serverId: $serverId, userId: $userId) {
    id
  }
}
    `;
export type InviteUserToServerByIdMutationOptions = Apollo.BaseMutationOptions<InviteUserToServerByIdMutation, InviteUserToServerByIdMutationVariables>;
export const GetInvitableUserListDocument = gql`
    query GetInvitableUserList($serverId: String!) {
  invitableUserList(serverId: $serverId) {
    id
    username
    displayName
    avatarUrl
    university
  }
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    success
  }
}
    `;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    email
    username
    displayName
    avatarUrl
    bio
    role
    createdAt
    updatedAt
    university
    department
    semester
  }
}
    `;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UploadAvatarDocument = gql`
    mutation UploadAvatar($file: Upload!) {
  uploadSingleFile(file: $file) {
    url
    filename
    mimetype
    encoding
  }
}
    `;
export type UploadAvatarMutationOptions = Apollo.BaseMutationOptions<UploadAvatarMutation, UploadAvatarMutationVariables>;
export const GetSessionsDocument = gql`
    query GetSessions {
  sessions {
    id
    createdAt
    userAgent
  }
}
    `;
export const RemoveOtherSessionsDocument = gql`
    mutation RemoveOtherSessions {
  removeOtherSessions {
    success
  }
}
    `;
export type RemoveOtherSessionsMutationOptions = Apollo.BaseMutationOptions<RemoveOtherSessionsMutation, RemoveOtherSessionsMutationVariables>;
export const AcceptRequestDocument = gql`
    mutation AcceptRequest($requestId: String!) {
  acceptRequest(requestId: $requestId) {
    id
  }
}
    `;
export type AcceptRequestMutationOptions = Apollo.BaseMutationOptions<AcceptRequestMutation, AcceptRequestMutationVariables>;
export const DeclineRequestDocument = gql`
    mutation DeclineRequest($requestId: String!) {
  declineRequest(requestId: $requestId) {
    id
  }
}
    `;
export type DeclineRequestMutationOptions = Apollo.BaseMutationOptions<DeclineRequestMutation, DeclineRequestMutationVariables>;
export const IsFriendDocument = gql`
    query IsFriend($userId: String!) {
  isFriend(userId: $userId)
}
    `;
export const CreateMessageThreadDocument = gql`
    mutation CreateMessageThread($userId: String!) {
  createMessageThread(userId: $userId) {
    id
    participants {
      id
      username
      displayName
      avatarUrl
    }
  }
}
    `;
export type CreateMessageThreadMutationOptions = Apollo.BaseMutationOptions<CreateMessageThreadMutation, CreateMessageThreadMutationVariables>;
export const UnfriendDocument = gql`
    mutation Unfriend($userId: String!) {
  unfriend(userId: $userId) {
    id
  }
}
    `;
export type UnfriendMutationOptions = Apollo.BaseMutationOptions<UnfriendMutation, UnfriendMutationVariables>;
export const GetMessageThreadDocument = gql`
    query GetMessageThread($threadId: String!) {
  messageThread(threadId: $threadId) {
    id
    participants {
      id
      username
      displayName
      avatarUrl
    }
    messages {
      id
      body
      createdAt
      author {
        id
        username
        displayName
        avatarUrl
      }
    }
  }
}
    `;
export const GetServerDocument = gql`
    query GetServer($serverId: String!) {
  server(serverId: $serverId) {
    id
    name
    type
    iconUrl
    bannerUrl
    createdAt
    members {
      id
      username
      displayName
      avatarUrl
      university
      department
    }
  }
}
    `;
export const SignupDocument = gql`
    mutation Signup($input: SignupInput!) {
  signup(input: $input) {
    success
  }
}
    `;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const SigninDocument = gql`
    mutation Signin($input: SigninInput!) {
  signin(input: $input) {
    success
    user {
      id
      email
      username
      displayName
      avatarUrl
      bio
      role
      createdAt
      updatedAt
      university
      department
      semester
    }
  }
}
    `;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const SignoutDocument = gql`
    mutation Signout {
  signout {
    success
  }
}
    `;
export type SignoutMutationOptions = Apollo.BaseMutationOptions<SignoutMutation, SignoutMutationVariables>;
export const AuthorizeDocument = gql`
    query Authorize {
  authorize {
    success
    user {
      id
      email
      username
      displayName
      avatarUrl
      bio
      role
      createdAt
      updatedAt
      university
      department
      semester
    }
  }
}
    `;