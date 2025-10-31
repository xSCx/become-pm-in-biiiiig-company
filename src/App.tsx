import { useState } from 'react'
import GameCanvas from './components/GameCanvas'
import GameUI from './components/GameUI'
import { GameState } from './game/GameState'
import type { GameStatus } from './game/types'

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [gameStatus, setGameStatus] = useState<GameStatus>('menu')

  const handleGameStart = () => {
    const newGameState = new GameState()
    setGameState(newGameState)
    setGameStatus('playing')
  }

  const handleGamePause = () => {
    setGameStatus('paused')
  }

  const handleGameResume = () => {
    setGameStatus('playing')
  }

  const handleGameEnd = () => {
    setGameStatus('ended')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Become PM in Biiiiig Company</h1>
        <p>游戏原型测试</p>
      </header>
      
      <main className="app-main">
        <GameUI 
          gameState={gameState}
          gameStatus={gameStatus}
          onStart={handleGameStart}
          onPause={handleGamePause}
          onResume={handleGameResume}
          onEnd={handleGameEnd}
        />
        
        <div className="game-container">
          {gameStatus !== 'menu' && gameState && (
            <>
              <GameCanvas
                gameState={gameState}
                gameStatus={gameStatus}
                onGameEnd={handleGameEnd}
              />
              {gameStatus === 'paused' && (
                <div className="pause-overlay">
                  <h2>游戏已暂停</h2>
                </div>
              )}
              {gameStatus === 'ended' && (
                <div className="game-over-overlay">
                  <h2>游戏结束</h2>
                  <p>最终分数: {gameState.getGameData().score.toFixed(0)}</p>
                  {gameState.getGameData().score >= gameState.getGameData().highScore && (
                    <p className="new-record">🎉 新纪录！</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
