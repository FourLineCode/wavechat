import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { Box, Center, ScrollView, theme, VStack } from "native-base";

interface Props {
  navigation: DrawerNavigationHelpers;
  setRoute: (arg: string) => void;
}

export function DrawerRoutes({ navigation, setRoute }: Props) {
  const navigateTo = (screen: string, keys?: Record<string, string>) => {
    setRoute(screen);
    navigation.navigate(screen, keys);
    navigation.closeDrawer();
  };

  return (
    <Box w="20%" h="100%">
      <ScrollView bg="gray.900" p={2} w="100%" h="100%">
        <VStack space={1}>
          <Center
            w={10}
            h={10}
            rounded="xl"
            bg="primary.500"
            onTouchStart={() => navigateTo("Messages")}
          >
            <Entypo name="message" color={theme.colors.gray[300]} size={26} />
          </Center>
          <Center
            w={10}
            h={10}
            rounded="full"
            bg="gray.700"
            onTouchStart={() => navigateTo("Server", { id: "1" })}
          >
            <FontAwesome name="question" color={theme.colors.gray[300]} size={26} />
          </Center>
          <Center
            w={10}
            h={10}
            rounded="full"
            bg="gray.700"
            onTouchStart={() => navigateTo("Server", { id: "2" })}
          >
            <FontAwesome name="question" color={theme.colors.gray[300]} size={26} />
          </Center>
          <Center
            w={10}
            h={10}
            rounded="full"
            bg="gray.700"
            onTouchStart={() => navigateTo("Server", { id: "3" })}
          >
            <FontAwesome name="question" color={theme.colors.gray[300]} size={26} />
          </Center>
          <Center
            w={10}
            h={10}
            rounded="full"
            bg="gray.700"
            onTouchStart={() => navigateTo("Server", { id: "4" })}
          >
            <FontAwesome name="question" color={theme.colors.gray[300]} size={26} />
          </Center>
          <Center
            w={10}
            h={10}
            rounded="full"
            bg="gray.700"
            onTouchStart={() => navigateTo("Server", { id: "5" })}
          >
            <FontAwesome name="question" color={theme.colors.gray[300]} size={26} />
          </Center>
          <Center
            w={10}
            h={10}
            rounded="full"
            bg="gray.700"
            onTouchStart={() => navigateTo("Discover")}
          >
            <Ionicons name="compass" color={theme.colors.gray[300]} size={26} />
          </Center>
          <Center
            w={10}
            h={10}
            rounded="full"
            bg="gray.700"
            onTouchStart={() => navigateTo("CreateServer")}
          >
            <Entypo name="plus" color={theme.colors.gray[300]} size={26} />
          </Center>
        </VStack>
      </ScrollView>
    </Box>
  );
}
