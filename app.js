const express = require('express')
require('dotenv').config();
const connectMongo = require('./db')
connectMongo();
const cors= require('cors')
const cookieParser = require('cookie-parser');


const auth = require('./routes/authRoutes')
const userInfo = require('./routes/userInfoRoutes')
const exercise = require('./routes/exerciseRoutes')
const healthData = require('./routes/healthDataRoutes')
const activity = require('./routes/activityRoutes')

const app = express()


app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));

const imageUpload = require('./routes/imageUploadRoutes')


app.get('/',(req,res)=>{ 
  try{
    res.status(200).json({"working": true})
  }catch(err){
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    res.status(500).json({"working": false})
  }
    // This route created just to check vercel deployment and may be delete in next commit
})

app.use("/api", auth)
app.use("/api/upload", imageUpload)
app.use("/api", exercise)
app.use("/api/addinfo", userInfo)
app.use("/api/healthData", healthData)
app.use("/api", activity)

const port = 3000;
app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`)
})
