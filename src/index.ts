import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import authRouter from './controllers/authController';
import helmet from "helmet";
import fileRouter from './controllers/fileController';

dotenv.config();

const app = express()
const port = process.env.PORT;

app.use(express.json())
app.use(helmet())
app.disable('x-powered-by')

app.use("/api/auth", authRouter);
app.use("/api/file", fileRouter);


app.listen(port, () => {
  console.log(`AlfredoTZ app listening on port ${port}`)
})

app.on("error", (err) => {
    console.log(err);
})