import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import API from '../services/api';
import HospitalCard from '../components/HospitalCard';

export default function HomeScreen({ navigation }) {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHospitals = async () => {
    try {
      const res = await API.get('/bookings/hospitals');
      setHospitals(res.data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHospitals();
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No hospitals found.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4f46e5" style={styles.loader} />
      ) : (
        <FlatList
          data={hospitals}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <HospitalCard
              hospital={item}
              onPress={() => navigation.navigate('Book', { hospital: item })}
            />
          )}
          contentContainerStyle={[
            styles.listContent,
            hospitals.length === 0 && { flex: 1 },
          ]}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f5',
  },
  listContent: {
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
    fontWeight: '500',
  },
});
