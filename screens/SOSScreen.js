import * as Location from 'expo-location';
import * as MailComposer from 'expo-mail-composer';
import { useState } from 'react';
import {
    Alert,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';

export default function SOSScreen() {
  const [statusMsg, setStatusMsg] = useState('');

  const contatos = [
    { nome: 'Família', telefone: 'tel:11999999999' },
    { nome: 'Defesa Civil', telefone: 'tel:199' },
    { nome: 'SAMU', telefone: 'tel:192' },
  ];

  async function enviarLocalizacao() {
    try {
      Vibration.vibrate(200);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
      const mensagem = `🚨 Estou em situação de emergência. Minha localização é: ${link}`;

      // WhatsApp
      const whatsappURL = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
      Linking.openURL(whatsappURL);

      // SMS (opcional)
      if (Platform.OS === 'android') {
        Linking.openURL(`sms:?body=${encodeURIComponent(mensagem)}`);
      }

      // E-mail
      MailComposer.composeAsync({
        subject: 'Emergência - Minha Localização',
        body: mensagem,
        recipients: ['contato@exemplo.com'], // troque se quiser
      });

      setStatusMsg('✅ Localização enviada com sucesso!');
    } catch (error) {
      setStatusMsg('⚠️ Erro ao enviar localização');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🚨 Tela SOS</Text>

      <TouchableOpacity style={styles.botao} onPress={enviarLocalizacao}>
        <Text style={styles.textoBotao}>Enviar minha localização</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>📞 Contatos de Emergência</Text>
      {contatos.map((contato, index) => (
        <TouchableOpacity
          key={index}
          style={styles.contato}
          onPress={() => Linking.openURL(contato.telefone)}
        >
          <Text style={styles.textoContato}>{contato.nome}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.subtitulo}>⚡ Chamada Rápida</Text>
      <View style={styles.chamadas}>
        <TouchableOpacity
          style={styles.chamada}
          onPress={() => Linking.openURL('tel:193')}
        >
          <Text style={styles.chamadaTexto}>193</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chamada}
          onPress={() => Linking.openURL('tel:190')}
        >
          <Text style={styles.chamadaTexto}>190</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chamada}
          onPress={() => Linking.openURL('tel:199')}
        >
          <Text style={styles.chamadaTexto}>199</Text>
        </TouchableOpacity>
      </View>

      {statusMsg ? <Text style={styles.status}>{statusMsg}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8e1',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#b71c1c',
    textAlign: 'center',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#d32f2f',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  contato: {
    backgroundColor: '#ffebee',
    padding: 10,
    marginVertical: 4,
    borderRadius: 10,
  },
  textoContato: {
    fontSize: 16,
    color: '#c62828',
  },
  chamadas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  chamada: {
    backgroundColor: '#f44336',
    padding: 20,
    borderRadius: 20,
  },
  chamadaTexto: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  status: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

