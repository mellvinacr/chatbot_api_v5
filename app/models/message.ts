import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Conversation from '#models/conversation'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column({ columnName: 'conversation_id' })
  public conversationId!: number

  @column({ columnName: 'sender_type' })
  public senderType!: string

  @column()
  public message!: string

  // Defines the relation: each Message belongs to one Conversation
  @belongsTo(() => Conversation)
  public conversation!: BelongsTo<typeof Conversation>

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime | null
}