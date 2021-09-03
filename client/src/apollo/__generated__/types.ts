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
  cursor?: Maybe<Scalars['String']>;
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
}>;


export type DiscoverUsersQuery = { __typename?: 'Query', discoverUsers: Array<{ __typename?: 'User', id: string, displayName: string, avatarUrl?: Maybe<string>, university?: Maybe<string> }> };

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
    query DiscoverUsers($query: String!) {
  discoverUsers(query: $query) {
    id
    displayName
    avatarUrl
    university
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