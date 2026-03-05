import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { LeadsListScreen } from "./src/screens/LeadsListScreen";
import { LeadDetailScreen } from "./src/screens/LeadDetailScreen";
import { ScanScreen } from "./src/screens/ScanScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const LeadsStack = createNativeStackNavigator();

function LeadsStackScreen() {
  return (
    <LeadsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#18181b" },
        headerTintColor: "#fafafa",
      }}
    >
      <LeadsStack.Screen
        name="LeadsList"
        component={LeadsListScreen}
        options={{ title: "Leads" }}
      />
      <LeadsStack.Screen
        name="LeadDetail"
        component={LeadDetailScreen}
        options={{ title: "Lead Details" }}
      />
    </LeadsStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#18181b",
            borderTopColor: "#27272a",
          },
          tabBarActiveTintColor: "#3b82f6",
          tabBarInactiveTintColor: "#71717a",
          headerStyle: { backgroundColor: "#18181b" },
          headerTintColor: "#fafafa",
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Leads"
          component={LeadsStackScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Scan"
          component={ScanScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Einstellungen"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
