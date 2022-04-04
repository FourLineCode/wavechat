import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Center, FormControl, Heading, HStack, Input, Text } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export function SignUp({ navigation }: NativeStackScreenProps<any, any>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Center
        flex={1}
        px={4}
        bg={{
          linearGradient: {
            colors: ["primary.500", "gray.900"],
            start: [1, 0],
            end: [1, 1],
          },
        }}
      >
        <FormControl w="100%" p={4} bg="gray.800" rounded="xl">
          <Heading textAlign="center" color="gray.100" fontSize="4xl" mb={2}>
            Sign Up
          </Heading>
          <FormControl.Label>Email</FormControl.Label>
          <Input type="email" rounded="lg" color="gray.100" fontSize="lg" />
          <FormControl.Label>Username</FormControl.Label>
          <Input rounded="lg" color="gray.100" fontSize="lg" />
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" rounded="lg" color="gray.100" fontSize="lg" />
          <FormControl.Label>Confirm Password</FormControl.Label>
          <Input type="password" rounded="lg" color="gray.100" fontSize="lg" />
          <Button w="100%" mt={4} rounded="lg" _text={{ fontSize: "lg", fontWeight: "bold" }}>
            Sign Up
          </Button>
          <HStack justifyContent="center" space={2} mt={2}>
            <Text>Have an account?</Text>
            <Text
              onPress={() => navigation.navigate("SignIn")}
              color="primary.500"
              fontWeight="bold"
            >
              Sign in
            </Text>
          </HStack>
        </FormControl>
      </Center>
    </SafeAreaView>
  );
}
