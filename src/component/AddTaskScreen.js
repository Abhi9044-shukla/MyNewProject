// src/screens/AddTaskScreen.js
import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const AddTaskScreen = ({ navigation }) => {
  const [taskInput, setTaskInput] = useState('');

  const addTask = async () => {
    if (taskInput.trim() === '') return; // Do nothing if input is empty
    const newTask = { id: Date.now(), text: taskInput, completed: false };
    const storedTasks = await AsyncStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    const newTasks = [...tasks, newTask];
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    setTaskInput('');
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <Button title="Add Task" onPress={addTask} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // Responsive padding
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02, // Responsive margin
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: width * 0.02, // Responsive border radius
    padding: width * 0.03, // Responsive padding
    marginRight: width * 0.02, // Responsive margin
  },
});

export default AddTaskScreen;
