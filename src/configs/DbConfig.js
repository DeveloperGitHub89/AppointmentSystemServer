import mongoose from "mongoose";
import 'dotenv/config';

export function configureDb(){
    mongoose.connect(process.env.DB_URL);
    const dbConn=mongoose.connection;
    dbConn.once('connected', ()=>{
        console.log('Connected to database');
    });
    dbConn.on('error',()=>{
        console.log('db connection error');
    })
}