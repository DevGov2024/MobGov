import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Modal, Image, FlatList } from 'react-native';

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

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Objetivos</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
        <Button title="Pesquisar" onPress={() => {}} />
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.productItem}
            onPress={() => handleProductPress(item)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={() => handleProductPress(item)}
            >
              <Text style={styles.viewMoreButtonText}>Ver mais</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
            <TouchableOpacity style={styles.modalCloseButton} onPress={handleCloseModal}>
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F47926',
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
  productItem: {
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
    backgroundColor: '#fff',
  },
  modalProductImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  modalProductName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalProductDescription: {
    fontSize: 16,
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

export default SearchPage;


