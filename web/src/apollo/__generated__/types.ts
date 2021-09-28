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

export type AuthResult = {
  __typename?: 'AuthResult';
  success: Scalars['Boolean'];
  user: User;
};

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

export type Mutation = {
  __typename?: 'Mutation';
  /** Accept a pending friend request */
  acceptRequest: Friendship;
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
  /** Get pending requests of current user */
  pendingRequests: Array<FriendRequest>;
  /** Get sent requests of current user */
  sentRequests: Array<FriendRequest>;
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
  department?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  semester?: Maybe<Scalars['Int']>;
  university?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type SuccessResult = {
  __typename?: 'SuccessResult';
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  department?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  email: Scalars['String'];
  friends: Array<Friendship>;
  id: Scalars['ID'];
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


export type DiscoverUsersQuery = { __typename?: 'Query', discoverUsers: Array<{ __typename?: 'User', id: string, pk: number, displayName: string, avatarUrl?: Maybe<string>, university?: Maybe<string>, friends: Array<{ __typename?: 'Friendship', id: string, firstUserId: string, secondUserId: string }>, pendingRequests: Array<{ __typename?: 'FriendRequest', id: string, fromUserId: string }> }> };

export type DiscoverSendRequestMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type DiscoverSendRequestMutation = { __typename?: 'Mutation', sendRequest: { __typename?: 'FriendRequest', id: string } };

export type DiscoverUnfriendMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type DiscoverUnfriendMutation = { __typename?: 'Mutation', unfriend: { __typename?: 'Friendship', id: string } };

export type DiscoverUnsendRequestMutationVariables = Exact<{
  requestId: Scalars['String'];
}>;


export type DiscoverUnsendRequestMutation = { __typename?: 'Mutation', unsendRequest: boolean };

export type UnfriendUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UnfriendUserMutation = { __typename?: 'Mutation', unfriend: { __typename?: 'Friendship', id: string } };

export type AcceptRequestMutationVariables = Exact<{
  requestId: Scalars['String'];
}>;


export type AcceptRequestMutation = { __typename?: 'Mutation', acceptRequest: { __typename?: 'Friendship', id: string } };

export type DeclineRequestMutationVariables = Exact<{
  requestId: Scalars['String'];
}>;


export type DeclineRequestMutation = { __typename?: 'Mutation', declineRequest: { __typename?: 'FriendRequest', id: string } };

export type FriendsListQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendsListQuery = { __typename?: 'Query', friendsList: Array<{ __typename?: 'Friendship', id: string, firstUserId: string, secondUserId: string, firstUser: { __typename?: 'User', id: string, displayName: string, university?: Maybe<string> }, secondUser: { __typename?: 'User', id: string, displayName: string, university?: Maybe<string> } }> };

export type PendingRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingRequestsQuery = { __typename?: 'Query', pendingRequests: Array<{ __typename?: 'FriendRequest', id: string, fromUserId: string, toUserId: string, fromUser: { __typename?: 'User', id: string, displayName: string, university?: Maybe<string> }, toUser: { __typename?: 'User', id: string, displayName: string, university?: Maybe<string> } }> };

export type SignupMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthResult', success: boolean } };

export type SigninMutationVariables = Exact<{
  input: SigninInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'AuthResult', success: boolean, user: { __typename?: 'User', id: string, email: string, username: string, displayName: string, avatarUrl?: Maybe<string>, role: string, createdAt: any, updatedAt: any, university?: Maybe<string>, department?: Maybe<string>, semester?: Maybe<number> } } };

export type SignoutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignoutMutation = { __typename?: 'Mutation', signout: { __typename?: 'SuccessResult', success: boolean } };

export type AuthorizeQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthorizeQuery = { __typename?: 'Query', authorize: { __typename?: 'AuthResult', success: boolean, user: { __typename?: 'User', id: string, email: string, username: string, displayName: string, avatarUrl?: Maybe<string>, role: string, createdAt: any, updatedAt: any, university?: Maybe<string>, department?: Maybe<string>, semester?: Maybe<number> } } };


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
  }
}
    `;
export const DiscoverSendRequestDocument = gql`
    mutation DiscoverSendRequest($userId: String!) {
  sendRequest(userId: $userId) {
    id
  }
}
    `;
export type DiscoverSendRequestMutationOptions = Apollo.BaseMutationOptions<DiscoverSendRequestMutation, DiscoverSendRequestMutationVariables>;
export const DiscoverUnfriendDocument = gql`
    mutation DiscoverUnfriend($userId: String!) {
  unfriend(userId: $userId) {
    id
  }
}
    `;
export type DiscoverUnfriendMutationOptions = Apollo.BaseMutationOptions<DiscoverUnfriendMutation, DiscoverUnfriendMutationVariables>;
export const DiscoverUnsendRequestDocument = gql`
    mutation DiscoverUnsendRequest($requestId: String!) {
  unsendRequest(requestId: $requestId)
}
    `;
export type DiscoverUnsendRequestMutationOptions = Apollo.BaseMutationOptions<DiscoverUnsendRequestMutation, DiscoverUnsendRequestMutationVariables>;
export const UnfriendUserDocument = gql`
    mutation UnfriendUser($userId: String!) {
  unfriend(userId: $userId) {
    id
  }
}
    `;
export type UnfriendUserMutationOptions = Apollo.BaseMutationOptions<UnfriendUserMutation, UnfriendUserMutationVariables>;
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
export const FriendsListDocument = gql`
    query FriendsList {
  friendsList {
    id
    firstUserId
    firstUser {
      id
      displayName
      university
    }
    secondUserId
    secondUser {
      id
      displayName
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
      displayName
      university
    }
    toUserId
    toUser {
      id
      displayName
      university
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