import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './app/routes';  // Certifique-se de que o caminho está correto

export default function App() {
  return (
    <NavigationContainer>


      <Routes />
    </NavigationContainer>
  );
}
