import type { GameData } from '../game/types'
import { STORAGE_KEYS } from './constants'

/**
 * 保存游戏数据到本地存储
 */
export function saveGameData(data: GameData): void {
  try {
    const json = JSON.stringify(data)
    localStorage.setItem(STORAGE_KEYS.GAME_DATA, json)
  } catch (error) {
    console.error('保存游戏数据失败:', error)
  }
}

/**
 * 从本地存储读取游戏数据
 */
export function getStoredGameData(): GameData | null {
  try {
    const json = localStorage.getItem(STORAGE_KEYS.GAME_DATA)
    if (!json) return null

    const data = JSON.parse(json) as GameData
    return data
  } catch (error) {
    console.error('读取游戏数据失败:', error)
    return null
  }
}

/**
 * 清除本地存储的游戏数据
 */
export function clearGameData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.GAME_DATA)
  } catch (error) {
    console.error('清除游戏数据失败:', error)
  }
}
