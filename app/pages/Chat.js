// ChatPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const ChatPage = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const handleSend = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, { id: messages.length.toString(), text: currentMessage }]);
      setCurrentMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.messageItem}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={currentMessage}
            onChangeText={setCurrentMessage}
            style={styles.input}
            placeholder="Digite sua mensagem"
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  messageItem: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatPage;



