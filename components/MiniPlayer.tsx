import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { usePlayer } from '../contexts/PlayerContext';

const MiniPlayer: React.FC = () => {
  const navigation = useNavigation();
  const { currentTrack, isPlaying, handlePlayPause } = usePlayer();

  if (!currentTrack) return null;

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('Home')}
    >
      <Image source={currentTrack.artwork} style={styles.artwork} />
      
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {currentTrack.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {currentTrack.artist}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.playButton}
        onPress={(e) => {
          e.stopPropagation();
          handlePlayPause();
        }}
      >
        <MaterialIcons 
          name={isPlaying ? 'pause' : 'play-arrow'} 
          size={28} 
          color="#1ad1c3" 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60, // Posiciona acima do BottomIcons
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  artwork: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  artist: {
    color: '#aaa',
    fontSize: 12,
  },
  playButton: {
    padding: 8,
  },
});

export default MiniPlayer;