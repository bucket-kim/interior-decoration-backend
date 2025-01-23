import express from "express";
import type { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/db";
import { HttpException } from "./utils/HttpExceptions";
import ErrorHandler from "./middlewares/ErrorHandler";
import { AppRoutes } from "./routes/AppRoutes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use((_req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "https://192.168.1.23:5174")
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next()
})
app.use("/api", AppRoutes)


app.use((req: Request, res: Response, next: NextFunction) => {
    next(new HttpException(404, "Route not found"))
})

// @ts-ignore
app.use(ErrorHandler)

const initializeApp = async() => {
    try {
        await connectToDB();
        app.listen(process.env.PORT || 8080, () => {
            console.log(`[server]: Server running at http://localhost/8080/api`)
        })
    }catch(error) {
        console.error(error);
        process.exit(1)
    }
}

initializeApp();