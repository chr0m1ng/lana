const swagger_ui = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const express = require('express');

const package_info = require('../../package.json');
const config = require('../config');
const router = require('./routes');
const LoggerProvider = require('./providers/logger-provider');

const resBodyMiddleware = require('./middlewares/res-body-middleware');
const errorMiddleware = require('./middlewares/error-middleware');
const validatorMiddleware = require('./middlewares/validator-middleware');
const {
    requestLogger,
    responseLogger,
    shouldNotLogPath
} = require('./middlewares/logger-middleware');

const ROUTES_PATH = './src/api/routes/*.js';
const DEFAULT_PORT = 3333;
const PORT = process.env.PORT || DEFAULT_PORT;
const ETAG = 'etag';

class Api {
    constructor() {
        this.app = express();
    }

    async buildAsync() {
        this.setupLogger();
        this.setupPreRoutesMiddlewares();
        this.setupRoutes();
        this.setupPosRoutesMiddlewares();
    }

    start() {
        this.app.listen(PORT, () => {
            this.logger.info(`server listening on port: ${PORT}`);
        });
    }

    setupPreRoutesMiddlewares() {
        this.app.disable(ETAG);
        this.app.use(express.json());
        this.app.use(resBodyMiddleware);
        this.app.use(requestLogger.unless(shouldNotLogPath));
        this.app.use(responseLogger.unless(shouldNotLogPath));
        this.app.use(validatorMiddleware);
    }

    setupPosRoutesMiddlewares() {
        this.setupSwagger();
        this.app.use(errorMiddleware);
    }

    setupSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: package_info.name,
                    version: package_info.version,
                    description: package_info.description
                },
                basePath: config.api.base_path
            },
            apis: [ROUTES_PATH]
        };
        const specs = swaggerJsDoc(options);
        this.app.use(
            config.api.swagger_path,
            swagger_ui.serve,
            swagger_ui.setup(specs)
        );
    }

    setupRoutes() {
        this.app.use(config.api.base_path, router);
    }

    setupLogger() {
        this.logger_provider = new LoggerProvider();
        this.logger = this.logger_provider.getLogger();
    }
}

module.exports = Api;
