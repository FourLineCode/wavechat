import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { NativeBaseProvider } from "native-base";
import { SignIn } from "./screens/SignIn";
import { SignUp } from "./screens/SignUp";
import { config } from "./theme/config";
import { theme } from "./theme/theme";

const RootStack = createNativeStackNavigator();

const screens = [
	{
		name: "SignUp",
		component: SignUp,
	},
	{
		name: "SignIn",
		component: SignIn,
	},
];

export default registerRootComponent(function () {
	return (
		<NativeBaseProvider theme={theme} config={config}>
			<NavigationContainer>
				<RootStack.Navigator
					initialRouteName="SignUp"
					screenOptions={{
						headerShown: false,
						animation: "slide_from_right",
						statusBarStyle: "auto",
					}}
				>
					{screens.map((screen, index) => (
						<RootStack.Screen
							name={screen.name}
							component={screen.component}
							key={index}
						/>
					))}
				</RootStack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	);
});
