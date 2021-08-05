import { ProfileInfo } from 'src/components/profile/ProfileInfo';

interface Props {
	component: React.FC;
}

export const SidebarWithProfile = ({ component: Component }: Props) => {
	return (
		<div className='flex flex-col justify-between'>
			<Component />
			<ProfileInfo />
		</div>
	);
};
