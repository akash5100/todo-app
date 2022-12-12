import app from './app';
import http from 'http';
import { port } from './constants';

const server = http.createServer(app);

try {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}
finally {
    server.close();
}