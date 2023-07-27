import express from 'express';
import { connectToPostgres } from '../connection/pg.connect';
import { registerRoutes } from './routes/routes.register';


const {PORT} = process.env;
export const startServer = async ()=>{
    try {
        const app = express();
         await connectToPostgres();
         registerRoutes(app);
        app.listen(PORT,()=>{
            console.log(`server started on PORT ${PORT}`);
        })
    } catch (error) {
        console.error(error);
        console.error('COULD NOT START SERVER');
        process.exit(1);
    }
}