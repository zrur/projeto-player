import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  Easing,
  cancelAnimation,
  withSpring
} from 'react-native-reanimated';

interface AlbumArtProps {
  artwork: any;
  isPlaying: boolean;
}

const AlbumArt: React.FC<AlbumArtProps> = ({ artwork, isPlaying }) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isPlaying) {
      // Animação de rotação suave quando está tocando
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 10000,
          easing: Easing.linear,
        }),
        -1, // Repetição infinita
        false
      );
      // Pequeno aumento de escala
      scale.value = withSpring(1.05);
    } else {
      // Pausar a animação, mantendo a posição atual
      cancelAnimation(rotation);
      // Retornar para a escala normal
      scale.value = withSpring(1);
    }
    
    // Limpar animações quando o componente for desmontado
    return () => {
      cancelAnimation(rotation);
      cancelAnimation(scale);
    };
  }, [isPlaying]);

  const albumArtStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value }
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.innerContainer, albumArtStyle]}>
        <Image source={artwork} style={styles.albumArt} />
      </Animated.View>
      <View style={styles.vinylCircle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    width: 270,
    height: 270,
  },
  innerContainer: {
    shadowColor: '#1ad1c3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    borderRadius: 135,
    overflow: 'hidden',
  },
  albumArt: {
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  vinylCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000',
    borderWidth: 10,
    borderColor: '#1ad1c3',
    opacity: 0.6,
    zIndex: 10,
  },
});

export default AlbumArt;