import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import TrackInfo from '../components/TrackInfo';
import ProgressBar from '../components/ProgressBar';
import Controls from '../components/Controls';
import AlbumArt from '../components/AlbumArt';
import BottomIcons from '../components/BottomIcons';
import TrackList from '../components/TrackList';
import { usePlayer } from '../contexts/PlayerContext';
import { tracks } from '../utils/trackData';


const HomeScreen: React.FC = () => {
  const {
    currentTrack,
    currentTime,
    isPlaying,
    isLiked,
    isShuffled,
    isRepeated,
    likedTracks,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleSeek,
    handleSelectTrack,
    toggleLike,
    toggleShuffle,
    toggleRepeat,
  } = usePlayer();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <AlbumArt artwork={currentTrack.artwork} isPlaying={isPlaying} />
      
      <TrackInfo
        title={currentTrack.title}
        artist={currentTrack.artist}
        isLiked={isLiked}
        onToggleLike={toggleLike}
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
        onPrevious={handlePrevious}
        isShuffled={isShuffled}
        onShuffle={toggleShuffle}
        isRepeated={isRepeated}
        onRepeat={toggleRepeat}
      />
      
      <TrackList
        tracks={tracks}
        currentTrackId={currentTrack.id}
        onSelectTrack={handleSelectTrack}
        isPlaying={isPlaying}
        likedTracks={likedTracks}
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