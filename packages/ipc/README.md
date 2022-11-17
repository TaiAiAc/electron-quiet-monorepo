# @quiteer/electron-ipc


> 基于electron , 提供了一些 独立无副作用的 ipc 事件相关操作

## 安装

- 获取项目代码

```bash
npm i @quiteer/electron-ipc
```
```bash
yarn add @quiteer/electron-ipc
```
```bash
pnpm add @quiteer/electron-ipc
```

## 使用

### 在主进程中初始化ipc预设
> init即可 无需多余操作

```js
import { Ipc } from '@quiteer/electron-ipc'

app.whenReady().then(() => {
  Ipc.init()
})
```

### 渲染进程中使用
> 引用包内预定义的事件枚举  按需取用

```js
import { EventKeys, IpcWindowOptions } from '@quiteer/electron-ipc/event-enum'

const test = () => {
  // 窗口最大化
  window.$ipc.send(EventKeys.WindowOptionsKey, IpcWindowOptions.MAXIMIZE)

  setTimeout(() => {
    // 取消最大化
    window.$ipc.send(EventKeys.WindowOptionsKey, IpcWindowOptions.UNMAXIMIZE)
  }, 1000)
}
```
