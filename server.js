const express=require("express");
const app=express();
const dotenv = require("dotenv");
const connectDB=require('./config/db');
dotenv.config();
const Routes = require("./routes/userRoute");
app.use(express.json());
app.use("/", Routes);

const PORT= process.env.PORT || 3000;

// normal api 
app.get('/',(req,res)=>{
    res.send('Hello world');
});


app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`);
    connectDB();
})
