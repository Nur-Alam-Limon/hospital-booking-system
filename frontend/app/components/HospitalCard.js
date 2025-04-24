import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HospitalCard({ hospital, onPress }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{hospital.name}</Text>

      {hospital.services?.length > 0 && (
        <View style={styles.serviceContainer}>
          {hospital.services.map((service, index) => (
            <Text key={index} style={styles.serviceText}>
              • {service}
            </Text>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Book Service</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  location: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  serviceContainer: {
    marginVertical: 8,
    padding: 10,
  },
  serviceText: {
    fontSize: 14,
    color: '#555',
  },
  
});
