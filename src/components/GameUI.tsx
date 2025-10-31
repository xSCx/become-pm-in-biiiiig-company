import { GameState } from '../game/GameState'
import type { GameStatus } from '../game/types'

interface GameUIProps {
  gameState: GameState | null
  gameStatus: GameStatus
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onEnd: () => void
}

/**
 * 游戏UI组件
 * 负责显示游戏信息和控制按钮
 */
export default function GameUI({
  gameState,
  gameStatus,
  onStart,
  onPause,
  onResume,
  onEnd,
}: GameUIProps) {
  if (gameStatus === 'menu') {
    return (
      <div className="game-menu">
        <h2>欢迎来到游戏原型测试</h2>
        <p>点击开始按钮开始游戏</p>
        <button onClick={onStart} className="start-button">
          开始游戏
        </button>
        {gameState && (
          <div className="high-score">
            <p>最高分: {gameState.getHighScore().toFixed(0)}</p>
          </div>
        )}
      </div>
    )
  }

  if (!gameState) return null

  const gameData = gameState.getGameData()

  return (
    <div className="game-ui">
      <div className="game-stats">
        <div className="stat-item">
          <span className="stat-label">分数:</span>
          <span className="stat-value">{gameData.score.toFixed(0)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">等级:</span>
          <span className="stat-value">{gameData.level}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">最高分:</span>
          <span className="stat-value">{gameData.highScore.toFixed(0)}</span>
        </div>
      </div>

      <div className="game-controls">
        {gameStatus === 'playing' && (
          <button onClick={onPause} className="control-button">
            暂停
          </button>
        )}
        {gameStatus === 'paused' && (
          <>
            <button onClick={onResume} className="control-button">
              继续
            </button>
            <button
              onClick={() => {
                gameState.reset()
                onStart()
              }}
              className="control-button"
            >
              重新开始
            </button>
          </>
        )}
        {gameStatus === 'ended' && (
          <button
            onClick={() => {
              gameState.reset()
              onStart()
            }}
            className="control-button"
          >
            重新开始
          </button>
        )}
      </div>
    </div>
  )
}
