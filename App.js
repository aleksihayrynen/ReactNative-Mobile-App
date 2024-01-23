import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import ExerciseScreen from './components/ExerciseScreen';
import { init } from './database/db';

//Create the table when the program starts
init()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch((err) => {
    console.log('Database IS NOT initialized! ' + err);
  });

  //Create the navigation stack
const Stack = createNativeStackNavigator();

//Main part of the code that has the navigation in it and what page to start on
const App = () => {
  return (
    //Navigation section where the stacks navigate, Can also change navigation headings, "Homepage"
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">  
        <Stack.Screen name="Workouts">
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen 
          name="Exercise" 
          component={ExerciseScreen} 
          options={({ route }) => ({ title: route.params?.workoutName })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

