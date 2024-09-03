// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CustomModalScreen from './screens/CustomModal';
import LogingScreen from './screens/LogingScreen';
import SettingsScreen from './screens/SettingsScreen';
import Details from './screens/DetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogingScreen">
      <Stack.Screen name="LogingScreen" component={LogingScreen} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CustomModal" component={CustomModalScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Details" component={Details} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
