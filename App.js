import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Profile from './screens/profile';
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const stackDesignHead = {
  title: "HomeScreen", 
          headerTintColor:"white", 
          headerStyle:{ 
            backgroundColor:"blue"
            
            }
}
function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator >
        <Stack.Screen 
        name="Home"
        component={Home} 
        options={stackDesignHead}
        />
        <Stack.Screen 
        name="Create" 
        component={CreateEmployee}
        options={{...stackDesignHead,title:"Add employee"}}
        />
        <Stack.Screen headerMode="none"
        name="Profile" 
        component={Profile}
        options={{...stackDesignHead,title:"Employee's Profile",  backgroundColor:"darkblue"}}
        />
      </Stack.Navigator>
    </View>
  );
}
export default ()=>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
});
