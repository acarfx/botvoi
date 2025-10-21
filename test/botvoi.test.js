import { describe, it, expect } from 'vitest'
import BotVoi from '../src/index.js'

// Not: Gerçek API çağrılarını taklit etmeden temel sınıf davranışlarını test ediyoruz.

describe('BotVoi', () => {
  it('constructor ve setKey çalışmalı', async () => {
    const c = new BotVoi()
    await expect(c.fetch('1')).rejects.toThrow()
    c.setKey('abc')
    expect(c.key).toBe('abc')
  })

  it('punitivesSet için tür normalize edilmeli', async () => {
    const c = new BotVoi('abc')
    // Özel: _request metodunu mocklayalım
    c._request = async (method, userId, body) => ({ data: body })
    const res = await c.punitivesSet('1', 'chat-mute', 'Spam')
    expect(res.type).toBe('ChatMute')
  })
})
