import  express ,{json,urlencoded} from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import doctor from './controller/doctor';
import Patient from './controller/Patient';
import cors from 'cors'
import cookieParser from "cookie-parser";


const app = express()
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from all origins
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
    allowedHeaders: ['Authorization', 'Content-Type'],
}));
app.use(cors())
app.use(cookieParser())


const PORT = 3500

//multer 
app.use('/doctor',express.static('doctor'))
app.use('/patient',express.static('patient'))
app.use('/reports',express.static('reports'))
app.use('/sendreport',express.static('sendreport'))





mongoose.connect('mongodb://127.0.0.1:27017/doctor').then(()=>{
    console.log('mongodb is connected');
    app.listen(PORT,()=>{
        console.log(`server is running this ${PORT}`)
    })
});


app.use('/doctor',doctor);
app.use('/patient',Patient)