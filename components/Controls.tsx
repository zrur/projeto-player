import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isShuffled: boolean;
  onShuffle: () => void;
  isRepeated: boolean;
  onRepeat: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  isShuffled,
  onShuffle,
  isRepeated,
  onRepeat,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onShuffle} style={styles.button}>
      <MaterialCommunityIcons name="shuffle-variant" size={24} color={isShuffled ? '#1ad1c3' : '#fff'} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onPrevious} style={styles.button}>
      <MaterialIcons name="skip-previous" size={36} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
      <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} size={36} color="#000" />
    </TouchableOpacity>
    <TouchableOpacity onPress={onNext} style={styles.button}>
      <MaterialIcons name="skip-next" size={36} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity onPress={onRepeat} style={styles.button}>
      <Ionicons name="repeat" size={24} color={isRepeated ? '#1ad1c3' : '#fff'} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  button: {
    padding: 15,
  },
  playButton: {
    backgroundColor: '#1ad1c3',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
  },
});

export default Controls;