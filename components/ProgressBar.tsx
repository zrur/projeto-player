import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PanGestureHandler, GestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, cancelAnimation } from 'react-native-reanimated';
import { formatTime } from '../utils/formatTime';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onSeek: (newTime: number) => void;
}

const BAR_WIDTH = 300; // Largura fixa da barra de progresso

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, isPlaying, onSeek }) => {
  const progressAnim = useSharedValue((currentTime / duration) * BAR_WIDTH);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  React.useEffect(() => {
    if (isPlaying && !isUserInteracting) {
      progressAnim.value = withTiming((currentTime / duration) * BAR_WIDTH, { duration: 500 });
    }
  }, [currentTime, isPlaying, isUserInteracting]);

  const progressStyle = useAnimatedStyle(() => ({
    width: progressAnim.value,
  }));

  const handlePanStart = () => {
    setIsUserInteracting(true);
    cancelAnimation(progressAnim); // Cancela a animação automática enquanto o usuário arrasta
  };

  const handlePanEnd = () => {
    setIsUserInteracting(false);
  };

  const handlePanGesture = (event: GestureHandlerGestureEvent) => {
    const { x } = event.nativeEvent;
    const newProgress = Math.max(0, Math.min(x, BAR_WIDTH));
    const newTime = (newProgress / BAR_WIDTH) * duration;
    onSeek(newTime);
    progressAnim.value = newProgress; // Atualiza a animação manualmente
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
      <PanGestureHandler onGestureEvent={handlePanGesture} onBegan={handlePanStart} onEnded={handlePanEnd}>
        <Animated.View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBar, progressStyle]} />
          <Animated.View style={[styles.progressKnob, { left: progressAnim.value - 6 }]} />
        </Animated.View>
      </PanGestureHandler>
      <Text style={styles.timeText}>{formatTime(duration)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: BAR_WIDTH + 70,
    marginBottom: 20,
  },
  timeText: {
    color: '#aaa',
    fontSize: 12,
    width: 35,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: BAR_WIDTH,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginHorizontal: 8,
    overflow: 'visible',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1ad1c3',
    borderRadius: 3,
  },
  progressKnob: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1ad1c3',
    top: -3,
    shadowColor: '#1ad1c3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default ProgressBar;