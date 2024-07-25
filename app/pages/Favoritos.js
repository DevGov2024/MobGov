import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Favoritos = ({ route, navigation }) => {
  const { regions } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabela de Status dos Locais</Text>
      <FlatList
        data={regions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <Text style={styles.locationName}>{item.name}</Text>
            <Text style={styles.locationDescription}>{item.description}</Text>
            <View
              style={[
                styles.statusIndicator,
                {
                  backgroundColor:
                    item.status === 'green' ? 'green' : item.status === 'yellow' ? 'yellow' : 'red',
                },
              ]}
            />
          </View>
        )}
      />
     
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MapPage')}
      >
        <Text style={styles.buttonText}>Voltar ao Mapa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0A3979'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'white'
  },
  locationItem: {
     
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    backgroundColor: '#F47926'
    

  },
  locationName: {
    fontSize: 18,
    flex: 2,
  },
  locationDescription: {
    fontSize: 14,
    flex: 3,
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#0A3979',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Favoritos;

