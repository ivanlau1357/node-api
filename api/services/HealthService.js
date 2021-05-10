const Health = require('../models/Health');

class HealthService {
    static async getHealthMsg() {
      const healthMsg = await Health.getAllHealths();
      return healthMsg
    }
  }
  
module.exports = HealthService