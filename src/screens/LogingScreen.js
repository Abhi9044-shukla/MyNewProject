import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const FormScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Validation function to check input fields
  const validate = () => {
    let valid = true;
    let errors = {};

    // Name validation
    if (name.trim() === '') {
      errors.name = 'Name is required.';
      valid = false;
    }

    // Email validation
    if (email.trim() === '') {
      errors.email = 'Email is required.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
      valid = false;
    }

    // Password validation
    if (password.trim() === '') {
      errors.password = 'Password is required.';
      valid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  // Validate form inputs whenever they change
  const handleInputChange = (field, value) => {
    switch (field) {
      case 'name':
        setName(value);
        if (errors.name) setErrors({ ...errors, name: undefined });
        break;
      case 'email':
        setEmail(value);
        if (errors.email) setErrors({ ...errors, email: undefined });
        break;
      case 'password':
        setPassword(value);
        if (errors.password) setErrors({ ...errors, password: undefined });
        break;
      default:
        break;
    }

    // Update form validity after each change
    setIsFormValid(validate());
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validate()) {
      console.log('Form submitted successfully!');
      navigation.navigate('Home'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.login}>Login Form with Validation</Text>
      <View style={styles.formContainer}>
        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => handleInputChange('email', text)}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => handleInputChange('password', text)}
          secureTextEntry
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={!isFormValid}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '100%',
  },
  login: {
    color: '#000', 
    fontWeight:"bold",
    fontSize: width * 0.06, 
    textAlign: 'center',
    marginBottom: height * 0.02, 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: width * 0.02, 
    padding: width * 0.03, 
    marginBottom: height * 0.02, 
    fontSize: width * 0.04, 
  },
  errorText: {
    color: 'red',
    marginBottom: height * 0.015,
    fontSize: width * 0.035,
  },
  button: {
    backgroundColor: '#007BFF', 
    borderRadius: width * 0.02, 
    padding: width * 0.03, 
    margin: width * 0.02, 
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: width * 0.05, 
    textAlign: 'center',
  },
});

export default FormScreen;
