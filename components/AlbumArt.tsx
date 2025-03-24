import React, { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface AlbumArtProps {
  artwork: any;
  isPlaying: boolean;
}

const AlbumArt: React.FC<AlbumArtProps> = ({ artwork, isPlaying }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isPlaying) {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 10000,
          easing: Easing.linear,
        }),
        -1, // Repetição infinita
        false
      );
    } else {
      rotation.value = rotation.value; // Mantém a posição ao pausar
    }
  }, [isPlaying]);

  const albumArtStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.Image source={artwork} style={[styles.albumArt, albumArtStyle]} />
  );
};

const styles = StyleSheet.create({
  albumArt: {
    width: 250,
    height: 250,
    borderRadius: 125, // Agora a imagem será circular
    marginBottom: 40,
  },
});

export default AlbumArt;
