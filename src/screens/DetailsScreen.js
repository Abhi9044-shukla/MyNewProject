// src/screens/DetailsScreen.js
import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';

const DetailsScreen = ({ route, navigation }) => {
  // Extract the params passed from HomeScreen
  const { itemId, itemDescription } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text style={styles.text}>Item ID: {itemId}</Text>
      <Text style={styles.text}>Description: {itemDescription}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DetailsScreen;
