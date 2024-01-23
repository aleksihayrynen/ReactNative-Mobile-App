import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const AddSet = ({ visible, onClose, onSave }) => {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState(''); // New state for weight

  const handleSave = () => {
    onSave(exercise, parseInt(sets), parseInt(reps), parseFloat(weight));
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.label}>Exercise Name:</Text>
        <TextInput
          style={styles.input}
          value={exercise}
          onChangeText={setExercise}
          placeholder="Exercise name"
        />

        <Text style={styles.label}>Number of Sets:</Text>
        <TextInput
          style={styles.input}
          value={sets}
          onChangeText={setSets}
          placeholder="Enter number of sets"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Number of Reps:</Text>
        <TextInput
          style={styles.input}
          value={reps}
          onChangeText={setReps}
          placeholder="Enter number of reps"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Weight (in kg):</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="Enter weight in kg"
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={onClose} />
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
};

//Styling section begins
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default AddSet;
