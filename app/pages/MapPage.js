import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Button, TouchableOpacity, Alert, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('screen');

const MapPage = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('good');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização negada');
      return;
    }
    getMyLocation();
  };

  const getMyLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.log('Erro ao obter localização:', error);
    }
  };

  const handleSearch = async () => {
    // Implemente a pesquisa de localização aqui
  };

  const newMarker = (e) => {
    setSelectedCoordinates(e.nativeEvent.coordinate);
    setModalVisible(true);
  };

  const handleAddMarker = () => {
    if (!selectedCoordinates) return;

    let dados = {
      key: markers.length.toString(),
      coords: {
        latitude: selectedCoordinates.latitude,
        longitude: selectedCoordinates.longitude,
      },
      note: note,
      status: status,
    };

    setMarkers(oldArray => [...oldArray, dados]);
    setNote('');
    setSelectedCoordinates(null);
    setModalVisible(false);
  };

  const handleMarkerPress = (marker) => {
    Alert.alert('Lembrete', marker.note);
  };

  const handleViewFavorites = () => {
    navigation.navigate('Favorito', { markers: markers });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Coruja</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Digite o nome da rua"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
        <Button title="Pesquisar" onPress={handleSearch} />
      </View>
      <MapView
        onMapReady={() => {
          console.log("Mapa pronto");
        }}
        style={{ width: width, height: height }}
        region={region}
        zoomEnabled={true}
        minZoomLevel={17}
        showsUserLocation={true}
        loadingEnabled={true}
        onPress={(e) => newMarker(e)}
      >
        {markers.map(marker => (
          <Marker
            key={marker.key}
            coordinate={marker.coords}
            pinColor={marker.status === 'good' ? 'green' : 'red'}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>
      <Button title="Ver Favoritos" onPress={handleViewFavorites} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <TextInput
            placeholder="Insira um lembrete"
            value={note}
            onChangeText={setNote}
            style={styles.noteInput}
          />
          <Picker
            selectedValue={status}
            style={styles.picker}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="Boa" value="good" />
            <Picker.Item label="Ruim" value="bad" />
          </Picker>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddMarker}
          >
            <Text style={styles.addButtonText}>Adicionar Marcador</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Favoritos')}
      >
        <Text style={styles.buttonText}>Ver Tabela de Locais</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A3979',
  },
  header: {
    height: 50,
    backgroundColor: '#0A3979',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  noteInput: {
    width: width * 0.8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    width: width * 0.8,
    height: 50,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  statusTable: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default MapPage;


   





