const express=require("express");
const app=express();
const dotenv = require("dotenv");
const connectDB=require('./config/db');
dotenv.config();

app.use(express.json());
const Routes = require("./routes/userRoute");
const roomRoutes=require('./routes/roomRoutes')
const bookRoutes=require('./routes/bookRoutes')

const cors = require("cors");
app.use(cors());
app.use("/", Routes);
app.use('/room',roomRoutes);
app.use('/book',bookRoutes);

const PORT= process.env.PORT || 3000;

// normal api 
app.get('/',(req,res)=>{
    res.send('Hello world');
});


app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`);
    connectDB();
})
