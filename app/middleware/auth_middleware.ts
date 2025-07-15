import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import env from '#start/env'

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // Ambil API key dari header request
    const apiKey = ctx.request.header('x-api-key')

    // Bandingkan dengan API key yang kita simpan di file .env
    if (apiKey !== env.get('API_KEY')) {
      return ctx.response.status(401).send({ error: 'Akses tidak diizinkan' })
    }

    // Jika API key benar, lanjutkan request ke controller
    await next()
  }
}