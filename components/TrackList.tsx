import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface Track {
  id: number;
  title: string;
  artist: string;
}

interface TrackListProps {
  tracks: Track[];
  currentTrackId: number;
  onSelectTrack: (trackId: number) => void;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, currentTrackId, onSelectTrack }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.trackItem, item.id === currentTrackId ? styles.activeTrack : {}]}
            onPress={() => onSelectTrack(item.id)}
          >
            <Text style={styles.trackTitle}>{item.title}</Text>
            <Text style={styles.trackArtist}>{item.artist}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },
  trackItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  activeTrack: {
    backgroundColor: '#1ad1c3',
  },
  trackTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackArtist: {
    color: '#bbb',
    fontSize: 14,
  },
});

export default TrackList;
