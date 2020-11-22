import {app} from './app';
import {runMigrations} from './database';

const server = app.listen(55505, async () => {
    runMigrations();
    console.log('Server started!');
});

const onShutdown = () => {
    server.close(() => {
        process.exit(0);
    });
};

process.on('SIGINT', onShutdown);
process.on('SIGTERM', onShutdown);
