import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { ProfileSettings } from "src/components/settings/ProfileSettings";
import { SecuritySettings } from "src/components/settings/SecuritySettings";
import { Modal } from "src/components/ui/Modal";
import { ModalProps } from "src/hooks/useModal";

const tabs = [
	{
		id: 1,
		title: "Profile",
		component: ProfileSettings,
	},
	{
		id: 2,
		title: "Security",
		component: SecuritySettings,
	},
];

interface Props extends ModalProps {}

export function SettingsDialog({ ...modalProps }: Props) {
	return (
		<Modal {...modalProps} extraLarge>
			<Tab.Group vertical>
				<div className="flex space-x-4">
					<Tab.List className="flex flex-col border-r border-dark-800">
						{tabs.map((tab) => (
							<Tab
								key={tab.id}
								className={({ selected }) =>
									clsx(
										selected
											? "bg-brand-500 hover:bg-brand-600 hover:text-primary"
											: "hover:bg-dark-700 hover:text-brand-500",
										"flex items-center mr-4 font-bold text-lg py-1.5 px-10 my-1 space-x-2 rounded-lg cursor-pointer transition-colors"
									)
								}
							>
								{tab.title}
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels className="flex-1 h-[550px]">
						{tabs.map((tab) => (
							<tab.component key={tab.id} />
						))}
					</Tab.Panels>
				</div>
			</Tab.Group>
		</Modal>
	);
}

/*

*/
