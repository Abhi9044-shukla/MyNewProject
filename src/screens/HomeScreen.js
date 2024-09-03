// App.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from './../component/TodoItems';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const App = ({ navigation }) => {
  // State to store the tasks
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  // Function to load tasks from local storage
  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks from storage:', error);
    }
  };

  // Function to save tasks to local storage
  const saveTasks = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave));
    } catch (error) {
      console.error('Failed to save tasks to storage:', error);
    }
  };

  // Function to add a new task
  const addTask = () => {
    if (taskInput.trim() === '') return; // Do nothing if input is empty
    const newTasks = [...tasks, { id: Date.now(), text: taskInput, completed: false }];
    setTasks(newTasks);
    setTaskInput('');
    saveTasks(newTasks);
  };

  // Function to update an existing task
  const updateTask = () => {
    if (taskInput.trim() === '') return; // Do nothing if input is empty
    const updatedTasks = tasks.map((task) =>
      task.id === editingId ? { ...task, text: taskInput } : task
    );
    setTasks(updatedTasks);
    setTaskInput('');
    setIsEditing(false);
    setEditingId(null);
    saveTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  // Function to toggle the completion status of a task
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Function to handle the edit action
  const startEditing = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setTaskInput(taskToEdit.text);
    setIsEditing(true);
    setEditingId(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          placeholderTextColor={'grey'}
          value={taskInput}
          onChangeText={setTaskInput}
        />
        {isEditing ? (
            <TouchableOpacity style={styles.button} onPress={updateTask}>
             <Text style={styles.buttonText}>Update Task</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={styles.button} onPress={addTask}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
            startEditing={startEditing}
          />
        )}
      />
    <View style={styles.buttonsView}>
      <TouchableOpacity style={styles.buttonBottom} onPress={() => {
        navigation.navigate('Details', { itemId: 42, itemDescription: 'This is the details screen!' });
         }}>
        <Text style={styles.buttonText}>Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonBottom} onPress={() => navigation.navigate('CustomModal')}>
      <Text style={styles.buttonText}>Modal Page</Text>
    </TouchableOpacity>
     <TouchableOpacity style={styles.buttonBottom} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>Api Page</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, 
    backgroundColor: '#fff',
  },
  title: {
    fontSize: width * 0.06, 
    fontWeight: 'bold',
    color:"#000",
    marginBottom: height * 0.02, 
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: width * 0.02,
    padding: width * 0.03, 
    marginRight: width * 0.02,
    color:'#000',
    alignSelf:'center',
    fontSize:width * 0.04,
    height :height * 0.06,
  },
  buttonsView: {
    flexDirection:'row',
    justifyContent:"space-between"
  },
  button: {
    backgroundColor: '#007BFF', 
    borderRadius: width * 0.02, 
    padding: width * 0.03, 
    margin: width * 0.02, 
  },
  buttonBottom: {
    backgroundColor: '#007BFF', 
    borderRadius: width * 0.02, 
    padding: width * 0.03, 
    width:width * 0.2, 
    margin: width * 0.01, 
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: width * 0.05, 
    textAlign: 'center',
  },
});

export default App;
