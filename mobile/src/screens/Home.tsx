import { createDrawerNavigator } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerContent } from "../components/drawer/DrawerContent";
import { CreateServer } from "./CreateServer";
import { Discover } from "./Discover";
import { Messages } from "./Messages";
import { Server } from "./Server";

export interface DrawerParamList extends ParamListBase {
  Messages: undefined;
  Server: {
    id: string;
  };
}

const Drawer = createDrawerNavigator();

const screens = [
  {
    name: "Messages",
    component: Messages,
  },
  {
    name: "Server",
    component: Server,
  },
  {
    name: "Discover",
    component: Discover,
  },
  {
    name: "CreateServer",
    component: CreateServer,
  },
];

export function Home({ navigation }: NativeStackScreenProps<any, any>) {
  return (
    <Drawer.Navigator
      initialRouteName="Messages"
      drawerContent={(props) => <DrawerContent {...props} />}
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
