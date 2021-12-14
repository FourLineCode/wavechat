import { FaCog } from "react-icons/fa";
import { Button } from "src/components/ui/Button";
import { Modal } from "src/components/ui/Modal";
import { useModal } from "src/hooks/useModal";
import { useAuth } from "src/store/useAuth";

export function ProfileSettings() {
	const auth = useAuth();
	const profileSettingsModal = useModal();

	return (
		<>
			<div
				onClick={profileSettingsModal.onOpen}
				className="p-2 transition rounded-full cursor-pointer hover:scale-110 text-dark-500 hover:text-dark-300 hover:bg-dark-700"
			>
				<FaCog size="20" />
			</div>
			<Modal
				{...profileSettingsModal}
				className="flex flex-col items-center justify-center space-y-2"
			>
				<div className="text-xl font-semibold">Are you sure you want to sign out?</div>
				<div className="flex items-center space-x-4">
					<Button variant="outlined" onClick={profileSettingsModal.onClose}>
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
		</>
	);
}
