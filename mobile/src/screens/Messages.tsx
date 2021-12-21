import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Center, Heading, StatusBar, theme } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export function Messages({ navigation }: NativeStackScreenProps<any, any>) {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor={theme.colors.gray[900]} />
			<Center flex={1} bg="gray.900">
				<Heading>Messages</Heading>
			</Center>
		</SafeAreaView>
	);
}
