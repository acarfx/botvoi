export default class BotVoi {
  constructor(key?: string | null)
  setKey(key: string): void
  fetch(userId: string | number): Promise<User>
  punitivesSet(
    userId: string | number,
    type: string,
    reason?: string
  ): Promise<any>
}

export interface ActivityItem {
  type?: string
  [key: string]: any
}

export interface Activities {
  Seen: string | null
  Activities: ActivityItem[]
}

export interface User {
  guilds: any[]
  activities: Activities
  punitives: any[]
  toJSON(): this
  [key: string]: any
}
