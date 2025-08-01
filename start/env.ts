/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  HOST: Env.schema.string({ format: 'host' }),
  LOG_LEVEL: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring database connection
  |----------------------------------------------------------
  */
  PG_HOST: Env.schema.string({ format: 'host' }), // Ubah dari DB_HOST
  PG_PORT: Env.schema.number(),                   // Ubah dari DB_PORT
  PG_USER: Env.schema.string(),                   // Ubah dari DB_USER
  PG_PASSWORD: Env.schema.string.optional(),      // Ubah dari DB_PASSWORD
  PG_DB_NAME: Env.schema.string(),
  
})
