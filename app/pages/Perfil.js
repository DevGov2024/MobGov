import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Image } from 'expo-image';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      // Navega para a página UserProfile
      navigation.navigate('UserProfile', { username });
    } else {
      Alert.alert('Login', 'Por favor, insira seu nome de usuário e senha.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>MobGov</Text>
      <Image
        style={styles.image}
        source={{ uri: "https://iconape.com/wp-content/files/fe/258081/svg/258081.svg" }}
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

const Perfil = ({ navigation }) => {
  return <LoginScreen navigation={navigation} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '#0A3979',
  },
  text: {
    fontSize: 30,
    color: 'white',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#0553',
  },
  loginContainer: {
    width: '80%',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    color: 'white',
  },
});

export default Perfil


