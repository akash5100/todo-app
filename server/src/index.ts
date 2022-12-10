import express, {Request, Response} from 'express';
import { v1Routes } from './routes/v1';
import { port } from "./constants";
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

// V1 of API
app.use("/v1", v1Routes);

app.listen(port, (): void => {
    console.log(`Server running at http://localhost:${port}`);
});
