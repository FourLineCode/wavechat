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


export type Mutation = {
  __typename?: 'Mutation';
  /** Sign in user */
  signin: AuthResult;
  /** Sign out user */
  signout: SuccessResult;
  /** Sign up new user */
  signup: AuthResult;
};


export type MutationSigninArgs = {
  input: SigninInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};

export type Query = {
  __typename?: 'Query';
  /** Authorize user session */
  authorize: AuthResult;
  /** returns all users */
  getAllUsers: Array<User>;
  hello: Scalars['String'];
};


export type QueryHelloArgs = {
  name?: Maybe<Scalars['String']>;
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
  id: Scalars['ID'];
  role: Scalars['String'];
  semester?: Maybe<Scalars['Int']>;
  sessions: Array<Session>;
  university?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
};

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