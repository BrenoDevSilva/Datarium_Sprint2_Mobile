import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import MyPieChart from '../../components/PieChart';
import AssetCard from '../../components/AssetCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const API_URL = "http://192.168.0.110:8080";
const screenWidth = Dimensions.get('window').width;

const PortfolioScreen = () => {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert("Erro", "ID do usuário não encontrado.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/ativos/cliente/${userId}`);
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao carregar ativos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchAssets();
    }
  }, [isFocused]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={{ color: "#FFF", marginTop: 10 }}>Carregando ativos...</Text>
      </View>
    );
  }

  // Lógica para gerar os dados do gráfico de pizza
  const chartData = assets.reduce((acc, asset) => {
    const existingEntry = acc.find(item => item.name === asset.tipo);
    const colorMap = {
      RENDA_FIXA: '#FFD700',
      RENDA_VARIAVEL: '#32CD32',
      FUNDO: '#4682B4',
    };
    if (existingEntry) {
      existingEntry.value += asset.valor || 0;
    } else {
      acc.push({
        name: asset.tipo,
        value: asset.valor || 0,
        color: colorMap[asset.tipo] || '#A0AEC0',
        legendFontColor: '#FFF',
        legendFontSize: 14,
      });
    }
    return acc;
  }, []);

  const patrimonioTotal = assets.reduce((sum, item) => sum + (item.valor || 0), 0);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Carteira</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddAsset')}>
          <Ionicons name="add-outline" size={24} color="#0E172A" />
        </TouchableOpacity>
      </View>

      <Text style={styles.patrimonioTotal}>R$ {patrimonioTotal.toFixed(2)}</Text>

      {assets.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Alocação de Ativos</Text>
          <MyPieChart data={chartData} />
          {chartData.map((item, index) => (
            <View key={index} style={styles.legendContainer}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.name}: R$ {item.value.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.assetList}>
        {assets.map(asset => (
          <AssetCard key={asset.id} name={asset.nome} value={asset.valor} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E172A',
    padding: 15,
    paddingTop: StatusBar.currentHeight + 15,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0E172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  patrimonioTotal: {
    fontSize: 36,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#FFD700',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1E2841',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  assetList: {
    marginTop: 15,
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  legendText: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default PortfolioScreen;