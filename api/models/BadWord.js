const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BadWordSchema = new Schema({
    name: { type: String, required: true },
}, {collection: 'badWord'});

class BadWord {
    // constructor(modelName = 'health') {
    //   this.model = new mongoose.model(modelName, HealthSchema);
    // }

    static model = new mongoose.model('badWord', BadWordSchema)
  
    static async getAllBadWords() {
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
      const badWord = new this.model({
        name,
      })
      return badWord.save();
    }
  }
  
  module.exports = BadWord;