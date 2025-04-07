import { randomUUID } from 'node:crypto'

export function generateRandomUUID() {
  return randomUUID().toString()
}
