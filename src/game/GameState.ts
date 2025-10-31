import { GameData } from './types'
import { getStoredGameData, saveGameData } from '../utils/storage'

/**
 * 游戏状态管理类
 * 负责管理游戏的数据状态和持久化
 */
export class GameState {
  private score: number = 0
  private level: number = 1
  private highScore: number = 0

  constructor() {
    // 加载保存的数据
    const storedData = getStoredGameData()
    if (storedData) {
      this.highScore = storedData.highScore
    }
  }

  /**
   * 增加分数
   */
  addScore(points: number): void {
    this.score += points
    if (this.score > this.highScore) {
      this.highScore = this.score
    }
    this.save()
  }

  /**
   * 获取当前分数
   */
  getScore(): number {
    return this.score
  }

  /**
   * 设置等级
   */
  setLevel(level: number): void {
    this.level = Math.max(1, level)
  }

  /**
   * 获取当前等级
   */
  getLevel(): number {
    return this.level
  }

  /**
   * 获取最高分
   */
  getHighScore(): number {
    return this.highScore
  }

  /**
   * 获取游戏数据
   */
  getGameData(): GameData {
    return {
      score: this.score,
      level: this.level,
      highScore: this.highScore,
    }
  }

  /**
   * 重置游戏状态
   */
  reset(): void {
    this.score = 0
    this.level = 1
    // 保留最高分
  }

  /**
   * 保存游戏数据
   */
  private save(): void {
    saveGameData({
      score: this.score,
      level: this.level,
      highScore: this.highScore,
    })
  }
}
