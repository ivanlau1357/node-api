class HealthController {
  static async health(req, res) {
    return res.status(200).send('I am a healthy')
  }
}

module.exports = HealthController