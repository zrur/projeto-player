import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import TrackInfo from '../components/TrackInfo';
import ProgressBar from '../components/ProgressBar';
import Controls from '../components/Controls';
import AlbumArt from '../components/AlbumArt';
import BottomIcons from '../components/BottomIcons';
import TrackList from '../components/TrackList';

const tracks = [
    {
      id: 1,
      title: 'QUEM NÃO PODE ERRAR SOU EU',
      artist: 'Febem, Cersv',
      duration: 203,
      artwork: require('../assets/images/capaFebem.jpg'),
      audio: require('../assets/audio/QUEM NÃO PODE ERRAR SOU EU.mp3'), // Caminho do arquivo de áudio
    },
    {
      id: 2,
      title: 'Ai Calica',
      artist: 'pumapjl, LEALL, Babidi',
      duration: 187,
      artwork: require('../assets/images/capaPumapjl.jpg'),
      audio: require('../assets/audio/AI CALICA feat. LEALL.mp3'),
    },
    {
      id: 3,
      title: 'Fim de Semana no Parque',
      artist: 'Racionais MCs',
      duration: 429,
      artwork: require('../assets/images/capaRacionais.jpg'),
      audio: require('../assets/audio/Fim de semana no parque - Racionais Mcs.mp3'),
    },
  ];

const HomeScreen: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(async () => {
        if (sound) {
          const status = await sound.getStatusAsync();
          if (status.isLoaded && status.positionMillis) {
            setCurrentTime(status.positionMillis / 1000);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, sound]);

  const loadAudio = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(currentTrack.audio);
    setSound(newSound);
    if (isPlaying) {
      await newSound.playAsync();
    }
  };

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setCurrentTime(0);
  };

  const handleSeek = async (newTime: number) => {
    if (sound) {
      await sound.setPositionAsync(newTime * 1000);
      setCurrentTime(newTime);
    }
  };

  const handleSelectTrack = (trackId: number) => {
    const index = tracks.findIndex((track) => track.id === trackId);
    if (index !== -1) {
      setCurrentTrackIndex(index);
      setCurrentTime(0);
    }
  };

  return (
    <View style={styles.container}>
      <AlbumArt artwork={currentTrack.artwork} isPlaying={isPlaying} />
      <TrackInfo
        title={currentTrack.title}
        artist={currentTrack.artist}
        isLiked={isLiked}
        onToggleLike={() => setIsLiked(!isLiked)}
      />
      <ProgressBar
        currentTime={currentTime}
        duration={currentTrack.duration}
        isPlaying={isPlaying}
        onSeek={handleSeek}
      />
      <Controls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
      />
      <TrackList
        tracks={tracks}
        currentTrackId={currentTrack.id}
        onSelectTrack={handleSelectTrack}
      />
      <BottomIcons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default HomeScreen;
