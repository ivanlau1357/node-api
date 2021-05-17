const express = require('express')
const router = express.Router()
const path = require('path');
const logger = require('./loggerConfig/logger')
const { routes } = require('./routeConfig/routes')
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('dotenv').config()


class App {
  constructor() {
    this.app = express()
  }

  async loadRoutingConfigs() {
    try {
      routes.forEach((route) => {
        const [method, endPoint, callback] = route.split(' ')
        const [controllerName, callbackFn] = callback.split('.')
        const controller = require(`./api/controllers/${controllerName}`)
        this.app[method.toLowerCase()](endPoint, controller[callbackFn])
      })
    } catch (e) {
      throw new Error(`Incorrect routing config, with error ${e}`)
    }
  }

  async connectMongoDB() {
    try {
      const connectionString = process.env.DB_HOST || "mongodb://hktv-comms:hktv-comms@localhost:27017/hktv-comms"
      await mongoose.connect(connectionString, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

      logger.log('info', {
        category: 'server log',
        payload: {
          test: 'i am test payload',
          DBhost: process.env.DB_HOST
        }
      });
    } catch(e) {
      throw new Error(`DB connection fail, with error ${e}`)
    }
  }

  async executeOperation({ operationId, isExecRun = false, operationFile }) {
    const client = await MongoClient.connect(process.env.DB_HOST, { useNewUrlParser: true,  useUnifiedTopology: true}).catch(err => console.log(err));
    const db = client.db(process.env.DATABASE);

    logger.log('info', {
      category: 'operation',
      operationId,
      operationFile,
      action: 'ready',
    })

    const operationPath = path.resolve(process.cwd(), './operations', `./${operationId}`, './Operation.js')
    const Operation = require(operationPath)
    const operation = new Operation(db)

    logger.log('info', {
      category: 'operation',
      operationId,
      operationFile,
      action: isExecRun ? 'run' : 'testRun',
    })

    try {
      if (isExecRun) {
        await operation.run(operationFile)
      } else {
        await operation.testRun(operationFile)
      }
    } catch (e) {
      logger.log('error', {
        category: 'operation',
        error: e,
      })
      console.log(e);
    }
    logger.log('info', {
      category: 'operation',
      operationId,
      action: 'done',
    })
    await client.close();
    logger.log('info', {
      category: 'operation',
      operationId,
      action: 'disconnect mongo',
    })
    return this
  }

  async startServer() {
    await this.loadRoutingConfigs()
    await this.connectMongoDB()

    this.app.listen(5000, () => {
      // eslint-disable-next-line no-console
      logger.log('info', {
        category: 'server log',
        payload: {
          test: 'i am test payload',
          DBhost: process.env.DB_HOST
        }
      });
    })
  }
}

const app = new App()
app.startServer()

module.exports = app;