import { resolve } from 'path'
import type { ChildProcessWithoutNullStreams } from 'child_process'
import { spawn } from 'child_process'
import electron from 'electron'

let electronProcess: ChildProcessWithoutNullStreams | null
let manualRestart = false

export function startElectron() {
  if (electronProcess) {
    manualRestart = true
    electronProcess.pid && process.kill(electronProcess.pid)
    electronProcess = null

    setTimeout(() => {
      manualRestart = false
    }, 5000)
  }

  const mainPath = resolve(__dirname, '../dist/main.js')

  electronProcess = spawn(electron as any, [mainPath, '--inspect=9528'])

  electronProcess.stdout.on('data', removeJunk)

  electronProcess.stderr.on('data', removeJunk)

  electronProcess.on('close', () => {
    manualRestart || process.exit()
  })
}

function removeJunk(chunk: string) {
  if (/\d+-\d+-\d+ \d+:\d+:\d+\.\d+ Electron(?: Helper)?\[\d+:\d+] /.test(chunk))
    return false
  if (/\[\d+:\d+\/|\d+\.\d+:ERROR:CONSOLE\(\d+\)\]/.test(chunk))
    return false
  if (/ALSA lib [a-z]+\.c:\d+:\([a-z_]+\)/.test(chunk))
    return false

  const data = chunk.toString().split(/\r?\n/)
  let log = ''
  data.forEach((line) => {
    log += `  ${line}\n`
  })
  // eslint-disable-next-line no-console
  console.log(log)
}
