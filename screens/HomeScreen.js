import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';


export default function HomeScreen({ navigation }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Alerta Cidadão</Text>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Alertas')}>
          <MaterialIcons name="warning" size={36} color={styles.iconColor.color} />
          <Text style={styles.cardText}>Alertas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Mapa')}>
          <Entypo name="map" size={36} color={styles.iconColor.color} />
          <Text style={styles.cardText}>Mapa de Apoio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SOS')}>
          <FontAwesome5 name="hands-helping" size={36} color={styles.iconColor.color} />
          <Text style={styles.cardText}>SOS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Educacao')}>
          <FontAwesome5 name="book" size={36} color={styles.iconColor.color} />
          <Text style={styles.cardText}>Educação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const CARD_SIZE = Dimensions.get('window').width / 2 - 30;

const getStyles = (isDark) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: isDark ? '#121212' : '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: isDark ? '#fff' : '#000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: isDark ? '#bb4444' : '#ff5e5e',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconColor: {
    color: '#fff',
  }
});
