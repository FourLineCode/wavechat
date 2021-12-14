import { ProfileInfo } from "src/components/profile/ProfileInfo";

interface Props {
	component: React.FC;
}

export function SidebarWithProfile({ component: Component }: Props) {
	return (
		<div className="flex flex-col justify-between shrink-0 min-h-0">
			<Component />
			<ProfileInfo />
		</div>
	);
}
