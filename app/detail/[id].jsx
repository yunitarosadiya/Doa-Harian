import React, { useEffect, useState } from 'react'; 
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';


export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const [doa, setDoa] = useState(null);
  const [loading, setLoading] = useState(true); 
  

  useEffect(() => {
    if (id) {
      fetch(`https://open-api.my.id/api/doa`)
        .then(res => res.json())
        .then(data => {
          console.log("Data Doa:", data); // Log data untuk melihat apakah id benar
          const found = data.find(item => item.id == id);
          setDoa(found);
          setLoading(false);
        })
        .catch(err => {
          console.error('Gagal fetch detail doa:', err);
          setLoading(false);
        });
    }
  }, [id]);
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (!doa) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Doa tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Gambar Latar atau Background */}
      <Image 
        source={{ uri: 'https://example.com/background.jpg' }} 
        style={styles.backgroundImage} 
      />
      
      <Text style={{ color: '#aaa', fontSize: 14, marginBottom: 4 }}>Detail Doa Harian</Text>
      <Text style={styles.doaTitle}>{doa.doa}</Text>
      <Text style={styles.doaSubtitle}>Ayat: {doa.ayat}</Text>
      <Text style={styles.doaSubtitle}>Latin: {doa.latin}</Text>

      <Text style={styles.doaMeaningTitle}>Artinya:</Text>
      <Text style={styles.doaMeaning}>{doa.artinya}</Text>

      {/* Tombol Kembali */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Kembali ke Daftar Doa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121c1d',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121c1d',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    opacity: 0.3,
  },
  doaTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  doaSubtitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 4,
  },
  doaMeaningTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  doaMeaning: {
    color: 'white',
    fontSize: 16,
    fontStyle: 'italic',
  },
  backButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#1e90ff',
    borderRadius: 4,
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
