import { gql, useMutation, useQuery } from "@apollo/client";
import { Tab } from "@headlessui/react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { GetSessionsQuery } from "src/apollo/__generated__/types";
import { Button } from "src/components/ui/Button";
import { Modal } from "src/components/ui/Modal";
import { useModal } from "src/hooks/useModal";
import { useAuth } from "src/store/useAuth";

const GET_SESSIONS = gql`
	query GetSessions {
		sessions {
			id
			createdAt
		}
	}
`;

const REMOVE_OTHER_SESSIONS = gql`
	mutation RemoveOtherSessions {
		removeOtherSessions {
			success
		}
	}
`;

export function SecuritySettings() {
	const auth = useAuth();
	const signOutModal = useModal();
	const removeSessionsModal = useModal();

	const { data, loading } = useQuery<GetSessionsQuery>(GET_SESSIONS, {
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const [removeOtherSessions, { loading: removeSessionsLoading }] = useMutation(
		REMOVE_OTHER_SESSIONS,
		{
			refetchQueries: [{ query: GET_SESSIONS }],
			onCompleted: () => {
				removeSessionsModal.onClose();
				toast.success("Removed all active sessions");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}
	);

	return (
		<Tab.Panel className="w-full p-4 space-y-4 overflow-y-auto divide-y divide-dark-800">
			<div className="flex items-center justify-between">
				<span>Sign out of your account</span>
				<Button variant="outlined" onClick={signOutModal.onOpen}>
					Sign out
				</Button>
				<Modal
					{...signOutModal}
					className="flex flex-col items-center justify-center space-y-2"
				>
					<div className="text-xl font-semibold">Are you sure you want to sign out?</div>
					<div className="flex items-center space-x-4">
						<Button variant="outlined" onClick={signOutModal.onClose}>
							Cancel
						</Button>
						<Button
							type="submit"
							isSubmitting={auth.signoutInFlight}
							onClick={auth.signout}
						>
							Sign out
						</Button>
					</div>
				</Modal>
			</div>
			<div className="pt-2 space-y-2">
				<div>
					<div className="text-xl font-semibold">Your active sessions</div>
					<ul className="pt-4 pl-8 space-y-2">
						{loading || !data ? (
							<li className="text-secondary">Loading...</li>
						) : (
							<>
								{data &&
									data.sessions.slice(0, 5).map((session) => (
										<li key={session.id}>
											<span className="font-bold">• </span>
											<span className="text-secondary">Signed in </span>
											<span className="font-semibold">
												{format(
													new Date(session.createdAt),
													"MMM dd, yyyy p"
												)}
											</span>
										</li>
									))}
								{data.sessions.length > 5 && (
									<li>and {data.sessions.length - 5} others ...</li>
								)}
							</>
						)}
					</ul>
				</div>
				<div className="flex items-center justify-between">
					<span>Remove all other sessions</span>
					<Button type="submit" onClick={removeSessionsModal.onOpen}>
						Remove
					</Button>
					<Modal
						{...removeSessionsModal}
						className="flex flex-col items-center justify-center space-y-2"
					>
						<div className="text-xl font-semibold">Are you sure?</div>
						<div className="text-center">
							This will remove all other currently active sessions. This action is
							permenent and not reversible.
						</div>
						<div className="flex items-center space-x-4">
							<Button variant="outlined" onClick={removeSessionsModal.onClose}>
								Cancel
							</Button>
							<Button
								type="submit"
								onClick={removeOtherSessions}
								isSubmitting={removeSessionsLoading}
							>
								Remove Sessions
							</Button>
						</div>
					</Modal>
				</div>
			</div>
			<div className="flex items-center justify-between pt-4">
				<span>Change your password</span>
				<Button onClick={() => toast.error("Not implemented")}>Change password</Button>
			</div>
		</Tab.Panel>
	);
}
