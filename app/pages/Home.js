import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, FlatList, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const products = [
  {
    id: 1,
    name: 'Desenvolvimento sustentável',
    image: 'https://static.politize.com.br/2023/11/desenvolvimento-sustentavel.png',
    description: 'Quando falamos em desenvolvimento sustentável, estamos pensando em maneiras de melhorar a vida das pessoas, seguindo algumas ideias, como: erradicação da pobreza, fome zero, vida debaixo da água, vida sobre a terra, etc...'
  },
  {
    id: 2,
    name: 'Fome zero',
    image: 'https://www.ufmg.br/espacodoconhecimento/wp-content/uploads/2021/03/ODS-2-ONU-fome-green-business-post-500x500.png',
    description: 'Pretende acabar com todas as formas de fome e má nutrição até 2030, de modo a garantir que todas as pessoas - especialmente as crianças - tenham acesso suficiente a alimentos nutritivos durante todos os anos.'
  },
  {
    id: 3,
    name: 'Vida debaixo da água',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOVla5PVboJ7m8YdlNL-nKdomy8coVAQol4A&s',
    description: 'Prevenir e reduzir significativamente a poluição marinha de todos os tipos, especialmente a advinda de atividades terrestres, incluindo detritos marinhos e a poluição por nutrientes.'
  },
];

const { width, height } = Dimensions.get('screen');

const Home = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([
    { id: 1, coords: { latitude: -23.55052, longitude: -46.633308 }, title: 'Local A', status: 'good', note: 'Ótimo local' },
    { id: 2, coords: { latitude: -23.55352, longitude: -46.634308 }, title: 'Local B', status: 'bad', note: 'Local ruim' },
  ]);
  const [feedbacks] = useState([
    { id: 1, user: 'Carlos Almeida', comment: 'Ótimo aplicativo! Me ajudou muito.' },
    { id: 2, user: 'Amanda Rodriguez', comment: 'Muito útil para encontrar locais acessíveis.' },
    { id: 3, user: 'Edna Montes', comment: 'Sou uma pessoa com mobilidade reduzida, e é muito satisfatório ter um aplicativo como Amigos Mobilidade Sp, para me ajudar a trafegar por São Paulo' },
  ]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Navbar Section */}
      <View style={styles.navbar}>
        <Image
          style={styles.navbarLogo}
          source={{ uri: "https://www.prefeitura.sp.gov.br/cidade/secretarias/upload/direitos_humanos/PARCERIAS/LOGOS_MANUAL/LOGOS_COLABORACOES_EMENDAS/LOGO%20PREFEITURA/LOGOTIPO_PREFEITURA_HORIZONTAL_FUNDO_CLARO.png" }}
          resizeMode="contain"
        />
        <Text style={styles.navbarText}>MobGov</Text>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.title}>Bem-vindo ao time!</Text>
        <Text style={styles.description}>
           MobGov é um aplicativo destinado a ajudar na acessibilidade urbana,
          permitindo que os usuários marquem e compartilhem locais acessíveis e não acessíveis na cidade.
        </Text>

        <Image
          style={styles.welcomeImage}
          source={{ uri: "https://media.licdn.com/dms/image/D4D12AQFPUtPfdj_eqA/article-cover_image-shrink_600_2000/0/1663773397939?e=2147483647&v=beta&t=PMx_snQX0Ec7GIBC4S9ArS3oEpbzoGdaWrhducTgz-g" }}
          resizeMode="contain"
        />
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.title}>Funcionalidades Principais</Text>
        <Text style={styles.feature}>• Marcar locais acessíveis e não acessíveis</Text>
        <Text style={styles.feature}>• Compartilhar informações com outros usuários</Text>
        <Text style={styles.feature}>• Buscar por locais específicos</Text>
        <Text style={styles.feature}>• Ver rotas e pontos de interesse próximos</Text>
      </View>

      {/* Map Preview Section */}
      <View style={styles.mapPreviewSection}>
        <Text style={styles.title}>Pré-visualização do Mapa</Text>
        <MapView
          style={styles.map}
          region={region}
          zoomEnabled={true}
          minZoomLevel={17}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          {markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={marker.coords}
              title={marker.title}
              pinColor={marker.status === 'good' ? 'green' : 'red'}
            />
          ))}
        </MapView>
      </View>

      {/* Product List Section */}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => {
              setSelectedProduct(item);
              setModalVisible(true);
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={() => {
                setSelectedProduct(item);
                setModalVisible(true);
              }}
            >
              <Text style={styles.viewMoreButtonText}>Ver mais</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Modal */}
      {selectedProduct && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <Image
              source={{ uri: selectedProduct.image }}
              style={styles.modalProductImage}
            />
            <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
            <Text style={styles.modalProductDescription}>{selectedProduct.description}</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {/* Feedback Section */}
      <View style={styles.feedbackSection}>
        <Text style={styles.title}>Feedback dos Usuários</Text>
        <FlatList
          data={feedbacks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.feedbackContainer}>
              <Text style={styles.user}>{item.user}</Text>
              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F47926',
    paddingBottom: 20,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A3979',
    padding: 10,
    marginBottom: 10,
  },
  navbarLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  navbarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeSection: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0A3979',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#ffff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  welcomeImage: {
    width: width - 40,
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
  featuresSection: {
    padding: 20,
    backgroundColor: '#0A3979',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  feature: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },
  mapPreviewSection: {
    padding: 20,
    backgroundColor: '#0A3979',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  map: {
    width: width - 40,
    height: 200,
    borderRadius: 10,
  },
  feedbackSection: {
    padding: 20,
    backgroundColor: '#0A3979',
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  feedbackContainer: {
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
    padding: 10,
    borderRadius: 10,
  },
  user: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  comment: {
    fontSize: 14,
    color: '#666',
  },

  productItem: {
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productName: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#fff',
  },
  viewMoreButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  viewMoreButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A3979',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalProductImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  modalProductName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  modalProductDescription: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  modalCloseButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});














export default Home;