# BotVoi

Minimal and easy-to-use Node.js client for the BotVoi API.

Minimal, kolay kullanımlı BotVoi API Node.js istemcisi.

English • Türkçe

## English

### Features
- Fetch user data (`fetch`)
- Apply punitives (`punitivesSet`) with flexible type matching (e.g. "chat mute", "chat-mute")

### Install

```bash
npm install botvoi
```

### Quick start

CommonJS (require):

```js
const BotVoi = require('botvoi')

// Limited access with the free key – suitable for testing
const client = new BotVoi('free')

(async () => {
  const user = await client.fetch('123456789012345678')
  console.log(user)

  const result = await client.punitivesSet('123456789012345678', 'chat-mute', 'Spam')
  console.log(result)
})()
```

ESM (import):

```js
import BotVoi from 'botvoi'

// Prefer your real API key in production
const client = new BotVoi(process.env.BOTVOI_KEY)

const user = await client.fetch('123456789012345678')
console.log(user)
```

### Free access (limited)
- You can use the special key `free` to access the API with limited capabilities and/or stricter rate limits.
- This is ideal for quick tests and exploring the SDK. For production workloads, use your own API key.

### API Reference

class BotVoi(key?)
- key: string | null – Optional API key. You may set it later via `setKey`.

setKey(key: string): void
- Update the API key. Must be a non-empty string.

fetch(userId: string | number): Promise<User>
- Fetch user data and return a `User` object.

punitivesSet(userId: string | number, type: string, reason?: string): Promise<any>
- Apply a punitive to the given user. The `type` is normalized and mapped to one of the supported values.

Supported types (normalized mapping):
- Ban, ForceBan, Jail, ChatMute, VoiceMute, Timeout, Warning, Underworld
- UnBan, UnForceBan, UnJail, UnChatMute, UnVoiceMute, UnTimeout, UnUnderworld

class User
- Includes `member` fields, `guilds`, `activities`, and `punitives`.
- `toJSON()` returns a JSON-friendly object.

### Environment variables
- BOTVOI_KEY – Your API key

### Error handling
- The client throws if no key is configured or when the API responds with an `error` field.

### TypeScript
- This package ships with `index.d.ts` and provides type definitions for `BotVoi` and `User`.

### Requirements
- Node.js >= 14

---

## Türkçe

### Özellikler
- Kullanıcı verilerini çekme (`fetch`)
- Ceza/punitif atama (`punitivesSet`) – esnek tür eşleştirme (ör. "chat mute", "chat-mute")

### Kurulum

```bash
npm install botvoi
```

### Hızlı Başlangıç

CommonJS (require):

```js
const BotVoi = require('botvoi')

// Ücretsiz anahtar ile sınırlı erişim – test için uygundur
const client = new BotVoi('free')

(async () => {
  const user = await client.fetch('123456789012345678')
  console.log(user)

  const result = await client.punitivesSet('123456789012345678', 'chat-mute', 'Spam')
  console.log(result)
})()
```

ESM (import):

```js
import BotVoi from 'botvoi'

// Üretimde kendi gerçek API anahtarınızı kullanmanız önerilir
const client = new BotVoi(process.env.BOTVOI_KEY)

const user = await client.fetch('123456789012345678')
console.log(user)
```

### Ücretsiz anahtar (sınırlı erişim)
- `free` adlı özel anahtar ile API’ye sınırlı yetenekler ve/veya daha sıkı oran limitleri ile erişebilirsiniz.
- Bu, hızlı denemeler ve SDK’yı keşfetmek için idealdir. Üretim iş yükleri için kendi API anahtarınızı kullanın.

### API Referansı

class BotVoi(key?)
- key: string | null – İsteğe bağlı API anahtarı. Daha sonra `setKey` ile ayarlanabilir.

setKey(key: string): void
- API anahtarını günceller. Boş olamaz.

fetch(userId: string | number): Promise<User>
- Kullanıcı verilerini çeker ve `User` nesnesi döner.

punitivesSet(userId: string | number, type: string, reason?: string): Promise<any>
- Belirtilen kullanıcıya punitif uygular. `type` değeri normalize edilerek desteklenen türlerden birine eşlenir.

Desteklenen türler (normalleştirilmiş eşlemeler):
- Ban, ForceBan, Jail, ChatMute, VoiceMute, Timeout, Warning, Underworld
- UnBan, UnForceBan, UnJail, UnChatMute, UnVoiceMute, UnTimeout, UnUnderworld

class User
- `member` alanları, `guilds`, `activities` ve `punitives` içerir.
- `toJSON()` JSON uyumlu bir nesne döner.

### Ortam Değişkenleri
- BOTVOI_KEY – API anahtarınız

### Hata Yönetimi
- İstemci, anahtar ayarlı değilse veya API yanıtında `error` alanı varsa hata fırlatır.

### TypeScript
- Paket `index.d.ts` ile gelir ve `BotVoi` ile `User` için tip tanımları sağlar.

### Gereksinimler
- Node.js >= 14

---

## Lisans
MIT

