import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AssetCardProps {
  name: string;
  value: number | null; // Adicione o tipo null
}

const AssetCard: React.FC<AssetCardProps> = ({ name, value }) => {
  // Formata o valor apenas se ele não for null
  const formattedValue = value !== null ? `R$ ${value.toFixed(2)}` : 'R$ 0.00';
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.value}>{formattedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E2841',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default AssetCard;