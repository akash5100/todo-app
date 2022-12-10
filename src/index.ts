import express, {Request, Response} from 'express';
import { v1Routes } from './routes/v1';
import { port } from "./constants";

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

// V1 of API
app.use("/v1", v1Routes);

app.listen(port, (): void => {
    console.log(`Server running at http://localhost:${port}`);
});
