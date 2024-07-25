import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatPage = ({ route, navigation }) => {
  const { posts } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    if (posts) {
      setMessages(posts.map(post => ({ id: post.id, text: post.content, timestamp: new Date(), user: 'other' })));
    }
  }, [posts]);

  const handleSend = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, { id: messages.length.toString(), text: currentMessage, timestamp: new Date(), user: 'me' }]);
      setCurrentMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageItem, item.user === 'me' ? styles.myMessage : styles.otherMessage]}>
      <View style={styles.messageHeader}>
        <Ionicons name="person-circle" size={24} color="#007bff" style={styles.avatar} />
        <Text style={styles.username}>{item.user === 'me' ? 'Você' : 'Outro usuário'}</Text>
        <Text style={styles.timestamp}>{item.timestamp.toLocaleTimeString()}</Text>
      </View>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesContainer}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={currentMessage}
            onChangeText={setCurrentMessage}
            style={styles.input}
            placeholder="Digite sua mensagem"
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A3979',
  },
  messagesContainer: {
    padding: 10,
  },
  messageItem: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    marginRight: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatPage;





