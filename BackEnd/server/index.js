import { createServer } from 'http';
import express from 'express';

const port = process.env.PORT ?? 4321
const app = express();
const server = createServer(app);




server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});