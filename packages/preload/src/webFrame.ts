import type { WebFrame } from 'electron'
import { webFrame } from 'electron'

export interface PreloadWebFrame {
  setZoomFactor(factor: number): void
  getZoomFactor(): number
  setZoomLevel(level: number): void
  getZoomLevel(): number
  insertText(text: string): void
  executeJavaScript(code: string, userGesture?: boolean, callback?: (result: any, error: Error) => void): Promise<any>
  executeJavaScriptInIsolatedWorld(...args: Parameters<WebFrame['executeJavaScriptInIsolatedWorld']>): Promise<any>
  setIsolatedWorldInfo(...args: Parameters<WebFrame['setIsolatedWorldInfo']>): void
  getResourceUsage(): ReturnType<WebFrame['getResourceUsage']>
  clearCache(): void
  getFrameForSelector(selector: string): WebFrame

  firstChild(): WebFrame['firstChild']
  nextSibling(): WebFrame['nextSibling']
  opener(): WebFrame['opener']
  parent(): WebFrame['parent']
  routingId(): WebFrame['routingId']
  top(): WebFrame['top']

}

export const $webFrame: PreloadWebFrame = {
  setZoomFactor: factor => webFrame.setZoomFactor(factor),
  getZoomFactor: () => webFrame.getZoomFactor(),
  setZoomLevel: level => webFrame.setZoomLevel(level),
  getZoomLevel: () => webFrame.getZoomLevel(),
  insertText: level => webFrame.insertText(level),
  executeJavaScript: level => webFrame.executeJavaScript(level),
  executeJavaScriptInIsolatedWorld: (...args) => webFrame.executeJavaScriptInIsolatedWorld(...args),
  setIsolatedWorldInfo: (...args) => webFrame.setIsolatedWorldInfo(...args),
  getResourceUsage: () => webFrame.getResourceUsage(),
  clearCache: () => webFrame.clearCache(),
  getFrameForSelector: selector => webFrame.getFrameForSelector(selector),
  firstChild: () => webFrame.firstChild,
  nextSibling: () => webFrame.nextSibling,
  opener: () => webFrame.opener,
  parent: () => webFrame.parent,
  routingId: () => webFrame.routingId,
  top: () => webFrame.top
}

