import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { HStack } from "native-base";
import { useState } from "react";
import { DrawerRoutes } from "./DrawerRoutes";
import { MessageDrawer } from "./MessageDrawer";

export function DrawerContent({ navigation }: DrawerContentComponentProps) {
	const [route, setRoute] = useState("Messages");

	return (
		<HStack w="100%" h="100%" bg="gray.800">
			<DrawerRoutes navigation={navigation} setRoute={setRoute} />
			{route === "Messages" ? <MessageDrawer /> : null}
		</HStack>
	);
}
