import vine from '@vinejs/vine'


export const chatValidator = vine.compile(
  vine.object({
    // Aturannya: 'question' harus ada, harus string, dan tidak boleh kosong.
    question: vine.string().trim().minLength(1),
  })
)
