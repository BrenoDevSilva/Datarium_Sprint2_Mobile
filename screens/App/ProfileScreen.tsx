import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Button, StatusBar } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.15.73:8080";

const ProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const navigation = useNavigation();

  // Busca o ID do usuário do AsyncStorage
  const fetchUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      return userId;
    } catch (error) {
      console.error("Erro ao buscar userId:", error);
      return null;
    }
  };

  // Busca perfil na API
  const fetchProfile = async () => {
    const clientId = await fetchUserId();
    if (!clientId) {
      Alert.alert("Erro", "ID do usuário não encontrado.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/clientes/${clientId}`);
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o perfil.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza perfil na API
  const updateProfile = async () => {
    if (!profile) return;
    setSaving(true);
    const clientId = await fetchUserId();

    try {
      const response = await fetch(`${API_URL}/clientes/${clientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      } else {
        Alert.alert("Erro", "Não foi possível atualizar o perfil.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha na comunicação com a API.");
    } finally {
      setSaving(false);
    }
  };

  // Função para o logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Sessão encerrada', 'Você foi desconectado com sucesso.');

      // Usa navigation.reset() para voltar à tela de login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });

    } catch (error) {
      console.error('Erro ao encerrar a sessão:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao encerrar a sessão.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={{ color: "#FFF", marginTop: 10 }}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <Text style={styles.label}>Perfil de Investidor:</Text>
      <Picker
        selectedValue={profile?.perfilInvestidor}
        onValueChange={(value) => setProfile({ ...profile, perfilInvestidor: value })}
        style={styles.picker}
      >
        <Picker.Item label="Conservador" value="CONSERVADOR" />
        <Picker.Item label="Moderado" value="MODERADO" />
        <Picker.Item label="Agressivo" value="AGRESSIVO" />
      </Picker>

      <Text style={styles.label}>Objetivo:</Text>
      <Picker
        selectedValue={profile?.objetivo}
        onValueChange={(value) => setProfile({ ...profile, objetivo: value })}
        style={styles.picker}
      >
        <Picker.Item label="Curto Prazo" value="CURTO_PRAZO" />
        <Picker.Item label="Médio Prazo" value="MEDIO_PRAZO" />
        <Picker.Item label="Longo Prazo" value="LONGO_PRAZO" />
      </Picker>

      <TouchableOpacity
        style={[styles.button, saving && { opacity: 0.6 }]}
        onPress={updateProfile}
        disabled={saving}
      >
        <Text style={styles.buttonText}>{saving ? "Salvando..." : "Salvar Alterações"}</Text>
      </TouchableOpacity>

      <View style={styles.logoutButtonContainer}>
        <Button title="Sair da Conta" onPress={handleLogout} color="#FF5C5C" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E172A",
    padding: 20,
    paddingTop: StatusBar.currentHeight + 15,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E172A",
  },
  title: {
    fontSize: 24,
    color: "#FFD700",
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 5,
  },
  picker: {
    backgroundColor: "#1E2841",
    borderRadius: 8,
    marginBottom: 20,
    color: "#FFF",
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#0E172A",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButtonContainer: {
    marginTop: 20,
  },
});

export default ProfileScreen;