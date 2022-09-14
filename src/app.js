import express, {json} from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import  from "./routers/.routers.js";
import  from "./routers/.routers.js";

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use();
app.use();

app.listen(process.env.PORT, () => { console.log(chalk.green.bold(`Rodando ${process.env.NOMEE} Lisu na Porta: ${process.env.PORT}`))});
