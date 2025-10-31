import type { GameLoopCallbacks, GameConfig } from './types'

/**
 * 游戏引擎类
 * 负责管理游戏循环、渲染和性能监控
 */
export class GameEngine {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private animationFrameId: number | null = null
  private lastTime: number = 0
  private isRunning: boolean = false
  private config: GameConfig
  private callbacks: GameLoopCallbacks

  // 帧率统计
  private fps: number = 0
  private frameCount: number = 0
  private fpsTime: number = 0

  constructor(
    canvas: HTMLCanvasElement,
    config: GameConfig,
    callbacks: GameLoopCallbacks
  ) {
    this.canvas = canvas
    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('无法获取Canvas 2D上下文')
    }
    this.ctx = context
    this.config = config
    this.callbacks = callbacks

    // 设置Canvas尺寸
    this.setCanvasSize(config.width, config.height)
  }

  /**
   * 设置Canvas尺寸
   */
  setCanvasSize(width: number, height: number): void {
    // 设置实际像素尺寸
    this.canvas.width = width
    this.canvas.height = height

    // 设置CSS显示尺寸（可选：根据设备像素比缩放）
    const dpr = window.devicePixelRatio || 1
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`

    // 如果设备像素比大于1，进行缩放以支持高DPI屏幕
    if (dpr > 1) {
      this.ctx.scale(dpr, dpr)
    }
  }

  /**
   * 启动游戏循环
   */
  start(): void {
    if (this.isRunning) return

    this.isRunning = true
    this.lastTime = performance.now()
    this.fpsTime = this.lastTime
    this.gameLoop(this.lastTime)
  }

  /**
   * 停止游戏循环
   */
  stop(): void {
    this.isRunning = false
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }
  }

  /**
   * 游戏主循环
   */
  private gameLoop(currentTime: number): void {
    if (!this.isRunning) return

    // 计算帧间隔时间（毫秒）
    const deltaTime = currentTime - this.lastTime
    this.lastTime = currentTime

    // 更新FPS统计
    this.updateFPS(currentTime)

    // 清除画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // 更新游戏逻辑
    this.callbacks.update(deltaTime)

    // 渲染游戏画面
    this.callbacks.render(this.ctx)

    // 继续下一帧
    this.animationFrameId = requestAnimationFrame((time) =>
      this.gameLoop(time)
    )
  }

  /**
   * 更新FPS统计
   */
  private updateFPS(currentTime: number): void {
    this.frameCount++
    const elapsed = currentTime - this.fpsTime

    // 每秒更新一次FPS显示
    if (elapsed >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / elapsed)
      this.frameCount = 0
      this.fpsTime = currentTime
    }
  }

  /**
   * 获取当前FPS
   */
  getFPS(): number {
    return this.fps
  }

  /**
   * 获取Canvas上下文
   */
  getContext(): CanvasRenderingContext2D {
    return this.ctx
  }

  /**
   * 获取Canvas元素
   */
  getCanvas(): HTMLCanvasElement {
    return this.canvas
  }
}
