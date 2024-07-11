import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Image } from 'expo-image';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      // Navega para a página OtherPage
      navigation.navigate('OtherPage', { username });
    } else {
      Alert.alert('Login', 'Por favor, insira seu nome de usuário e senha.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coruja-de-São-Paulo</Text>
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

const OtherPage = ({ route }) => {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo, {username}!</Text>
      <Text style={styles.text}>Esta é uma página privada.</Text>
    </View>
  );
};

const Perfil = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OtherPage" component={OtherPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
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

export default Perfil;


