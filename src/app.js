import express from 'express'
import dotenv from 'dotenv'
import mongo from './helpers/mongoConect.js';
import cookieParser from 'cookie-parser';
import rUserAuth from './routes/UserAuth.route.js'
import rView from './routes/view.route.js'
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import path from 'path';
import { __dirname } from './path.js';

const firmaCookie = process.env.FIRMA_COOKIE || 'firmadecookie'

const PORT = process.env.PORT
const HOST = process.env.HOST
const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser(firmaCookie))
initializePassport();
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', rView);
app.use('/api', rUserAuth);

mongo.connect().then(()=>{
  app.listen( PORT,()=>{
    console.log(HOST + ':' + PORT);
  })
  
}).catch((error)=>{
  console.log('Eror de conexion',error);
})