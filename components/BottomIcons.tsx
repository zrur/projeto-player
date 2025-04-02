import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BottomIcons: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.iconButton}
        onPress={() => navigation.navigate('Home')}
      >
        <MaterialIcons name="home" size={24} color="#888" />
        <Text style={styles.iconText}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.iconButton}
        onPress={() => navigation.navigate('Favorites')}
      >
        <FontAwesome name="heart" size={24} color="#888" />
        <Text style={styles.iconText}>Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <MaterialIcons name="queue-music" size={24} color="#888" />
        <Text style={styles.iconText}>Playlist</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(20,20,20,0.9)',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  iconButton: {
    alignItems: 'center',
    padding: 10,
  },
  iconText: {
    color: '#777',
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomIcons;