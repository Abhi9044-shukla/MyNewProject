import React, { useState } from 'react';
import { SafeAreaView, View, Button, Text, StyleSheet } from 'react-native';
import CustomModal from './../component/CustomModal';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Show Modal" onPress={() => setModalVisible(true)} />
      <CustomModal
        visible={modalVisible}
        title="Custom Modal Title"
        body={<Text>This is the body content of the modal.</Text>}
        onConfirm={() => {
          setModalVisible(false);
          console.log('Confirmed!');
        }}
        onCancel={() => {
          setModalVisible(false);
          console.log('Cancelled!');
        }}
      />
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
});

export default App;
