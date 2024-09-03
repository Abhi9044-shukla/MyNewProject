// src/components/TodoItem.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const TodoItem = ({ item, toggleTaskCompletion, deleteTask, startEditing }) => {
  return (
    <View style={styles.taskContainer}>
      <CheckBox
        value={item.completed}
        onValueChange={() => toggleTaskCompletion(item.id)}
      />
      <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => startEditing(item.id)}>
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.01,
    padding: width * 0.02,
    borderWidth: 1,
    borderColor:'#ddd',
    borderRadius: width * 0.02,
  },
  taskText: {
    flex: 1,
    fontSize: width * 0.04,
    marginLeft: width * 0.02,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  editButton: {
    color: '#1E90FF',
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
  },
  deleteButton: {
    color: '#FF6347',
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
  },
});

export default TodoItem;
