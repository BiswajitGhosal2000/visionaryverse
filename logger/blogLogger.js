const { createLogger, format, transports, config } = require('winston');

const blogLogger = createLogger({
    transports: [
        new transports.Console({ level: 'error' }),
        new transports.File({ filename: './logger/blog.log', level: 'info' })
    ]
});
module.exports = blogLogger; 