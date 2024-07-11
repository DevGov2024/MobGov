// StatusTable.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const initialLocations = [
  { id: 1, name: 'Local A', status: 'green', description: 'Acessível para cadeirantes' },
  { id: 2, name: 'Local B', status: 'yellow', description: 'Parcialmente acessível' },
  { id: 3, name: 'Local x', status: 'blue', description: 'Sem acessibilidade' },
];

const Favoritos = ({ navigation }) => {
  const [locations, setLocations] = useState(initialLocations);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabela de Status dos Locais</Text>
      <FlatList
        data={locations}
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
                    item.status === 'green' ? 'green' : item.status === 'yellow' ? 'yellow' : 'blue',
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Favoritos;
