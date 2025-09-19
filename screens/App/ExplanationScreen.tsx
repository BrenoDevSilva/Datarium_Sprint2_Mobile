import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import ExpandableCard from '../../components/ExpandableCard';

const ExplanationsScreen = () => {
  return (
  <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
    <StatusBar barStyle="light-content" />
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Explicações</Text>
      <Text style={styles.headerDescription}>
        Bem-vindo à seção de Explicações do Datarium!
        Aqui você encontrará informações valiosas para
        entender o mundo dos investimentos e tomar
        decisões mais informadas. Navegue pelos tópicos
        abaixo para aprimorar seus conhecimentos.
      </Text>
    </View>
      <ExpandableCard title="O que são Ações?">
        <Text style={styles.cardText}>
          Ações são pequenas partes de uma empresa. Ao comprar uma ação, você se torna
          sócio da companhia e pode lucrar com a valorização do papel ou com a
          distribuição de lucros (dividendos).
        </Text>
      </ExpandableCard>
      <ExpandableCard title="Fundos de investimento">
        <Text style={styles.cardText}>
          Fundos de investimento são como "condomínios" de investidores.
          Seu dinheiro é somado ao de outras pessoas e um gestor profissional
          toma as decisões de onde investir.
        </Text>
      </ExpandableCard>
      <ExpandableCard title="O que é renda fixa?">
        <Text style={styles.cardText}>
          Renda fixa é um tipo de investimento onde a rentabilidade pode ser
          estimada no momento da aplicação. Geralmente, são mais seguros
          e previsíveis, como o Tesouro Direto e os CDBs.
        </Text>
      </ExpandableCard>
      <ExpandableCard title="Gerenciamento de Risco">
        <Text style={styles.cardText}>
          Gerenciar riscos é a chave para o sucesso a longo prazo. Isso
          envolve diversificar a carteira de investimentos e entender
          sua tolerância a perdas.
        </Text>
      </ExpandableCard>
      <ExpandableCard title="Planejamento Financeiro Básico">
        <Text style={styles.cardText}>
          Planejamento financeiro envolve organizar suas finanças, definir
          metas de curto, médio e longo prazo, e criar um orçamento.
        </Text>
      </ExpandableCard>
      <ExpandableCard title="Glossário Financeiro">
        <Text style={styles.cardText}>
          Aqui você encontrará os principais termos do mercado financeiro,
          como "Inflação", "SELIC" e "CDI".
        </Text>
      </ExpandableCard>
      <ExpandableCard title="Perguntas Frequentes (FAQ)">
        <Text style={styles.cardText}>
          Nesta seção, você encontrará as respostas para as perguntas mais
          comuns sobre o aplicativo e sobre investimentos.
        </Text>
      </ExpandableCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#0E172A',
  },
  contentContainer: {
    padding: 15,
    paddingTop: StatusBar.currentHeight + 15,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2D3748',
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerDescription: {
    fontSize: 16,
    color: '#A0AEC0',
    lineHeight: 24,
  },
  cardText: {
    color: '#A0AEC0',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ExplanationsScreen;