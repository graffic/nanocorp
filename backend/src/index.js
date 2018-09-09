/**
 * Run the app via CLI
 */
const config = require('./config')
const buildApp = require('./app')

if (require.main === module) {
  const server = buildApp().listen(config.port, () =>
    console.info(`🚀 Server ready at http://localhost:${server.address().port}`)
  )
}
