import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import authRouter from './controllers/authController';
import taskRouter from './controllers/taskController';
import tagRouter from './controllers/tagController';

dotenv.config();

const app = express()
const port = process.env.PORT;

app.use(express.json())

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.use("/api/tag", tagRouter);

app.listen(port, () => {
  console.log(`AlfredoTZ app listening on port ${port}`)
})

app.on("error", (err) => {
    console.log(err);
})