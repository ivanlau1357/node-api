const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewStatSchema = new Schema({
    name: { type: String, required: true },
}, {collection: 'reviewStat'});

class ReviewStat {
    // constructor(modelName = 'health') {
    //   this.model = new mongoose.model(modelName, HealthSchema);
    // }

    static model = new mongoose.model('reviewStat', ReviewStatSchema)
  
    static async getAllReviewStat() {
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
      const reviewStat = new this.model({
        name,
      })
      return reviewStat.save();
    }
  }
  
  module.exports = ReviewStat;