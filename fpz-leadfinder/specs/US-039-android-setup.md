# US-039: Android App — Expo Projekt Setup

## Befehle

```bash
cd D:/FPZ
npx create-expo-app fpz-leadfinder-mobile --template blank-typescript
cd fpz-leadfinder-mobile
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context @expo/vector-icons
mkdir -p src/screens src/components src/lib src/types
```

## Datei: fpz-leadfinder-mobile/src/lib/api.ts

```typescript
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json() as Promise<T>;
}
```

## Datei: fpz-leadfinder-mobile/App.tsx

```tsx
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
```

## Placeholder Screens

Erstelle fuer jede Screen-Datei in src/screens/ einen Placeholder:

```tsx
// src/screens/DashboardScreen.tsx (etc.)
import { View, Text } from "react-native";

export function DashboardScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#09090b", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#fafafa", fontSize: 20 }}>Dashboard</Text>
    </View>
  );
}
```

Analog fuer LeadsListScreen, LeadDetailScreen, ScanScreen, SettingsScreen.
