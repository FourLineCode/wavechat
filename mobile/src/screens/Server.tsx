import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Center, Heading } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerParamList } from "./Home";

export function Server({ navigation, route }: NativeStackScreenProps<DrawerParamList, "Server">) {
	const { id } = route.params;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Center flex={1} bg="gray.900">
				<Heading>Server {id}</Heading>
			</Center>
		</SafeAreaView>
	);
}
