import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Center, Heading } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export function CreateServer({ navigation }: NativeStackScreenProps<any, any>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Center flex={1} bg="gray.900">
        <Heading>Create Server</Heading>
      </Center>
    </SafeAreaView>
  );
}
