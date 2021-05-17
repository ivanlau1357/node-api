class Operation {
  constructor(db) {
    this.db = db;
  }
  async countHealth() {
    return await this.db.collection('health').countDocuments();
  }

  async countUser() {
    return await this.db.collection('user').countDocuments();
  }
  
  async run(file) {
    try{
      const userCount = await this.countUser();
      console.log(userCount);
    }catch(e){
      throw e
    }
  }
  async testRun(file) {
    try{
      const healthcount = await this.countHealth();
      console.log(healthcount);
    }catch(e){
      throw e
    }
  }
  
}

module.exports = Operation