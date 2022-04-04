import { Box, Divider, HStack, Image, Input, Text, VStack } from "native-base";

export function MessageDrawer() {
  return (
    <Box flex={1}>
      <Box p="2">
        <Input py={1} px="2" size="xs" rounded="lg" fontSize="md" placeholder="Search a friend" />
      </Box>
      <Divider />
      <Text p={2} fontWeight="bold">
        Direct Messages
      </Text>
      <HStack m={1} p={2} rounded="lg" bg="gray.600">
        <Image
          alt="avatar"
          size="xs"
          rounded="lg"
          source={{ uri: "https://github.com/tnarla.png" }}
        />
        <VStack ml={2}>
          <Text fontWeight="bold" noOfLines={1}>
            Trushita Narla
          </Text>
          <Text fontSize="xs" color="gray.400" noOfLines={1}>
            12 min ago
          </Text>
        </VStack>
      </HStack>
      <HStack m={1} p={2} rounded="lg">
        <Image
          alt="avatar"
          size="xs"
          rounded="lg"
          source={{ uri: "https://github.com/FourLineCode.png" }}
        />
        <VStack ml={2}>
          <Text fontWeight="bold" noOfLines={1}>
            Akmal Hossain
          </Text>
          <Text fontSize="xs" color="gray.400" noOfLines={1}>
            15 min ago
          </Text>
        </VStack>
      </HStack>
      <HStack m={1} p={2} rounded="lg">
        <Image
          alt="avatar"
          size="xs"
          rounded="lg"
          source={{ uri: "https://github.com/kesne.png" }}
        />
        <VStack ml={2}>
          <Text fontWeight="bold" noOfLines={1}>
            Jordan
          </Text>
          <Text fontSize="xs" color="gray.400" noOfLines={1}>
            18 min ago
          </Text>
        </VStack>
      </HStack>
      <HStack m={1} p={2} rounded="lg">
        <Image
          alt="avatar"
          size="xs"
          rounded="lg"
          source={{ uri: "https://github.com/robinmalfait.png" }}
        />
        <VStack ml={2}>
          <Text fontWeight="bold" noOfLines={1}>
            Robin
          </Text>
          <Text fontSize="xs" color="gray.400" noOfLines={1}>
            24 min ago
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}
