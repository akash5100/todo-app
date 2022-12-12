import express, {Request, Response} from 'express';
import { v1Routes } from './routes/v1';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

// V1 of API
app.use("/v1", v1Routes);

export default app;