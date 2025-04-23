import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import API from '../services/api';

export default function BookingScreen({ route, navigation }) {
  const [service, setService] = useState('');
  const [loading, setLoading] = useState(false);
  const hospital = route.params.hospital;

  const handleBooking = async () => {
    if (!service.trim()) {
      return Alert.alert('Validation', 'Please enter a service/test name.');
    }

    setLoading(true);
    try {
      let res=await API.post('/bookings', { hospitalId: hospital.id, service });
      
      Alert.alert('Success', 'Booked successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Book a Service</Text>
        <Text style={styles.hospitalName}>{hospital.name}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter service or test name"
          value={service}
          onChangeText={setService}
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleBooking}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Booking...' : 'Book Now'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f5',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4f46e5',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
