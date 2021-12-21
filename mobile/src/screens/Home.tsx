import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../components/DrawerContent";
import { Messages } from "./Messages";

const Drawer = createDrawerNavigator();

const screens = [
	{
		name: "Messages",
		component: Messages,
	},
];

export function Home() {
	return (
		<Drawer.Navigator
			initialRouteName="Messages"
			drawerContent={DrawerContent}
			defaultStatus="open"
			screenOptions={{
				headerShown: false,
			}}
		>
			{screens.map((screen, index) => (
				<Drawer.Screen name={screen.name} component={screen.component} key={index} />
			))}
		</Drawer.Navigator>
	);
}
