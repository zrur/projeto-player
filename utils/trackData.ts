export interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  artwork: any;
  audio: any;
}

export const tracks: Track[] = [
  {
    id: 1,
    title: 'QUEM NÃO PODE ERRAR SOU EU',
    artist: 'Febem, Cersv',
    duration: 203,
    artwork: require('../assets/images/capaFebem.jpg'),
    audio: require('../assets/audio/QUEM NÃO PODE ERRAR SOU EU.mp3'),
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