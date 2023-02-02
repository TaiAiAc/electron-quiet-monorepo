import { describe, expect, test } from 'vitest'
import { defineConfig } from '@/index'

describe('测试配置文件解析', () => {
  test('导入对象', () => {
    const obj = { viteConfig: {}, tsupConfig: {}, builderConfig: {} }
    const config = defineConfig(obj)

    expect(config).toBe(obj)
  })

  test('函数式', () => {
    const config = { viteConfig: {}, tsupConfig: {}, builderConfig: {} }

    const configFn = () => {
      return config
    }

    const out = defineConfig(configFn) as Function

    expect(out).toBeTypeOf('function')
    expect(out()).toBe(config)
  })
})

