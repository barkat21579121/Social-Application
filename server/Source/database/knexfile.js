// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 8080,
      user: 'postgres',
      password: '21579121',
      database: 'LoginAuth'
    }
  }
};