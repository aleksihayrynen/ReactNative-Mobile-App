import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet,TouchableOpacity,Alert } from 'react-native';
import { fetchWorkoutById, addExerciseMovement, fetchExerciseMovementsForWorkout,deleteExerciseMovement,updateExerciseMovement} from '../database/db';
import AddSet from '../components/AddSet';
import UpdateExercise from '../components/UpdateExercise';


// Alot of variables 
const ExerciseScreen = ({ route }) => {
  const { workoutId } = route.params;   // Get the workouts id from homescreen
  const [workoutName, setWorkoutName] = useState(''); // Placing the name of the workout from HomeScreen
  const [showModal, setShowModal] = useState(false);  // Add exercise Modal
  const [exerciseList, setExerciseList] = useState([]);  //List for exercise 
  const [showUpdateModal, setShowUpdateModal] = useState(false); //Update Modal
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    fetchWorkoutName();
    fetchExercisesForWorkout(); //Fetches the Exercises from exerciseMovements
  }, []);

  //Fetches the workoutname for the exercise modal by workoutid, couldnt just use id since exercises also have id
  const fetchWorkoutName = async () => {
    try {
      const workout = await fetchWorkoutById(workoutId);
      if (workout) {
        setWorkoutName(workout.name);
      }
    } catch (error) {
      console.log('Error fetching workout name:', error);
    }
  };

  //Gets the exercises for the workout
  const fetchExercisesForWorkout = async () => {
    try {
      const exercises = await fetchExerciseMovementsForWorkout(workoutId);
      setExerciseList(exercises);
    } catch (error) {
      console.log('Error fetching exercises:', error);
    }
  };

  //Handles the press of the AddExercise button
  const handleAddExercise = () => {
    setShowModal(true);
  };

  //Handles saving the new added workout to the db
  const handleSaveExercise = async (exerciseName, sets, reps, weight) => {
    try {
      await addExerciseMovement(workoutId, exerciseName, sets, reps, weight);
      setShowModal(false);
      fetchExercisesForWorkout(); // Update the exercise list after saving
    } catch (error) {
      console.log('Error saving exercise:', error);
    }
  };

  //Handles the Shortpress that pops up the update exercise modal
  const handleExercisePress = (id) => {
    const exercise = exerciseList.find((item) => item.id === id); // Uses comparing id's to find the correct one
    setSelectedExercise(exercise);
    setShowUpdateModal(true);
  };

  //Handles the longpress of the list items. (delete)
  //Wanted to keep the same style of deleting for unity in the code since Homescreen deletes items this way
  const handleExerciseLongPress = (id) => {
    Alert.alert(
      'Delete Exercise',
      'Are you sure you want to delete this exercise?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteExercise(id), //Calls the deleteExercise funtion
        },
      ],
    );
  };

  // Delete exercise, used above
  const deleteExercise = async (id) => {
    try {
      await deleteExerciseMovement(id);
      fetchExercisesForWorkout(); // Update the exercise list after deleting
    } catch (error) {
      console.log('Error deleting exercise:', error);
    }
  };

  const handleUpdateExercise = async (updatedExercise) => {
    try {
      const { id, workout_id, name, sets, reps, weight } = updatedExercise;
      await updateExerciseMovement(id, workout_id, name, sets, reps, weight);
      setShowModal(false);
      fetchExercisesForWorkout(); // Update the exercise list after saving
    } catch (error) {
      console.log('Error updating exercise:', error);
    }
  };
  

  
//Renders what is shown on the screen on this page
  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleExercisePress(item.id)}
      onLongPress={() => handleExerciseLongPress(item.id)}
    >
      <View style={styles.container}>
        <View style={styles.test}>
          {/*Text that shows the sets and reps on the exercise */}
          <Text style={styles.itemheader}>{item.name} </Text>
          <Text>Sets: {item.sets} | Reps: {item.reps} | {item.weight} kg</Text>
        </View> 
      </View>
    </TouchableOpacity>
  );

  return (
    //Main page styling left from the previous code 
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:"azure",}}>
      <Text style={styles.pageHeader}>{workoutName}</Text>
      
      {/* The modal for adding sets and reps */}
      <AddSet
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveExercise}
      />
      {/* The modal for updating sets and reps */}
      {selectedExercise && (
        <UpdateExercise
          visible={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onSave={handleUpdateExercise}
          exercise={selectedExercise}
        />
      )}
      

      {/* The FlatList to display exercise items */}
      <FlatList
        data={exerciseList}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button style={styles.button} title="Add Exercise" onPress={handleAddExercise} />
      {/*Extra Text element in row 78 since only needed margin/padding to make the button placement better. and there was no button stylings, this was an easier fix.*/}
      <Text></Text>    
    </View>
  );
};

//Beginning of styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  test: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    padding: 15,
    backgroundColor: "yellow",
  },
  itemheader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    fontSize: 16,
    color:"black"
  },
  pageHeader: {
    alignItems: 'center',
    justifyContent: "center",
    fontSize: 22,
    color:"black",
    margin: 10,
  },

});

export default ExerciseScreen;
