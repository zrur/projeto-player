import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { formatTime } from '../utils/formatTime';
import { Track } from '../utils/trackData';

interface TrackListProps {
  tracks: Track[];
  currentTrackId: number;
  onSelectTrack: (trackId: number) => void;
  isPlaying: boolean;
  likedTracks: number[];
}

const TrackList: React.FC<TrackListProps> = ({ 
  tracks, 
  currentTrackId, 
  onSelectTrack,
  isPlaying,
  likedTracks
}) => {
  const renderItem = ({ item }: { item: Track }) => {
    const isCurrentTrack = item.id === currentTrackId;
    const isLiked = likedTracks.includes(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.trackItem,
          isCurrentTrack ? styles.activeTrack : {}
        ]}
        onPress={() => onSelectTrack(item.id)}
      >
        <View style={styles.trackContainer}>
          <View style={styles.trackImageContainer}>
            <Image source={item.artwork} style={styles.trackImage} />
            {isCurrentTrack && isPlaying && (
              <View style={styles.playingIndicator}>
                <MaterialIcons name="equalizer" size={16} color="#1ad1c3" />
              </View>
            )}
          </View>
          <View style={styles.trackInfo}>
            <Text style={[
              styles.trackTitle,
              isCurrentTrack ? styles.activeText : {}
            ]}>
              {item.title}
            </Text>
            <Text style={[
              styles.trackArtist,
              isCurrentTrack ? styles.activeArtistText : {}
            ]}>
              {item.artist}
            </Text>
          </View>
          <View style={styles.trackRight}>
            {isLiked && (
              <FontAwesome name="heart" size={16} color="#1ad1c3" style={styles.heartIcon} />
            )}
            <Text style={styles.trackDuration}>
              {formatTime(item.duration)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>Playlist</Text>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
    flex: 1,
    maxHeight: 250,
  },
  listTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5,
  },
  list: {
    width: '100%',
  },
  trackItem: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  activeTrack: {
    backgroundColor: 'rgba(26,209,195,0.15)',
    borderLeftWidth: 3,
    borderLeftColor: '#1ad1c3',
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  trackImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  playingIndicator: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 2,
    borderRadius: 10,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  trackArtist: {
    color: '#bbb',
    fontSize: 13,
  },
  activeText: {
    color: '#1ad1c3',
  },
  activeArtistText: {
    color: '#8eeae3',
  },
  trackRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    marginRight: 8,
  },
  trackDuration: {
    color: '#999',
    fontSize: 12,
  },
});

export default TrackList;