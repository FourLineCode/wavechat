import { gql, useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DiscoverUsersQuery, DiscoverUsersQueryVariables } from "src/apollo/__generated__/types";
import { DiscoveredUser } from "src/components/discover/DiscoveredUser";
import { Button } from "src/components/ui/Button";
import { Input } from "src/components/ui/Input";
import { Spinner } from "src/components/ui/Spinner";

export const GET_DISCOVER_USERS = gql`
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

export function DiscoverUsersPage() {
	const [users, setUsers] = useState<any[]>([]);
	const [queryTerm, setQueryTerm] = useState("");
	const [prevQueryTerm, setPrevQueryTerm] = useState("");
	const [currentCursor, setCurrentCursor] = useState<number | null>(null);
	const [paginationLoading, setPaginationLoading] = useState(false);

	const { data, refetch, loading } = useQuery<DiscoverUsersQuery, DiscoverUsersQueryVariables>(
		GET_DISCOVER_USERS,
		{
			variables: {
				query: queryTerm,
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}
	);

	useEffect(() => {
		if (prevQueryTerm === queryTerm) {
			setUsers(data ? [...users, ...data.discoverUsers] : users);
			return;
		}

		setUsers(data ? data.discoverUsers : []);
	}, [data]);

	useEffect(() => {
		setCurrentCursor(users[users.length - 1]?.pk ?? null);
	}, [users]);

	return (
		<div className="flex flex-col flex-1 p-2 space-y-2 bg-dark-700">
			<div className="shrink-0 p-3 h-52 rounded-2xl bg-gradient-to-bl from-brand-700 to-dark-900">
				<Formik
					initialValues={{ searchTerm: "" }}
					onSubmit={async ({ searchTerm }) => {
						if (prevQueryTerm !== searchTerm) {
							setPrevQueryTerm(queryTerm);
						}
						setQueryTerm(searchTerm);

						if (searchTerm === "") {
							setUsers([]);
							return;
						}

						await refetch({ query: searchTerm });
					}}
				>
					{(props) => (
						<Form className="flex flex-col items-center justify-center w-full h-full space-y-4">
							<div className="text-3xl font-bold line-clamp-1">
								Search for people you may know
							</div>
							<Input
								name="searchTerm"
								placeholder="Username..."
								disabled={props.isSubmitting}
								initialFocus
								className="w-4/5 lg:w-2/5"
							/>
						</Form>
					)}
				</Formik>
			</div>
			{users.length > 0 && !loading ? (
				<>
					<div className="grid grid-cols-2 gap-2 overflow-y-auto 2xl:grid-cols-4">
						{users.map((user) => (
							<DiscoveredUser user={user} key={user.id} />
						))}
					</div>
					<div className="flex justify-center">
						<Button
							onClick={async () => {
								setPrevQueryTerm(queryTerm);
								setPaginationLoading(true);
								await refetch({ query: queryTerm, cursor: currentCursor });
								setPaginationLoading(false);
							}}
							type="submit"
							isSubmitting={paginationLoading}
							variant="outlined"
						>
							Load more
						</Button>
					</div>
				</>
			) : (
				<div className="flex items-center justify-center flex-1">
					{loading ? (
						<Spinner />
					) : queryTerm.length > 0 ? (
						<div className="text-4xl font-bold text-secondary">No user found</div>
					) : (
						<div className="text-4xl font-bold text-secondary">Search for a User</div>
					)}
				</div>
			)}
		</div>
	);
}
