import { Tab } from "@headlessui/react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Button } from "src/components/ui/Button";
import { Modal } from "src/components/ui/Modal";
import { useModal } from "src/hooks/useModal";
import { useAuth } from "src/store/useAuth";

export function SecuritySettings() {
	const auth = useAuth();
	const signOutModal = useModal();

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
						<li>
							<span className="font-bold">• </span>
							<span className="text-secondary">Signed in </span>
							<span className="font-semibold">
								{format(new Date(), "dd MMM, yyyy")}
							</span>
						</li>
						<li>
							<span className="font-bold">• </span>
							<span className="text-secondary">Signed in </span>
							<span className="font-semibold">
								{format(new Date(), "dd MMM, yyyy")}
							</span>
						</li>
						<li>
							<span className="font-bold">• </span>
							<span className="text-secondary">Signed in </span>
							<span className="font-semibold">
								{format(new Date(), "dd MMM, yyyy")}
							</span>
						</li>
						<li>and 4 others ...</li>
					</ul>
				</div>
				<div className="flex items-center justify-between">
					<span>Remove all other sessions</span>
					<Button onClick={() => toast.error("Not Implemented")}>Remove</Button>
				</div>
			</div>
			<div className="flex items-center justify-between pt-4">
				<span>Change your password</span>
				<Button onClick={() => toast.error("Not implemented")}>Change password</Button>
			</div>
		</Tab.Panel>
	);
}
