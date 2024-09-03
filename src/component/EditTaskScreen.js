// src/screens/EditTaskScreen.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const EditTaskScreen = ({ route, navigation }) => {
  const [taskInput, setTaskInput] = useState('');
  const { taskId } = route.params;

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setTaskInput(taskToEdit.text);
    }
  };

  const updateTask = async () => {
    if (taskInput.trim() === '') return; // Do nothing if input is empty
    const storedTasks = await AsyncStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: taskInput } : task
    );
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTaskInput('');
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Edit your task"
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <Button title="Update Task" onPress={updateTask} />
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

export default EditTaskScreen;
