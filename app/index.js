// index.js
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
//import Search from './pages/Search';
import Favoritos from './pages/Favoritos';
import Perfil from './pages/Perfil';
import MapPage from './pages/MapPage';
import Chat from './pages/Chat';
import UserProfile from './pages/UserProfile';


import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  const [posts, setPosts] = useState([]);

  const addPost = (content) => {
    const newPost = { id: posts.length.toString(), content };
    setPosts([newPost, ...posts]);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#121212',
          borderTopWidth: 0,
          bottom: 14,
          left: 14,
          right: 14,
          elevation: 0,
          borderRadius: 8,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="home" size={size} color={color} />;
            }
            return <Ionicons name="home-outline" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Perfil"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="person" size={size} color={color} />;
            }
            return <Ionicons name="person-outline" size={size} color={color} />;
          },
        }}
      >
        {props => <Perfil {...props} posts={posts} onNewPost={addPost} />}
      </Tab.Screen>
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="bookmark" size={size} color={color} />;
            }
            return <Ionicons name="bookmark-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="map" size={size} color={color} />;
            }
            return <Ionicons name="map-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="chatbubble" size={size} color={color} />;
            }
            return <Ionicons name="chatbubble-outline" size={size} color={color} />;
          },
        }}
      >
        {props => <Chat {...props} posts={posts} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}


