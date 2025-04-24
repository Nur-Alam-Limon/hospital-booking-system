import React, { useState } from 'react';
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import API from '../services/api';

export default function CreateHospitalScreen() {
  const [name, setName] = useState('');
  const [servicesText, setServicesText] = useState('');

  const handleSubmit = async () => {
    const servicesArray = servicesText.split(',').map(service => service.trim());

    if (!name || servicesArray.length === 0) {
      Alert.alert('Validation Error', 'Please fill in all fields correctly.');
      return;
    }

    try {
      const res = await API.post('/hospitals/create', {
        name,
        services: servicesArray,
      });

      Alert.alert('Success', res.data.message);
      setName('');
      setServicesText('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create hospital.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Hospital Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter hospital name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Services (comma-separated):</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Cardiology, Pediatrics"
        value={servicesText}
        onChangeText={setServicesText}
      />

      <Button title="Create Hospital" onPress={handleSubmit} color="#4f46e5" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});
