import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, TouchableOpacity,StyleSheet, Alert} from 'react-native';
import { fetchAllWorkouts, addWorkout, deleteWorkout, updateWorkout } from '../database/db';

//The screen the app opens into
const HomeScreen = ({ navigation }) => {
  //State variables containing name and the list for workouts on the mainpage
  const [workoutList, setWorkoutList] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    readAllWorkouts();
  }, []);

// Saves the information into the database table
  const saveWorkout = async () => {
    try {
      await addWorkout(name);  //Adds the workout that you give the name to in a input field
      console.log('Workout added successfully!');
      readAllWorkouts();
      setName(''); // reset the input field after done
    } catch (err) {
      console.log(err);
    }
  };

//Deletes the object from the database based on id on the workout table
  const deleteWorkoutFromDb = async (id) => {
    try {
      await deleteWorkout(id); //call to db.js to delete the item from the table
      console.log('Workout deleted successfully!');
      readAllWorkouts();
    } catch (err) {
      console.log(err);
    }
  };
//Formats the date into more understandable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'numeric', // Could also use aug 5th format instead ect. by using short.
      day: 'numeric',
    });
  };

  //The Archieving function that also has deletion of items in it
  const archiveWorkoutFromDb = async (id, name, archived) => {
    try {
      Alert.alert(  //alert screen in android
        'Options',
        `Workout "${name}"`, // Get the name of the workout you wanna delete or Archive
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Archive canceled'), //cancel the function or action
            style: 'cancel',
          },
          {
            text: archived ? 'Unarchive' : 'Archive', // Toggle the button text based on archived status
            onPress: () => {
            updateWorkout(id, name, archived ? 0 : 1) // Toggle the archived status (0 for false, 1 for true)
                .then(() => {
                  console.log('Workout archived successfully!');
                  readAllWorkouts(); 
                })
                .catch((error) => {
                  console.log('Error archiving workout: ', error);
                });
            },
          },
          {
            text: 'Delete',
            onPress: () => {
              deleteWorkoutFromDb(id);   //deletes the item from the flatlist in the workouts
            },
            style: 'destructive',
          },
        ],
        { cancelable: true } // Allows user to dismiss the alert box
      );
    } catch (err) {
      console.log(err);
    }
  };
//What is rendered to the screen like touchableOpacity which makes the flatlist items interactable
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Exercise', { workoutId: item.id })} //Navigates into the exercise page which has a table containing information
      onLongPress={() => archiveWorkoutFromDb(item.id, item.name,item.archived)} //activates the Archive funtion
    >
      <View>
        <Text style={styles.items}>
          {formatDate(item.created_at)} - {item.name}{' '}
          {item.archived ? '(🚩)' :""} {/* Display "a flag" in the flatlist if you have acrhived that row*/}
        </Text>
      </View>
    </TouchableOpacity>
  );
//updates the contents of the database to match the workoutList
  const readAllWorkouts = async () => {
    try {
      const dbResult = await fetchAllWorkouts();
      console.log('dbResult readAllWorkouts in HomeScreen.js');
      console.log(dbResult); // For debuggin purposes shows the table everytime function is called
      setWorkoutList(dbResult); //Sets the list you got from the result
    } catch (err) {
      console.log('Error: ' + err);
    }
  };


//What is shown on the screen
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Exercise"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <Button title="Add Workout" onPress={saveWorkout} />  
      <FlatList style={styles.list}
        data={workoutList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
//Styling section
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingTop: 40,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 8,
      width: '100%',
    },
    items: {
      backgroundColor: "yellow",
      width: 300,
      fontSize:16,
      alignItems: 'center',
      justifyContent: 'center', 
      marginBottom: 8,
      color: "black",
      padding: 5,
      borderWidth: 1,
      borderColor: "black",

    },
    list: {
      marginTop:10,
    },
  });

export default HomeScreen;
