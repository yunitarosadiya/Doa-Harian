import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function AllDoaScreen() {
  const [doaList, setDoaList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchDoa = async () => {
      try {
        const response = await fetch('https://open-api.my.id/api/doa');
        const data = await response.json();
        setDoaList(data);
        console.log("Data dari API:", data);
      } catch (error) {
        console.error('Gagal mengambil data doa:', error);
      }
    };

    fetchDoa();
  }, []);

  const filteredDoa = doaList.filter((item) =>
    item.doa.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.artinya.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/tabs/doa/${item.id}`)} 
    >
      <Text style={styles.cardTitle}>{item.doa}</Text>
      <Text numberOfLines={2} style={styles.cardPreview}>{item.artinya}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cari doa..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredDoa}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#e0f7fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardPreview: {
    fontSize: 14,
    marginTop: 5,
    color: '#444',
  },
});
