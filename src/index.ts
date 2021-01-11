import * as http from 'http';
import * as express from 'express';

const app = express();

// heathCheck
app.get('/heath-check', (req: express.Request, res: express.Response) =>
    res.json({ message: 'App running successful.' }));

// error handler
app.use((err, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    // logger.error(err.stack);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err);
});

const normalizePort = (val) => {
    const portValue = parseInt(val, 10);

    if (isNaN(portValue)) {
        // named pipe
        return val;
    }

    if (portValue >= 0) {
        // port number
        return portValue;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`)
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
    const addr = server.address();

    const bind = (typeof addr === 'string' || !addr)
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);