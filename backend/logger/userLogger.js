
const { createLogger, format, transports, config } = require('winston');

const userLogger = createLogger({
    transports: [
        new transports.Console({ level: 'error' }),
        new transports.File({ filename: './logger/user.log', level: 'info' })
    ]
});
module.exports = userLogger; 