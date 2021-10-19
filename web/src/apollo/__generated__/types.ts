import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
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
};

/** Response object for authentication queries */
export type AuthResult = {
  __typename?: 'AuthResult';
  success: Scalars['Boolean'];
  user: User;
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

/** Message object type */
export type Message = {
  __typename?: 'Message';
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
  /** Returns an existing or newly created MessageThread */
  createMessageThread: MessageThread;
  /** Decline all pending friend requests */
  declineAllRequests: Scalars['Boolean'];
  /** Decline a pending friend request */
  declineRequest: FriendRequest;
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
};


export type MutationAcceptRequestArgs = {
  requestId: Scalars['String'];
};


export type MutationCreateMessageThreadArgs = {
  userId: Scalars['String'];
};


export type MutationDeclineRequestArgs = {
  requestId: Scalars['String'];
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
  /** Check if user is a friend */
  isFriend: Scalars['Boolean'];
  /** Returns a MessageThread by id */
  messageThread: MessageThread;
  /** Get pending requests of current user */
  pendingRequests: Array<FriendRequest>;
  /** Returns list of friends matching search term */
  searchFriends: Array<User>;
  /** Get sent requests of current user */
  sentRequests: Array<FriendRequest>;
  /** returns info for a user */
  user: User;
};


export type QueryDiscoverUsersArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit?: Scalars['Int'];
  query: Scalars['String'];
};


export type QueryHelloArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryIsFriendArgs = {
  userId: Scalars['String'];
};


export type QueryMessageThreadArgs = {
  threadId: Scalars['String'];
};


export type QuerySearchFriendsArgs = {
  searchTerm: Scalars['String'];
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};

/** Information about user session */
export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  pk: Scalars['Int'];
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['ID'];
};

export type SigninInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignupInput = {
  bio?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  semester?: Maybe<Scalars['Int']>;
  university?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

/** Response object for succesful queries */
export type SuccessResult = {
  __typename?: 'SuccessResult';
  success: Scalars['Boolean'];
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

export type DiscoverUsersQueryVariables = Exact<{
  query: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['Int']>;
}>;


export type DiscoverUsersQuery = { __typename?: 'Query', discoverUsers: Array<{ __typename?: 'User', id: string, pk: number, displayName: string, avatarUrl?: string | null | undefined, university?: string | null | undefined, friends: Array<{ __typename?: 'Friendship', id: string, firstUserId: string, secondUserId: string }>, pendingRequests: Array<{ __typename?: 'FriendRequest', id: string, fromUserId: string }>, sentRequests: Array<{ __typename?: 'FriendRequest', id: string, toUserId: string }> }> };

export type FriendsListQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendsListQuery = { __typename?: 'Query', friendsList: Array<{ __typename?: 'Friendship', id: string, firstUserId: string, secondUserId: string, firstUser: { __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null | undefined, university?: string | null | undefined }, secondUser: { __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null | undefined, university?: string | null | undefined } }> };

export type PendingRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingRequestsQuery = { __typename?: 'Query', pendingRequests: Array<{ __typename?: 'FriendRequest', id: string, fromUserId: string, toUserId: string, fromUser: { __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null | undefined, university?: string | null | undefined }, toUser: { __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null | undefined, university?: string | null | undefined } }> };

export type DeclineAllRequestMutationVariables = Exact<{ [key: string]: never; }>;


export type DeclineAllRequestMutation = { __typename?: 'Mutation', declineAllRequests: boolean };

export type ActiveMessageThreadsQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveMessageThreadsQuery = { __typename?: 'Query', activeMessageThreads: Array<{ __typename?: 'MessageThread', id: string, updatedAt: any, participants: Array<{ __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null | undefined }> }> };

export type GetUserDataQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserDataQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, username: string, displayName: string, avatarUrl?: string | null | undefined, role: string, bio?: string | null | undefined, createdAt: any, updatedAt: any, university?: string | null | undefined, department?: string | null | undefined, semester?: number | null | undefined, pendingRequests: Array<{ __typename?: 'FriendRequest', id: string, fromUserId: string }>, sentRequests: Array<{ __typename?: 'FriendRequest', id: string, toUserId: string }>, friends: Array<{ __typename?: 'Friendship', firstUserId: string, secondUserId: string }> } };

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


export type SearchFriendsQuery = { __typename?: 'Query', searchFriends: Array<{ __typename?: 'User', id: string, username: string, displayName: string, university?: string | null | undefined, avatarUrl?: string | null | undefined }> };

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


export type CreateMessageThreadMutation = { __typename?: 'Mutation', createMessageThread: { __typename?: 'MessageThread', id: string, participants: Array<{ __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null | undefined }> } };

export type UnfriendMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UnfriendMutation = { __typename?: 'Mutation', unfriend: { __typename?: 'Friendship', id: string } };

export type GetMessageThreadQueryVariables = Exact<{
  threadId: Scalars['String'];
}>;


export type GetMessageThreadQuery = { __typename?: 'Query', messageThread: { __typename?: 'MessageThread', id: string, participants: Array<{ __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null | undefined }>, messages: Array<{ __typename?: 'Message', id: string, body: string, createdAt: any, author: { __typename?: 'User', id: string, username: string, displayName: string, avatarUrl?: string | null | undefined } }> } };

export type SignupMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthResult', success: boolean } };

export type SigninMutationVariables = Exact<{
  input: SigninInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'AuthResult', success: boolean, user: { __typename?: 'User', id: string, email: string, username: string, displayName: string, avatarUrl?: string | null | undefined, role: string, createdAt: any, updatedAt: any, university?: string | null | undefined, department?: string | null | undefined, semester?: number | null | undefined } } };

export type SignoutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignoutMutation = { __typename?: 'Mutation', signout: { __typename?: 'SuccessResult', success: boolean } };

export type AuthorizeQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthorizeQuery = { __typename?: 'Query', authorize: { __typename?: 'AuthResult', success: boolean, user: { __typename?: 'User', id: string, email: string, username: string, displayName: string, avatarUrl?: string | null | undefined, role: string, createdAt: any, updatedAt: any, university?: string | null | undefined, department?: string | null | undefined, semester?: number | null | undefined } } };


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