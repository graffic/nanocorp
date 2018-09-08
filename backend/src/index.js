const config = require('./config')
const log = require('./log')
const app = require('./app')

if (require.main === module) {
  const server = app.listen(config.port, () =>
    log.info(`🚀 Server ready at http://localhost:${server.address().port}`)
  )
}
