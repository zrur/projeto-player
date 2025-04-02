import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Track, tracks } from '../utils/trackData';

interface PlayerContextData {
  currentTrackIndex: number;
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  sound: Audio.Sound | null;
  isLiked: boolean;
  isShuffled: boolean;
  isRepeated: boolean;
  likedTracks: number[];
  playQueue: number[];
  handlePlayPause: () => Promise<void>;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSeek: (newTime: number) => Promise<void>;
  handleSelectTrack: (trackId: number) => void;
  toggleLike: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [likedTracks, setLikedTracks] = useState<number[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [playQueue, setPlayQueue] = useState<number[]>([]);

  const currentTrack = tracks[currentTrackIndex];
  const isLiked = likedTracks.includes(currentTrack.id);

  // Carregar músicas curtidas do AsyncStorage
  useEffect(() => {
    const loadLikedTracks = async () => {
      try {
        const storedLikedTracks = await AsyncStorage.getItem('@liked_tracks');
        if (storedLikedTracks) {
          setLikedTracks(JSON.parse(storedLikedTracks));
        }
      } catch (error) {
        console.error('Error loading liked tracks', error);
      }
    };

    loadLikedTracks();
  }, []);

  // Inicializar a fila de reprodução
  useEffect(() => {
    initializePlayQueue();
  }, [isShuffled]);
  
  // Carregamento e atualização do áudio
  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentTrackIndex]);

  // Atualização do tempo atual
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(async () => {
        if (sound) {
          try {
            const status = await sound.getStatusAsync();
            if (status.isLoaded && status.positionMillis !== undefined) {
              setCurrentTime(status.positionMillis / 1000);

              // Verificar se a música acabou
              if (status.didJustFinish) {
                if (isRepeated) {
                  // Repetir a música atual
                  await sound.setPositionAsync(0);
                  await sound.playAsync();
                } else {
                  // Avançar para a próxima música
                  handleNext();
                }
              }
            }
          } catch (error) {
            console.error('Error getting audio status', error);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, sound, isRepeated]);

  const initializePlayQueue = () => {
    // Criar fila de reprodução baseada no modo shuffle
    const newQueue = Array.from({ length: tracks.length }, (_, i) => i);
    
    if (isShuffled) {
      // Misturar a fila de reprodução, mantendo a faixa atual na posição 0
      for (let i = newQueue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        if (j !== currentTrackIndex && i !== currentTrackIndex) {
          [newQueue[i], newQueue[j]] = [newQueue[j], newQueue[i]];
        }
      }
      
      // Garantir que a faixa atual esteja na primeira posição
      const currentIndex = newQueue.indexOf(currentTrackIndex);
      if (currentIndex !== 0) {
        [newQueue[0], newQueue[currentIndex]] = [newQueue[currentIndex], newQueue[0]];
      }
    }
    
    setPlayQueue(newQueue);
  };

  const loadAudio = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      
      // Configurar áudio
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        currentTrack.audio,
        { shouldPlay: isPlaying },
        onPlaybackStatusUpdate
      );
      
      setSound(newSound);
      
      if (isPlaying) {
        await newSound.playAsync();
      }
    } catch (error) {
      console.error('Error loading audio', error);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.didJustFinish) {
      if (isRepeated) {
        // Repetir a música atual
        sound?.setPositionAsync(0);
        sound?.playAsync();
      } else {
        // Avançar para a próxima música
        handleNext();
      }
    }
  };

  const handlePlayPause = async () => {
    if (sound) {
      try {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error('Error toggling playback', error);
      }
    }
  };

  const handleNext = () => {
    if (isShuffled) {
      // Em modo shuffle, pegar a próxima música da fila
      const currentQueueIndex = playQueue.indexOf(currentTrackIndex);
      const nextQueueIndex = (currentQueueIndex + 1) % playQueue.length;
      setCurrentTrackIndex(playQueue[nextQueueIndex]);
    } else {
      // Em modo normal, avançar sequencialmente
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    // Se estiver nos primeiros 3 segundos, voltar para a música anterior
    if (currentTime <= 3) {
      if (isShuffled) {
        // Em modo shuffle, pegar a música anterior da fila
        const currentQueueIndex = playQueue.indexOf(currentTrackIndex);
        const prevQueueIndex = (currentQueueIndex - 1 + playQueue.length) % playQueue.length;
        setCurrentTrackIndex(playQueue[prevQueueIndex]);
      } else {
        // Em modo normal, voltar sequencialmente
        setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
      }
    } else {
      // Caso contrário, reiniciar a música atual
      if (sound) {
        sound.setPositionAsync(0);
      }
    }
    setCurrentTime(0);
  };

  const handleSeek = async (newTime: number) => {
    if (sound) {
      try {
        await sound.setPositionAsync(newTime * 1000);
        setCurrentTime(newTime);
      } catch (error) {
        console.error('Error seeking audio', error);
      }
    }
  };

  const handleSelectTrack = (trackId: number) => {
    const index = tracks.findIndex((track) => track.id === trackId);
    if (index !== -1) {
      setCurrentTrackIndex(index);
      setCurrentTime(0);
      // Atualizar a fila se estiver em modo shuffle
      if (isShuffled) {
        initializePlayQueue();
      }
    }
  };

  const toggleLike = async () => {
    try {
      let updatedLikedTracks;
      
      if (isLiked) {
        // Remover da lista de curtidas
        updatedLikedTracks = likedTracks.filter(id => id !== currentTrack.id);
      } else {
        // Adicionar à lista de curtidas
        updatedLikedTracks = [...likedTracks, currentTrack.id];
      }
      
      setLikedTracks(updatedLikedTracks);
      
      // Persistir no AsyncStorage
      await AsyncStorage.setItem('@liked_tracks', JSON.stringify(updatedLikedTracks));
    } catch (error) {
      console.error('Error saving liked tracks', error);
    }
  };

  const toggleShuffle = () => {
    setIsShuffled(prev => !prev);
    // A fila será reinicializada pelo useEffect que observa isShuffled
  };

  const toggleRepeat = () => {
    setIsRepeated(prev => !prev);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrackIndex,
        currentTrack,
        isPlaying,
        currentTime,
        sound,
        isLiked,
        isShuffled,
        isRepeated,
        likedTracks,
        playQueue,
        handlePlayPause,
        handleNext,
        handlePrevious,
        handleSeek,
        handleSelectTrack,
        toggleLike,
        toggleShuffle,
        toggleRepeat,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};