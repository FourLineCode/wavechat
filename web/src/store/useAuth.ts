import { gql } from "@apollo/client";
import toast from "react-hot-toast";
import { client } from "src/apollo/client";
import {
	SigninInput,
	SigninMutation,
	SigninMutationVariables,
	SignoutMutation,
	SignupInput,
	SignupMutation,
	SignupMutationVariables,
	User,
} from "src/apollo/__generated__/types";
import { parseErrorMessage } from "src/utils/parseErrorMessage";
import create, { State } from "zustand";

interface Response {
	success: boolean;
	message: string;
}

export interface AuthState extends State {
	authorized: boolean | null;
	user: User | null;
	signoutInFlight: boolean;
	signup: (arg: SignupInput) => Promise<Response>;
	signin: (arg: SigninInput) => Promise<Response>;
	signout: () => Promise<Response>;
	setAuthInfo: (arg: Partial<AuthState>) => void;
}

export const useAuth = create<AuthState>((set, get) => ({
	authorized: null,
	user: null,
	signoutInFlight: false,
	signup: async ({ email, password, username, bio, department, semester, university }) => {
		try {
			const { data } = await client.mutate<SignupMutation, SignupMutationVariables>({
				mutation: gql`
					mutation Signup($input: SignupInput!) {
						signup(input: $input) {
							success
						}
					}
				`,
				variables: {
					input: {
						email,
						password,
						username,
						bio,
						department,
						semester,
						university,
					},
				},
			});

			if (data?.signup.success) {
				await get().signin({ email, password });
				return { success: true, message: "Successfully signed up" };
			}
		} catch (error) {
			return { success: false, message: parseErrorMessage(error) };
		}

		return { success: false, message: "An unknown error has occured" };
	},
	signin: async ({ email, password }) => {
		try {
			const { data } = await client.mutate<SigninMutation, SigninMutationVariables>({
				mutation: gql`
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
				`,
				variables: {
					input: {
						email,
						password,
					},
				},
			});

			if (data?.signin.success) {
				get().setAuthInfo({
					authorized: data.signin.success,
					user: data.signin.user as User,
				});

				return { success: true, message: "Successfully signed in" };
			}
		} catch (error) {
			return { success: false, message: parseErrorMessage(error) };
		}

		return { success: false, message: "An unknown error has occured" };
	},
	signout: async () => {
		try {
			set((prev) => ({ ...prev, signoutInFlight: true }));
			const { data } = await client.mutate<SignoutMutation>({
				mutation: gql`
					mutation Signout {
						signout {
							success
						}
					}
				`,
			});

			if (data?.signout.success) {
				get().setAuthInfo({
					authorized: false,
					user: null,
				});

				await client.clearStore();

				if (process.browser) {
					window.location.replace("/signin");
					toast.success("Successfully signed out");
				}

				set((prev) => ({ ...prev, signoutInFlight: false }));
				return { success: true, message: "Successfully signed out" };
			}
		} catch (error) {
			return { success: false, message: parseErrorMessage(error) };
		}

		return { success: false, message: "An unknown error has occured" };
	},
	setAuthInfo: (payload) => {
		set((prevState) => ({
			...prevState,
			...payload,
		}));
	},
}));
