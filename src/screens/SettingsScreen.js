import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const App = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Something went wrong while fetching the data.');
      }
      const result = await response.json();
      console.log('Result',result)
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render item for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? ( // Show loading indicator while data is being fetched
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? ( // Show error message if an error occurred
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, 
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: height * 0.1, 
  },
  itemContainer: {
    padding: width * 0.04, 
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: height * 0.01, 
  },
  title: {
    fontSize: width * 0.05, 
    color:"#000",
    fontWeight: 'bold',
    marginBottom: height * 0.01, 
  },
  body: {
    fontSize: width * 0.04, 
    color:"#000",
    fontWeight: '400',
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: width * 0.045, // Responsive font size
  },
});

export default App;
