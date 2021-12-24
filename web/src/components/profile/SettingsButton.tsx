import { FaCog } from "react-icons/fa";
import { SettingsDialog } from "src/components/settings/SettingsDialog";
import { useModal } from "src/hooks/useModal";

export function SeetingsButton() {
    const profileSettingsModal = useModal();

    return (
        <>
            <div
                onClick={profileSettingsModal.onOpen}
                className="p-2 transition rounded-full cursor-pointer hover:scale-110 text-dark-500 hover:text-dark-300 hover:bg-dark-700"
            >
                <FaCog size="20" />
            </div>
            <SettingsDialog modalProps={profileSettingsModal} />
        </>
    );
}
