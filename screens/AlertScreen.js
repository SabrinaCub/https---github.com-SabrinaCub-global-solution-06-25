import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = '832e1f8fa7c9c0b67063bb7d0c87427e';

export default function AlertasScreen() {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Carregando...');
  
  useEffect(() => {
    buscarAlertas();
  }, []);

  async function buscarAlertas() {
    try {
      setStatus('Obtendo localização...');
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setStatus('Permissão de localização negada.');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setStatus('Buscando alertas...');
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=pt_br&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.alerts) {
        setAlertas(data.alerts);
        await AsyncStorage.setItem('cachedAlertas', JSON.stringify(data.alerts));
        setStatus('Alertas atualizados.');
      } else {
        setAlertas([]);
        setStatus('Nenhum alerta encontrado.');
      }
    } catch (error) {
      setStatus('Erro. Carregando dados do cache...');
      const cached = await AsyncStorage.getItem('cachedAlertas');
      if (cached) {
        setAlertas(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <ActivityIndicator color="#000" style={{ marginTop: 40 }} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.status}>{status}</Text>
      {alertas.length > 0 ? (
        alertas.map((alerta, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.titulo}>{alerta.event}</Text>
            <Text style={styles.descricao}>{alerta.description}</Text>
            <Text style={styles.enviadoPor}>Fonte: {alerta.sender_name}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.semAlerta}>Sem alertas no momento.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  status: { textAlign: 'center', marginBottom: 12 },
  card: {
    backgroundColor: '#FFF3CD',
    borderColor: '#FFEEBA',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12
  },
  titulo: { fontWeight: 'bold', fontSize: 18 },
  descricao: { marginTop: 8 },
  enviadoPor: { marginTop: 8, fontStyle: 'italic', fontSize: 12 },
  semAlerta: { textAlign: 'center', marginTop: 20 }
});
