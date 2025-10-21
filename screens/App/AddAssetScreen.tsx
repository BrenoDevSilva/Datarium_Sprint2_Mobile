import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Button, ScrollView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const API_URL = "http://192.168.15.73:8080";

const AddAssetScreen = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('RENDA_FIXA');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const navigation = useNavigation();

  const handleAddAsset = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert("Erro", "Usuário não logado.");
        return;
      }

      const response = await fetch(`${API_URL}/ativos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          tipo,
          valor: parseFloat(valor),
          descricao,
          cliente: { id: parseInt(userId) },
        }),
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Ativo adicionado com sucesso!');
        navigation.goBack(); // Volta para a tela de Portfólio
      } else {
        Alert.alert('Erro', 'Falha ao adicionar ativo.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro. Verifique sua conexão com a API.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adicionar Ativo</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.label}>Nome do Ativo:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Tesouro Selic 2029"
        placeholderTextColor="#A0AEC0"
      />

      <Text style={styles.label}>Tipo de Ativo:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipo}
          onValueChange={(itemValue) => setTipo(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Renda Fixa" value="RENDA_FIXA" />
          <Picker.Item label="Ações" value="RENDA_VARIAVEL" />
          <Picker.Item label="Fundos" value="FUNDO" />
        </Picker>
      </View>

      <Text style={styles.label}>Valor Investido (R$):</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        placeholder="1000.00"
        placeholderTextColor="#A0AEC0"
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Ativo de renda fixa."
        placeholderTextColor="#A0AEC0"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddAsset}>
        <Text style={styles.addButtonText}>Adicionar ao Portfólio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E172A',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: StatusBar.currentHeight,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  label: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1E2841',
    color: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#1E2841',
    borderRadius: 8,
    marginBottom: 20,
  },
  picker: {
    color: '#FFF',
  },
  pickerItem: {
    color: '#FFF',
  },
  addButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#0E172A',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddAssetScreen;