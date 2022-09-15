
import bcrypt from 'bcrypt';
import mongo from '../db/db.js';
import { v4 as uuid } from 'uuid';
import { STATUS_CODE } from '../enums/statusCode.js';
import { TRANSACTIONS_TYPE } from '../enums/statusCode.js';
import { schemaCadrasto } from '../schemas/authSchemas.js';

let db = await mongo();


export {singIn, singUp};