import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface TrackInfoProps {
  title: string;
  artist: string;
  isLiked: boolean;
  onToggleLike: () => void;
}

const TrackInfo: React.FC<TrackInfoProps> = ({ title, artist, isLiked, onToggleLike }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.artistContainer}>
      <Text style={styles.artist}>{artist}</Text>
      <TouchableOpacity onPress={onToggleLike}>
        <FontAwesome name={isLiked ? 'heart' : 'heart-o'} size={24} color={isLiked ? '#1ad1c3' : '#fff'} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  artist: {
    color: '#aaa',
    fontSize: 16,
  },
});

export default TrackInfo;