import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('screen');

const darkModeStyle = [
  // seu estilo de mapa darkModeStyle aqui
];

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
  const [loginModalVisible, setLoginModalVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    const foundMarker = markers.find(marker => marker.note.includes(searchQuery));
    if (foundMarker) {
      setRegion({
        ...region,
        latitude: foundMarker.coords.latitude,
        longitude: foundMarker.coords.longitude,
      });
      Alert.alert('Busca', 'Local encontrado!');
    } else {
      Alert.alert('Busca', 'Rua não encontrada.');
    }
  };

  const newMarker = (e) => {
    if (username && password) {
      setSelectedCoordinates(e.nativeEvent.coordinate);
      setModalVisible(true);
    } else {
      Alert.alert('Erro', 'Você precisa fazer login para adicionar um marcador.');
    }
  };

  const handleAddMarker = () => {
    if (!selectedCoordinates) return;

    const dados = {
      key: markers.length.toString(),
      coords: {
        latitude: selectedCoordinates.latitude,
        longitude: selectedCoordinates.longitude,
      },
      note: note,
      status: status,
    };

    setMarkers([...markers, dados]);
    setNote('');
    setSelectedCoordinates(null);
    setModalVisible(false);
  };

  const handleMarkerPress = (marker) => {
    Alert.alert('Lembrete', marker.note);
  };

  const handleViewFavorites = () => {
    navigation.navigate('Favoritos', { markers: markers });
  };

  const handleLogin = () => {
    setLoginModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MobGov</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <MapView
        onMapReady={() => console.log("Mapa pronto")}
        style={styles.map}
        region={region}
        zoomEnabled={true}
        minZoomLevel={17}
        showsUserLocation={true}
        loadingEnabled={true}
        onPress={newMarker}
        customMapStyle={darkModeStyle}
      >
        {markers.map(marker => (
          <Marker
            key={marker.key}
            coordinate={marker.coords}
            onPress={() => handleMarkerPress(marker)}
          >
            <Text style={styles.marker}>
              {marker.status === 'good' ? '😊' : marker.status === 'bad' ? '😢' : marker.status === 'maintenance' ? '🛠️' : '🚧'}
            </Text>
          </Marker>
        ))}
      </MapView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
            onValueChange={setStatus}
          >
            <Picker.Item label="Acessível" value="good" />
            <Picker.Item label="Não Acessível" value="bad" />
            <Picker.Item label="Em Manutenção" value="maintenance" />
            <Picker.Item label="Interditado" value="closed" />
          </Picker>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddMarker}
          >
            <Text style={styles.addButtonText}>Adicionar Marcador</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={loginModalVisible}
        onRequestClose={() => setLoginModalVisible(false)}
      >
        <View style={styles.loginModalView}>
          <Text style={styles.loginHeaderText}>Login</Text>
          <TextInput
            placeholder="Usuário"
            value={username}
            onChangeText={setUsername}
            style={styles.loginInput}
          />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.loginInput}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Legenda</Text>
        <View style={styles.legendItem}>
          <Text style={styles.marker}>😊</Text>
          <Text style={styles.legendText}>Acessível</Text>
        </View>
        <View style={styles.legendItem}>
          <Text style={styles.marker}>😢</Text>
          <Text style={styles.legendText}>Não Acessível</Text>
        </View>
        <View style={styles.legendItem}>
          <Text style={styles.marker}>🛠️</Text>
          <Text style={styles.legendText}>Em Manutenção</Text>
        </View>
        <View style={styles.legendItem}>
          <Text style={styles.marker}>🚧</Text>
          <Text style={styles.legendText}>Interditado</Text>
        </View>
      </View>
      <ScrollView style={styles.tableContainer}>
        <Text style={styles.tableHeader}>Regiões Registradas</Text>
        {markers.map(marker => (
          <View key={marker.key} style={styles.tableRow}>
            <Text style={styles.tableCell}>Latitude: {marker.coords.latitude}</Text>
            <Text style={styles.tableCell}>Longitude: {marker.coords.longitude}</Text>
            <Text style={styles.tableCell}>Nota: {marker.note}</Text>
            <Text style={styles.tableCell}>Status: {marker.status}</Text>
          </View>
        ))}
      </ScrollView>
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
    marginBottom: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  noteInput: {
    width: width * 0.8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  marker: {
    fontSize: 24,
  },
  map: {
    width: width,
    height: height - 400,
    marginBottom: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendText: {
    marginLeft: 15,
    fontSize: 5,
  },
  loginModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loginHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginInput: {
    width: width * 0.8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  tableContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 10,
  },
  tableHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default MapPage;


   





