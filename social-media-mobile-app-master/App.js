
// Import necessary components and screens from react-native and user-defined files.
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import PostScreen from "./screens/PostScreen";
import MessageScreen from "./screens/MessageScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from './screens/EditProfileScreen';
import ChatScreen from './screens/ChatScreen';

// Create stack navigators for App, Tabs, and Navigation Stack.
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const NavigationStack = createStackNavigator();

// Function to define tab bar options and screens.
const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        // Set tab icons based on the route name and focus.
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;

          if (routeName === "Home") {
            iconName = focused ? "home-sharp" : "home-outline";
          }else if (routeName === "Post") {
            iconName = "add-circle-outline";
          } else if (routeName === "Message") {
            iconName = focused
              ? "chatbox-ellipses"
              : "chatbox-ellipses-outline";
          } else if (routeName === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          // Return icon with specific name and style.
          return <Ionicons name={iconName} size={28} color={color} />;
        },
        // Set tab bar active and inactive colors, height, and padding.
        tabBarActiveTintColor: "#9933FF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 80, padding: 10 },
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
     {/* Add screens to tab bar navigator */}
      <Tab.Screen name={"Home"} component={HomeScreen} />
      <Tab.Screen name={"Message"} component={MessageScreen} />
      <Tab.Screen name={"Post"} component={PostScreen} />
      <Tab.Screen name={"Profile"} component={ProfileScreen} />


      {/* Add more tabs here if needed */}
    </Tab.Navigator>
  );
};

// Main component - App
const App = () => {
  const AppStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {/* Stack navigator for app login, sign up and home screens */}
      <NavigationStack.Navigator initialRouteName="Login">
        <NavigationStack.Screen options = {{headerShown: false}} name="Login" component={SignInScreen} />
        <NavigationStack.Screen options = {{headerShown: false}} name="EditProfile" component={EditProfileScreen} />
        <NavigationStack.Screen options = {{headerShown: false}} name="Chat" component={ChatScreen} />
        <NavigationStack.Screen options = {{headerShown: false}} name="SignUp" component={SignUpScreen} />
        <NavigationStack.Screen
          name="Home"
          component={TabStack}
          options={{
            headerTitleAlign: "center",
            title: "BuzzFeed",
            // Set header text color, size, and margin.
            headerTitleStyle: {
              color: "#9933FF",
              fontSize: 30,
              marginLeft: 10,
            },
            // Set header background color and no shadow.
            headerStyle: {
              shadowColor: "#fff",
              backgroundColor: "#fff",
              elevation: 0,
            },
          }}
        />
      </NavigationStack.Navigator>
      <NavigationStack.Screen options = {{headerShown: false}} name="Profile" component={ProfileScreen} />

    </NavigationContainer>
  )
};

export default App;
