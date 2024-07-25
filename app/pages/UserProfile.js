import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const UserProfile = ({ route, navigation }) => {
  const { username } = route.params;
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [regionName, setRegionName] = useState('');
  const [regionStatus, setRegionStatus] = useState('');
  const [regionDescription, setRegionDescription] = useState('');
  const [regions, setRegions] = useState([]);

  const addPost = () => {
    if (newPost) {
      const newPostObject = { id: posts.length.toString(), content: newPost };
      setPosts([newPostObject, ...posts]);
      setNewPost('');
    }
  };

  const addRegion = () => {
    if (regionName && regionStatus && regionDescription) {
      const newRegion = {
        id: regions.length.toString(),
        name: regionName,
        status: regionStatus,
        description: regionDescription,
      };
      setRegions([newRegion, ...regions]);
      setRegionName('');
      setRegionStatus('');
      setRegionDescription('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo, {username}!</Text>

      <Image
        style={styles.image}
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLUquQ7RPdm1FmDoM0ZfjsnfUU7GTMb4VyqQ&s" }}
        resizeMode="contain"
      />

      <Text style={styles.header}>Suas Publicações</Text>
      <TextInput
        style={styles.input}
        placeholder="Escreva algo..."
        value={newPost}
        onChangeText={setNewPost}
      />
      <Button title="Adicionar Publicação" onPress={addPost} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Chat', { posts })}
      >
        <Text style={styles.buttonText}>Ver Comunidade</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postText}>{item.content}</Text>
          </View>
        )}
      />

      <Text style={styles.header}>Crie uma Tabela de Status das Regiões</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Região"
        value={regionName}
        onChangeText={setRegionName}
      />
      <Picker
        selectedValue={regionStatus}
        style={styles.input}
        onValueChange={(itemValue) => setRegionStatus(itemValue)}
      >
        <Picker.Item label="Selecione o Status" value="" />
        <Picker.Item label="Verde" value="green" />
        <Picker.Item label="Amarelo" value="yellow" />
        <Picker.Item label="Vermelho" value="red" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={regionDescription}
        onChangeText={setRegionDescription}
      />
      <Button title="Adicionar Região" onPress={addRegion} />
      <FlatList
        data={regions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.regionItem}>
            <Text style={styles.regionName}>{item.name}</Text>
            <Text style={styles.regionDescription}>{item.description}</Text>
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
        onPress={() => navigation.navigate('Favoritos', { regions })}
      >
        <Text style={styles.buttonText}>Ver Favoritos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0A3979',
  },
  header: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  postContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  postText: {
    fontSize: 16,
  },
  regionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  regionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  regionDescription: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default UserProfile;
