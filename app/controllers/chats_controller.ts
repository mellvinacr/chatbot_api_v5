import type { HttpContext } from '@adonisjs/core/http'
import Conversation from '#models/conversation'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import vine from '@vinejs/vine'

export default class ChatController {
  /**
   * Fitur: Ambil semua conversation
   */
 public async index({ request, response }: HttpContext) {
    try {
      // Ambil query param dari URL, berikan nilai default jika tidak ada
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)

      // Memulai query ke database
      const query = Conversation.query().preload('messages')

      // (Contoh Filter) Jika ada query param 'search', cari di last_message
      if (request.input('search')) {
        query.where('last_message', 'like', `%${request.input('search')}%`)
      }

      // Terapkan pagination
      const conversations = await query.paginate(page, limit)

      return response.ok(conversations.toJSON())
    } catch (error) {
      console.error('Error di ChatController.index:', error.message)
      return response.internalServerError({ error: 'Gagal mengambil data percakapan' })
    }
  }

  /**
   * Fitur: Ambil message dari conversation
   */
  public async show({ params, response }: HttpContext) {
    try {
      const conversation = await Conversation.query()
        .where('id', params.id)
        .preload('messages')
        .firstOrFail()
      return response.ok(conversation)
    } catch (error) {
      console.error('Error di ChatController.show:', error.message)
      return response.notFound({ error: 'Percakapan tidak ditemukan' })
    }
  }

  /**
   * Fitur: Kirim Pertanyaan dengan Validasi
   */
  public async store({ request, response }: HttpContext) {
    try {
      // --- PERBAIKAN VALIDASI DI SINI ---
      const chatSchema = vine.object({
        question: vine.string().trim().minLength(1),
      })
      const { question } = await vine.validate({
        schema: chatSchema,
        data: request.body(),
      })
      // --- AKHIR PERBAIKAN ---

      const sessionId = uuidv4()
      const conversation = await Conversation.create({
        sessionId: sessionId,
      })

      await conversation.related('messages').create({
        senderType: 'user',
        message: question,
      })

      const externalApiResponse = await axios.post(
        'https://api.majadigidev.jatimprov.go.id/api/external/chatbot/send-message',
        { question: question }
      )

      const botAnswer = externalApiResponse.data?.data?.message[0]

      if (!botAnswer) {
        console.error('API eksternal tidak memberikan jawaban:', externalApiResponse.data)
        return response.internalServerError({ error: 'Gagal mendapatkan jawaban dari bot.' })
      }

      await conversation.related('messages').create({
        senderType: 'bot',
        message: botAnswer,
      })

      conversation.lastMessage = botAnswer
      await conversation.save()

      return response.ok({
        answer: botAnswer,
      })
    } catch (error) {
      // Menangkap error validasi dan error lainnya
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.status(422).send({
          message: 'Validasi gagal',
          errors: error.messages,
        })
      }
      console.error(
        'Error di ChatController:',
        error.response ? error.response.data : error.message
      )
      return response.internalServerError({ error: 'Terjadi kesalahan pada server' })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      // Cari data percakapan yang akan dihapus
      const conversation = await Conversation.findOrFail(params.id)

      // Hapus data tersebut
      await conversation.delete()

      return response.ok({ message: 'Percakapan berhasil dihapus' })
    } catch (error) {
      console.error('Error di ChatController.destroy:', error.message)
      return response.notFound({ error: 'Percakapan tidak ditemukan' })
    }
  }
}
