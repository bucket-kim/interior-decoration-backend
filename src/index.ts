import express from "express";
import type { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/db";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(400).send("Rout not found")
})

const initializeApp = async() => {
    try {
        await connectToDB();
        app.listen(8080, () => {
            console.log(`[server]: Server running at http://localhost/8080/api`)
        })
    }catch(error) {
        console.error(error);
        process.exit(1)
    }
}

initializeApp();