class HealthCheckController {
    async ping(_, res) {
        return res.send('pong');
    }
}

module.exports = new HealthCheckController();
