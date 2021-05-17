const repl = require('repl');
const mongoose = require('mongoose');
const logger = require('./loggerConfig/logger')

const connectionString = process.env.DB_HOST || "mongodb://hktv-comms:hktv-comms@localhost:27017/hktv-comms?authSource=hktv-comms"

mongoose.connect(connectionString, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  logger.log('info', {
    category: 'server log',
    payload: {
      DBhost: connectionString,
      message: 'connected'
    }
  });
  repl.start({
    prompt: 'app >'
  }).on('exit', () => {
    try{
      mongoose.disconnect();
      logger.log('info', {
        category: 'server log',
        payload: {
          DBhost: process.env.DB_HOST,
          message: 'disconnected'
        }
      });
    } catch(e) {
      logger.log('error', {
        category: 'server log',
        payload: {
          error: e,
        }
      });
    }
  })
})


