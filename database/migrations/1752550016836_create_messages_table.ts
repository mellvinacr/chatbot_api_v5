// dalam file ..._create_messages_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('conversation_id').unsigned().references('id').inTable('conversations').onDelete('CASCADE')
      table.string('sender_type').notNullable() // 'user' atau 'bot'
      table.text('message').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}