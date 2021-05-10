const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HealthSchema = new Schema({
    name: { type: String, required: true },
});

class Health {
    // constructor(modelName = 'health') {
    //   this.model = new mongoose.model(modelName, HealthSchema);
    // }

    static model = new mongoose.model('health', HealthSchema)
  
    static async getAllHealths() {
      let result;
      try {
        result = await this.model.find({});
        console.log('result--------', result);
      } catch (error) {
        throw error;
      }
      return result
    }
  }
  
  module.exports = Health;