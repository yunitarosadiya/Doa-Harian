import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Tahan splash screen dulu
SplashScreen.preventAutoHideAsync();

export default function Home() {
  const [doaList, setDoaList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      // Tahan splash screen selama 2 detik
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Ambil data
      try {
        const res = await fetch('https://open-api.my.id/api/doa');
        const data = await res.json();
        console.log('Data Doa:', data);
        setDoaList(data);
      } catch (err) {
        console.error('Gagal ambil doa:', err);
      }

      // Sembunyikan splash screen
      await SplashScreen.hideAsync();
    };

    loadData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#111', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 12 }}>
        Doa Harian
      </Text>
      <Text style={{ color: '#ccc', marginBottom: 20 }}>
        Semangat beribadah dan tingkatkan kebaikan setiap hari!
      </Text>

      {doaList.length === 0 ? (
        <Text style={{ color: '#ccc' }}>Sedang memuat doa...</Text>
      ) : (
        <FlatList
          data={doaList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: 16,
                backgroundColor: '#1f3b4d',
                marginBottom: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#2ecc71',
                shadowColor: '#2ecc71',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
              }}
              onPress={() =>
                router.push({ pathname: '/detail', params: { id: item.id } })
              }
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{item.judul}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
