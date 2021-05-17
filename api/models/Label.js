const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabelSchema = new Schema({
    name: { type: String, required: true },
});

class Label {
    // constructor(modelName = 'health') {
    //   this.model = new mongoose.model(modelName, HealthSchema);
    // }

    static model = new mongoose.model('label', LabelSchema)
  
    static async getAllLabels() {
      let result;
      try {
        result = await this.model.find({});
        console.log('result--------', result);
      } catch (error) {
        throw error;
      }
      return result
    }

    static async insertOne(obj) {
      const { name } = obj
      const label = new this.model({
        name,
      })
      return label.save();
    }
  }
  
  module.exports = Label;