import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const CustomModal = ({ visible, title, body, onConfirm, onCancel }) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const [opacity] = useState(new Animated.Value(0)); // For fade-in and fade-out effect
  const [scale] = useState(new Animated.Value(0.8)); // For scale animation

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      openModal();
    } else {
      closeModal();
    }
  }, [visible]);

  const openModal = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
    });
  };

  return (
    <Modal transparent visible={modalVisible} animationType="none">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContainer, { opacity, transform: [{ scale }] }]}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.body}>{body}</View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.8,
    padding: width * 0.05,
    backgroundColor: '#fff',
    borderRadius: width * 0.02,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  body: {
    marginBottom: height * 0.02,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: height * 0.015,
    alignItems: 'center',
    borderRadius: width * 0.02,
    backgroundColor: '#2196F3',
    marginHorizontal: width * 0.01,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
});

export default CustomModal;
