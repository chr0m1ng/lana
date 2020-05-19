const { OK } = require('http-status-codes');
const request = require('supertest');
const App = require('../../src/api');
const config = require('../../src/config');

const server = new App();
let express_app = null;

describe('Test the swagger path', () => {
    beforeAll(async (done) => {
        await server.buildAsync();
        express_app = server.app;
        done();
    });
    test('It should response with 200(OK) the GET method', async (done) => {
        const response = await request(express_app).get(
            config.api.swagger_path
        );
        expect(response.statusCode).toBe(OK);
        done();
    });
});
