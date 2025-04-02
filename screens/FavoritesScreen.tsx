import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { usePlayer } from '../contexts/PlayerContext';
import { tracks } from '../utils/trackData';
import { formatTime } from '../utils/formatTime';
import BottomIcons from '../components/BottomIcons';
import MiniPlayer from '../components/MiniPlayer';

const FavoritesScreen: React.FC = () => {
  const { likedTracks, handleSelectTrack, currentTrack } = usePlayer();

  // Filtrar apenas as músicas curtidas
  const favoriteTracks = tracks.filter(track => likedTracks.includes(track.id));

  const renderItem = ({ item }) => {
    const isCurrentTrack = item.id === currentTrack.id;

    return (
      <TouchableOpacity
        style={[styles.trackItem, isCurrentTrack ? styles.activeTrack : {}]}
        onPress={() => handleSelectTrack(item.id)}
      >
        <Image source={item.artwork} style={styles.trackImage} />
        <View style={styles.trackInfo}>
          <Text style={[styles.trackTitle, isCurrentTrack ? styles.activeText : {}]}>
            {item.title}
          </Text>
          <Text style={styles.trackArtist}>{item.artist}</Text>
          <Text style={styles.trackDuration}>{formatTime(item.duration)}</Text>
        </View>
        <FontAwesome name="heart" size={20} color="#1ad1c3" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Músicas Favoritas</Text>
        <FontAwesome name="heart" size={24} color="#1ad1c3" />
      </View>

      {favoriteTracks.length > 0 ? (
        <FlatList
          data={favoriteTracks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="favorite-border" size={80} color="#333" />
          <Text style={styles.emptyText}>Nenhuma música favoritada</Text>
          <Text style={styles.emptySubtext}>
            Toque no ícone de coração para adicionar músicas aos favoritos
          </Text>
        </View>
      )}
      
      <MiniPlayer />
      <BottomIcons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
  listContent: {
    paddingBottom: 20,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 10,
  },
  activeTrack: {
    backgroundColor: 'rgba(26,209,195,0.15)',
    borderLeftWidth: 3,
    borderLeftColor: '#1ad1c3',
  },
  trackImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 15,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  activeText: {
    color: '#1ad1c3',
  },
  trackArtist: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 2,
  },
  trackDuration: {
    color: '#777',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    color: '#777',
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 300,
  },
});

export default FavoritesScreen;