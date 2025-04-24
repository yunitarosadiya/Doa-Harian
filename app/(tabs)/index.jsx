import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [doa, setDoa] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDoa = async () => {
      try {
        const response = await fetch('https://open-api.my.id/api/doa');
        const data = await response.json();
        // Ambil 1 doa random
        const randomDoa = data[Math.floor(Math.random() * data.length)];
        setDoa(randomDoa);
      } catch (error) {
        console.error('Error fetching doa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoa();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Memuat doa harian...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Doa Hari Ini</Text>

      <Text style={styles.label}>Judul:</Text>
      <Text style={styles.value}>{doa.doa}</Text>

      <Text style={styles.label}>Arab:</Text>
      <Text style={styles.arab}>{doa.ayat}</Text>

      <Text style={styles.label}>Latin:</Text>
      <Text style={styles.value}>{doa.latin}</Text>

      <Text style={styles.label}>Arti:</Text>
      <Text style={styles.value}>{doa.artinya}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Lihat Semua Doa" onPress={() => router.push('/tabs/all')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  arab: {
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'right',
    fontFamily: 'sans-serif',
  },
  buttonContainer: {
    marginTop: 30,
  },
});
