import { FaCompass, FaEnvelope, FaPlus, FaQuestion } from 'react-icons/fa';
import { NavigationSidebarRoute } from 'src/components/navigations/NavigationSidebarRoute';

export function NavigationSidebar() {
	return (
		<div className='w-20 px-2 py-2 divide-y-2 divide-dark-700 bg-dark-900'>
			<NavigationSidebarRoute route='/friends' tooltip='Friends' icon={FaEnvelope} />
			<div>
				{Array.from({ length: 5 }).map((_, i) => (
					<NavigationSidebarRoute
						route={`/server/${i}`}
						tooltip={`Server #${i}`}
						icon={FaQuestion}
						key={i}
					/>
				))}
				<NavigationSidebarRoute route='/discover' tooltip='Discover' icon={FaCompass} />
				<NavigationSidebarRoute
					route='/server/create'
					tooltip='Create a server'
					icon={FaPlus}
				/>
			</div>
		</div>
	);
}
