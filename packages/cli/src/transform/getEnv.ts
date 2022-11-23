import { resolve } from 'path'
import { config as getEnv } from 'dotenv'

const defaultEnvPath = resolve(process.cwd(), '.env')
const { parsed: defaultEnv } = getEnv({ path: defaultEnvPath })

export const getDevelopment = () => {
  const { parsed: env } = getEnv({ path: resolve(defaultEnvPath, '.development') })

  return {
    default: defaultEnv,
    development: env
  }
}

export const getProduction = () => {
  const { parsed: env } = getEnv({ path: resolve(defaultEnvPath, '.production') })

  return {
    default: defaultEnv,
    production: env
  }
}
