import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Box, Center, ScrollView, theme, VStack } from "native-base";

export function DrawerContent() {
	return (
		<Box w="100%" h="100%" bg="gray.800">
			<ScrollView bg="gray.900" p={2} w="20%" h="100%">
				<VStack space={1}>
					<Center w={10} h={10} rounded="xl" bg="primary.500">
						<Entypo name="message" color={theme.colors.gray[300]} size={26} />
					</Center>
					<Center w={10} h={10} rounded="full" bg="gray.700">
						<FontAwesome name="question" color={theme.colors.gray[300]} size={26} />
					</Center>
					<Center w={10} h={10} rounded="full" bg="gray.700">
						<FontAwesome name="question" color={theme.colors.gray[300]} size={26} />
					</Center>
					<Center w={10} h={10} rounded="full" bg="gray.700">
						<FontAwesome name="question" color={theme.colors.gray[300]} size={26} />
					</Center>
					<Center w={10} h={10} rounded="full" bg="gray.700">
						<FontAwesome name="question" color={theme.colors.gray[300]} size={26} />
					</Center>
					<Center w={10} h={10} rounded="full" bg="gray.700">
						<FontAwesome name="question" color={theme.colors.gray[300]} size={26} />
					</Center>
					<Center w={10} h={10} rounded="full" bg="gray.700">
						<Entypo name="plus" color={theme.colors.gray[300]} size={26} />
					</Center>
					<Center w={10} h={10} rounded="full" bg="gray.700">
						<Entypo name="magnifying-glass" color={theme.colors.gray[300]} size={26} />
					</Center>
				</VStack>
			</ScrollView>
		</Box>
	);
}
