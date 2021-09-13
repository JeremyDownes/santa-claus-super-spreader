import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../features/player/playerslice'
import enemyReducer from '../features/enemy/enemyslice'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    enemy: enemyReducer,
  },
});
