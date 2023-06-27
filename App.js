import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/HomeScreen/HomeScreen';
import FavoriteScreen from './components/FavoriteScreen/FavoriteScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailScreen from './components/DetailScreen/DetailScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeStack"
      component={HomeTab}
      options={{
        headerTitleAlign: 'center',
        title: 'Home',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{ headerTitleAlign: 'center' }}
    />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorite') {
            iconName = 'bookmark';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{ headerTitleAlign: 'center' }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
