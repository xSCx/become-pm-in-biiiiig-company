/**
 * 游戏状态类型
 */
export type GameStatus = 'menu' | 'playing' | 'paused' | 'ended'

/**
 * 游戏配置接口
 */
export interface GameConfig {
  width: number
  height: number
  targetFPS: number
}

/**
 * 游戏循环回调接口
 */
export interface GameLoopCallbacks {
  update: (deltaTime: number) => void
  render: (ctx: CanvasRenderingContext2D) => void
}

/**
 * 游戏数据接口
 */
export interface GameData {
  score: number
  level: number
  highScore: number
}
