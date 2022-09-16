import express, {json} from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import authRouters from "./routers/auth.routers.js";
import storeRouters from "./routers/store.routers.js";

dotenv.config({path:'../.env'});
const app = express();
app.use(cors());
app.use(json());

console.log(process.env.MONGO_URI)

app.use(authRouters);
app.use(storeRouters);

app.listen(4000, () => { console.log(chalk.green.bold(`Listening ${process.env.NOMEE} on Port: 4000`))});
