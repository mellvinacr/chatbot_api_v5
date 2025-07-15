import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Message from '#models/message'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column({ columnName: 'session_id' })
  public sessionId!: string

  @column({ columnName: 'last_message' })
  public lastMessage!: string | null

  // Define relation: one Conversation has many Messages
  @hasMany(() => Message)
  public messages!: HasMany<typeof Message>

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime | null
}