import { useEffect, useRef } from 'react'
import { GameEngine } from '../game/GameEngine'
import type { GameState } from '../game/GameState'
import type { GameStatus } from '../game/types'
import { GAME_CONFIG } from '../utils/constants'

interface GameCanvasProps {
  gameState: GameState
  gameStatus: GameStatus
  onGameEnd?: () => void
}

/**
 * 游戏画布组件
 * 负责管理Canvas元素和游戏引擎的生命周期
 */
export default function GameCanvas({
  gameState,
  gameStatus,
  onGameEnd,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<GameEngine | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // 初始化游戏引擎
    const engine = new GameEngine(canvas, GAME_CONFIG, {
      update: (deltaTime) => {
        // 游戏逻辑更新
        // 这里可以添加具体的游戏逻辑
        // 例如：移动对象、检测碰撞等
        if (gameStatus !== 'playing') return

        // 示例：每帧增加少量分数（实际游戏中应该根据游戏逻辑）
        // gameState.addScore(0.01)
      },
      render: (ctx) => {
        // 游戏渲染逻辑
        if (gameStatus !== 'playing') {
          // 暂停或结束状态下的渲染
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          return
        }

        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // 绘制背景
        ctx.fillStyle = '#f5f5f5'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // 绘制游戏内容
        // 这里可以添加具体的游戏绘制逻辑
        // 例如：绘制角色、敌人、背景等

        // 示例：绘制一个简单的移动方块
        const time = Date.now() / 1000
        const x = (canvas.width / 2) + Math.sin(time) * 100
        const y = canvas.height / 2

        ctx.fillStyle = '#667eea'
        ctx.fillRect(x - 25, y - 25, 50, 50)

        // 绘制FPS（调试用）
        ctx.fillStyle = '#333'
        ctx.font = '14px monospace'
        ctx.fillText(`FPS: ${engine.getFPS()}`, 10, 20)
      },
    })

    engineRef.current = engine

    // 清理函数
    return () => {
      engine.stop()
    }
  }, [gameStatus, gameState])

  // 根据游戏状态控制引擎启停
  useEffect(() => {
    const engine = engineRef.current
    if (!engine) return

    if (gameStatus === 'playing') {
      engine.start()
    } else {
      engine.stop()
    }
  }, [gameStatus])

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  )
}
