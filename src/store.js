import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './Features/Player/Playerslice'
import enemyReducer from './Features/Enemy/Enemyslice'

export default configureStore({
  reducer: {
    player: playerReducer,
    enemy: enemyReducer,
  },
})