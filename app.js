const express = require('express')
const router = express.Router()
const { routes } = require('./routeConfig/routes')
const mongoose = require('mongoose');
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
      const connectionString = process.env.DB_HOST || "mongodb://hktv-comms:hktv-comms@localhost:27017/hktv-comms?authSource=hktv-comms"
      await mongoose.connect(connectionString, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log("MongoDb Connected")
    } catch(e) {
      throw new Error(`DB connection fail, with error ${e}`)
    }
  }

  async startServer() {
    await this.loadRoutingConfigs()
    await this.connectMongoDB()

    this.app.listen(5000, () => {
      // eslint-disable-next-line no-console
      console.log('====Start Server====')
    })
  }
}

const app = new App()
app.startServer()