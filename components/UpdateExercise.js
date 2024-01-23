import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const UpdateExercise = ({ visible, onClose, onSave, exercise,workoutName }) => {
    //State variables
    const [sets, setSets] = useState(exercise.sets.toString());
    const [reps, setReps] = useState(exercise.reps.toString());
    const [weight, setWeight] = useState(exercise.weight.toString());
    const [selectedExercise, setSelectedExercise] = useState(null);

    //Handles the saving on the Update modal 
  const handleSave = () => {
    const updatedExercise = {   //Holds the updated variable information 
      ...exercise,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseFloat(weight),
    };
    //Saves the variables with the new updatedExercise placeholder
    onSave(updatedExercise);
    //Closes the modal after 
    onClose();
  };

  //The modal element and what is shown
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.modal}>
            <Text style={styles.pageHeader}>Update exercise</Text>
            <Text style={styles.label}>Sets</Text>
            <TextInput
                value={sets}
                onChangeText={setSets}
                keyboardType="numeric"
                style={styles.input}
            />
            <Text style={styles.label}>Reps</Text>
            <TextInput
                value={reps}
                onChangeText={setReps}
                keyboardType="numeric"
                style={styles.input}
            />
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput 
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                style={styles.input}
            />
            <View style={styles.buttonContainer}>
                <Button title="Update" onPress={handleSave} />
                <Button title="Cancel" color="gray" onPress={onClose} />
            </View>
        </View>
      </View>
    </Modal>
  );
};

//Styles sheet starts
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.92)', // last value is background pacity
    },
    input: {
        backgroundColor: 'white',     // Added the backgroundColor style for pure white TextInputs
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        width: 300,
      },
      label: {
        color:"white",
        fontSize: 14,
      },
      pageHeader: {
        color:"white",
        fontSize: 22,
        marginBottom:30,
      },
    });

export default UpdateExercise;
