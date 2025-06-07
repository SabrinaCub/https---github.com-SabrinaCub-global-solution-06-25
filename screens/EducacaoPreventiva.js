import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { FontAwesome5 } from '@expo/vector-icons';

export default function EducacaoScreen() {
const [activeSections, setActiveSections] = useState({});

const toggleSection = (key) => {
    setActiveSections((prev) => ({ ...prev, [key]: !prev[key] }));
};

return (
    <ScrollView style={styles.container}>
    <Text style={styles.title}>Educação Preventiva</Text>

      {/* Seção 1: Itens de Evacuação */}
    <TouchableOpacity style={styles.box} onPress={() => toggleSection('evacuacao')}>
        <Text style={styles.boxTitle}>🧳 O que levar em caso de evacuação</Text>
    </TouchableOpacity>
    <Collapsible collapsed={!activeSections.evacuacao}>
        <View style={styles.content}>
        <Text>- Documentos pessoais</Text>
        <Text>- Remédios essenciais</Text>
        <Text>- Água potável</Text>
        <Text>- Alimentos não perecíveis</Text>
        <Text>- Roupas e itens de higiene</Text>
        </View>
    </Collapsible>

      {/* Seção 2: Enchente */}
    <TouchableOpacity style={styles.box} onPress={() => toggleSection('enchente')}>
        <Text style={styles.boxTitle}>🌊 O que fazer em caso de Enchente</Text>
    </TouchableOpacity>
    <Collapsible collapsed={!activeSections.enchente}>
        <View style={styles.content}>
        <Text>- Evite contato com a água da enchente</Text>
        <Text>- Desligue a energia elétrica</Text>
        <Text>- Vá para locais altos e seguros</Text>
        </View>
    </Collapsible>

      {/* Seção 3: Deslizamento */}
    <TouchableOpacity style={styles.box} onPress={() => toggleSection('deslizamento')}>
        <Text style={styles.boxTitle}>🏔 O que fazer em caso de Deslizamento</Text>
    </TouchableOpacity>
    <Collapsible collapsed={!activeSections.deslizamento}>
        <View style={styles.content}>
        <Text>- Observe rachaduras ou inclinação do terreno</Text>
        <Text>- Avise vizinhos e autoridades</Text>
        <Text>- Saia imediatamente da área de risco</Text>
        </View>
    </Collapsible>

      {/* Seção 4: Terremoto */}
    <TouchableOpacity style={styles.box} onPress={() => toggleSection('terremoto')}>
        <Text style={styles.boxTitle}>🌍 O que fazer em caso de Terremoto</Text>
    </TouchableOpacity>
    <Collapsible collapsed={!activeSections.terremoto}>
        <View style={styles.content}>
        <Text>- Proteja-se sob mesas ou estruturas firmes</Text>
        <Text>- Fique longe de janelas e objetos que possam cair</Text>
        <Text>- Após o tremor, evacue o local com calma</Text>
        </View>
    </Collapsible>

      {/* Links oficiais */}
    <View style={styles.linksBox}>
        <Text style={styles.sectionTitle}>🔗 Links e Aplicativos Oficiais</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.defesacivil.gov.br/')}>
        <Text style={styles.link}>🌐 Defesa Civil Nacional</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.inmet.gov.br/')}>
        <Text style={styles.link}>🌐 INMET - Instituto Nacional de Meteorologia</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=br.gov.sp.defesacivil.alertasp')}>
        <Text style={styles.link}>📱 App Alerta SP (Google Play)</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff9f2',
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
},
box: {
    backgroundColor: '#ffd966',
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
},
boxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
},
content: {
    backgroundColor: '#fff2cc',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
},
linksBox: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#d9ead3',
    borderRadius: 12,
},
sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
},
link: {
    color: '#0645AD',
    fontSize: 16,
    marginBottom: 8,
},

});
