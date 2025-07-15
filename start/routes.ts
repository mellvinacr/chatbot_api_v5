import Route from '@adonisjs/core/services/router'
import ChatController from '#controllers/chats_controller'

Route.get('/', async () => {
  return { status: 'online', message: 'Chatbot API is running!' }
})

Route.post('/questions', [ChatController, 'store'])

// Grup rute yang akan dilindungi oleh middleware
Route.group(() => {
  Route.get('/conversations', [ChatController, 'index'])
  Route.get('/conversations/:id', [ChatController, 'show'])
  Route.delete('/conversations/:id', [ChatController, 'destroy'])
}).middleware(async () => {
  // Baris ini akan mengimpor dan menerapkan middleware 'Auth' Anda
  const { default: AuthMiddleware } = await import('#middleware/auth_middleware')
  return AuthMiddleware
})