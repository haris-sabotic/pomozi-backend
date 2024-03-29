import express from "express";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';
import errorHandlerMiddleware from "./middlewares/errorHandler";
import router from "./routes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(cors({
  origin: '*', // or specify the domains you want to allow
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type'],
}));

app.use('/api', router);

import path from "path"

app.get('/storage/:name', function (req: any, res: any) {
  const filePath = path.join(__dirname, '..', 'storage', req.params.name);
  res.sendFile(filePath);
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port ${process.env.APP_PORT}`);
});

app.use(errorHandlerMiddleware);
