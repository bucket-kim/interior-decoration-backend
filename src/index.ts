import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { connectToDB } from './config/database';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use((req: Request, res: Response, _next: NextFunction) => {
    res.status(404).send("Request Not Found")
})

const initializeApp = async () => {
    try {
        app.listen(3001, () => {
            console.log(`[server]: server is running at 
                http://localhost:3000/api`);
        })
        await connectToDB();
    } catch(error) {
        console.log(error);
        process.exit(1)
    }
}

initializeApp()