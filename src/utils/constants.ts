import type { GameConfig } from '../game/types'

/**
 * 游戏配置常量
 */
export const GAME_CONFIG: GameConfig = {
  width: 800,
  height: 600,
  targetFPS: 60,
}

/**
 * 本地存储键名
 */
export const STORAGE_KEYS = {
  GAME_DATA: 'become-pm-game-data',
} as const
