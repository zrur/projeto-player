import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const BottomIcons: React.FC = () => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.icon}>
      <MaterialCommunityIcons name="devices" size={22} color="#888" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.icon}>
      <MaterialIcons name="queue-music" size={22} color="#888" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  icon: {
    padding: 10,
  },
});

export default BottomIcons;