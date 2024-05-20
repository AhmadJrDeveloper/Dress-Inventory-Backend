import  express from "express";
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from "cookie-parser";
import branchRouter from './routes/branchRoute.js'
import userRouter from './routes/userRoute.js';
import accessoryRouter from './routes/accessoryRoute.js';
import accountRouter from './routes/accountRoute.js';
import dressRouter from './routes/dressRoute.js';
import sellRouter from './routes/sellRoute.js';
import rentRouter from './routes/rentRoute.js';
import rentLogRouter from './routes/rentLogRoute.js';
import customerRouter from './routes/customerRoute.js';
import laundryRouter from './routes/laundryRoute.js';
import {verifyUser} from './middleware/auth2.js';
import landRouter from './routes/landRoute.js';

dotenv.config()
const app = express();

var corOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  // method: 'POST',
}

//middleware
app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());


//middlewear function//

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//testing api
app.get("/",verifyUser,(req, res) =>{
    return res.json({Status: "Success", username: req.username})
})

app.get('/logout', (req,res) =>{
  res.clearCookie('token');
  return res.json({Status: "Success"})
})


app.listen (process.env.PORT ,()=>{
    console.log("server listening on port", process.env.PORT);
})

app.use('/branches',branchRouter);
app.use('/users',userRouter);
app.use('/accessories',accessoryRouter);
app.use('/accounts',accountRouter);
app.use('/dresses',dressRouter);
app.use('/sells',sellRouter);
app.use('/rents',rentRouter);
app.use('/rentLogs',rentLogRouter);
app.use('/customers',customerRouter);
app.use('/laundries',laundryRouter);
app.use('/lands',landRouter);

